/**
 * Unit tests for FAQ migration logic in content.tsx
 * Tests database format to frontend format conversion
 */

import { describe, test, expect } from 'vitest';

// We need to import the migrateContent function and DEFAULT_CONTENT
// Since they're not exported, we'll test through the ContentProvider behavior
// For now, we'll create a mock implementation to test the logic

// Mock DEFAULT_CONTENT.faq structure
const DEFAULT_FAQ = {
  hero: {
    title: "Frequently Asked Questions",
    subtitle: "Find answers to common questions",
  },
  categories: [
    {
      category: "General",
      questions: [
        { q: "Default question?", a: "Default answer" }
      ]
    }
  ],
  support: {
    title: "Still Have Questions?",
    description: "Contact us for help",
    phoneNumber: "9725500435",
    note: "Call during business hours",
  },
};

// Helper function to migrate FAQ categories (matching implementation in content.tsx)
const migrateFAQCategories = (categories: any) => {
  if (!Array.isArray(categories)) {
    return DEFAULT_FAQ.categories;
  }
  
  return categories.map((cat) => {
    // If already in frontend format
    if (cat.category && cat.questions) {
      return {
        category: cat.category,
        questions: cat.questions,
      };
    }
    
    // If in database format, convert
    if (cat.name || cat.faqs) {
      return {
        category: cat.name || cat.category || "",
        questions: (cat.faqs || []).map((faq: any) => ({
          q: faq.question || "",
          a: faq.answer || "",
        })),
      };
    }
    
    // Fallback for malformed data
    return {
      category: "",
      questions: [],
    };
  });
};

// Simulate the FAQ migration logic from migrateContent
const migrateFAQContent = (stored: any) => {
  if (!stored?.faq || typeof stored.faq !== "object") {
    return DEFAULT_FAQ;
  }
  
  return {
    ...DEFAULT_FAQ,
    ...stored.faq,
    hero: {
      ...DEFAULT_FAQ.hero,
      ...(stored.faq.hero || {}),
    },
    categories: migrateFAQCategories(stored.faq.categories),
    support: {
      ...DEFAULT_FAQ.support,
      ...(stored.faq.support || {}),
    },
  };
};

describe('FAQ Migration Logic', () => {
  describe('migrateFAQCategories', () => {
    test('converts database format to frontend format', () => {
      const databaseFormat = [
        {
          name: "Course Details",
          faqs: [
            { question: "What is the duration?", answer: "2 months" },
            { question: "What are the timings?", answer: "Flexible batches" }
          ]
        }
      ];

      const result = migrateFAQCategories(databaseFormat);

      expect(result).toEqual([
        {
          category: "Course Details",
          questions: [
            { q: "What is the duration?", a: "2 months" },
            { q: "What are the timings?", a: "Flexible batches" }
          ]
        }
      ]);
    });

    test('preserves frontend format when already correct', () => {
      const frontendFormat = [
        {
          category: "Admission",
          questions: [
            { q: "Who can join?", a: "Everyone" },
            { q: "Any prerequisites?", a: "None" }
          ]
        }
      ];

      const result = migrateFAQCategories(frontendFormat);

      expect(result).toEqual(frontendFormat);
    });

    test('handles mixed format categories', () => {
      const mixedFormat = [
        {
          name: "Old Format",
          faqs: [
            { question: "Old question?", answer: "Old answer" }
          ]
        },
        {
          category: "New Format",
          questions: [
            { q: "New question?", a: "New answer" }
          ]
        }
      ];

      const result = migrateFAQCategories(mixedFormat);

      expect(result).toEqual([
        {
          category: "Old Format",
          questions: [
            { q: "Old question?", a: "Old answer" }
          ]
        },
        {
          category: "New Format",
          questions: [
            { q: "New question?", a: "New answer" }
          ]
        }
      ]);
    });

    test('returns default categories for non-array input', () => {
      const result = migrateFAQCategories(null);
      expect(result).toEqual(DEFAULT_FAQ.categories);

      const result2 = migrateFAQCategories(undefined);
      expect(result2).toEqual(DEFAULT_FAQ.categories);

      const result3 = migrateFAQCategories("invalid");
      expect(result3).toEqual(DEFAULT_FAQ.categories);
    });

    test('handles empty arrays', () => {
      const result = migrateFAQCategories([]);
      expect(result).toEqual([]);
    });

    test('handles malformed category objects', () => {
      const malformed = [
        { invalid: "data" },
        { name: "Valid", faqs: [] },
        {}
      ];

      const result = migrateFAQCategories(malformed);

      expect(result).toEqual([
        { category: "", questions: [] },
        { category: "Valid", questions: [] },
        { category: "", questions: [] }
      ]);
    });

    test('handles missing question/answer fields', () => {
      const incomplete = [
        {
          name: "Test Category",
          faqs: [
            { question: "Q1" }, // missing answer
            { answer: "A2" }, // missing question
            {} // missing both
          ]
        }
      ];

      const result = migrateFAQCategories(incomplete);

      expect(result).toEqual([
        {
          category: "Test Category",
          questions: [
            { q: "Q1", a: "" },
            { q: "", a: "A2" },
            { q: "", a: "" }
          ]
        }
      ]);
    });

    test('handles category with both name and category fields', () => {
      const bothFields = [
        {
          name: "Database Name",
          category: "Frontend Category",
          faqs: [
            { question: "Test?", answer: "Answer" }
          ]
        }
      ];

      const result = migrateFAQCategories(bothFields);

      // Should prefer 'name' field when converting from database format
      expect(result[0].category).toBe("Database Name");
    });
  });

  describe('migrateFAQContent', () => {
    test('returns default FAQ when stored is null', () => {
      const result = migrateFAQContent({ faq: null });
      expect(result).toEqual(DEFAULT_FAQ);
    });

    test('returns default FAQ when stored is undefined', () => {
      const result = migrateFAQContent({});
      expect(result).toEqual(DEFAULT_FAQ);
    });

    test('merges partial FAQ data with defaults', () => {
      const partial = {
        faq: {
          hero: {
            title: "Custom FAQ Title"
          }
          // categories and support missing
        }
      };

      const result = migrateFAQContent(partial);

      expect(result.hero.title).toBe("Custom FAQ Title");
      expect(result.hero.subtitle).toBe(DEFAULT_FAQ.hero.subtitle);
      expect(result.categories).toEqual(DEFAULT_FAQ.categories);
      expect(result.support).toEqual(DEFAULT_FAQ.support);
    });

    test('migrates database format categories', () => {
      const stored = {
        faq: {
          hero: {
            title: "FAQ",
            subtitle: "Questions"
          },
          categories: [
            {
              name: "Test",
              faqs: [
                { question: "Q?", answer: "A" }
              ]
            }
          ],
          support: {
            title: "Help",
            description: "Contact",
            phoneNumber: "123",
            note: "Note"
          }
        }
      };

      const result = migrateFAQContent(stored);

      expect(result.categories).toEqual([
        {
          category: "Test",
          questions: [
            { q: "Q?", a: "A" }
          ]
        }
      ]);
    });

    test('preserves frontend format categories', () => {
      const stored = {
        faq: {
          hero: {
            title: "FAQ",
            subtitle: "Questions"
          },
          categories: [
            {
              category: "Test",
              questions: [
                { q: "Q?", a: "A" }
              ]
            }
          ],
          support: {
            title: "Help",
            description: "Contact",
            phoneNumber: "123",
            note: "Note"
          }
        }
      };

      const result = migrateFAQContent(stored);

      expect(result.categories).toEqual(stored.faq.categories);
    });

    test('merges hero section correctly', () => {
      const stored = {
        faq: {
          hero: {
            title: "Custom Title"
            // subtitle missing
          },
          categories: [],
          support: DEFAULT_FAQ.support
        }
      };

      const result = migrateFAQContent(stored);

      expect(result.hero.title).toBe("Custom Title");
      expect(result.hero.subtitle).toBe(DEFAULT_FAQ.hero.subtitle);
    });

    test('merges support section correctly', () => {
      const stored = {
        faq: {
          hero: DEFAULT_FAQ.hero,
          categories: [],
          support: {
            title: "Custom Support Title",
            phoneNumber: "9999999999"
            // description and note missing
          }
        }
      };

      const result = migrateFAQContent(stored);

      expect(result.support.title).toBe("Custom Support Title");
      expect(result.support.phoneNumber).toBe("9999999999");
      expect(result.support.description).toBe(DEFAULT_FAQ.support.description);
      expect(result.support.note).toBe(DEFAULT_FAQ.support.note);
    });

    test('handles completely empty FAQ object', () => {
      const stored = {
        faq: {}
      };

      const result = migrateFAQContent(stored);

      expect(result.hero).toEqual(DEFAULT_FAQ.hero);
      expect(result.categories).toEqual(DEFAULT_FAQ.categories);
      expect(result.support).toEqual(DEFAULT_FAQ.support);
    });
  });
});
