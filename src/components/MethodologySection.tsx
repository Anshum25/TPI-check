import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useContent } from "@/lib/content";

const MethodologySection = () => {
  const { content } = useContent();
  const { home } = content;
  const methodologySections = home.methodologySections || [];

  const [expandedIndex, setExpandedIndex] = useState<number>(0);

  if (methodologySections.length === 0) return null;

  return (
    <section className="py-12 md:py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-10 md:mb-14">
            <span className="text-xs font-semibold text-primary uppercase tracking-widest mb-4 inline-block">How We Teach</span>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight text-foreground">
              Our <span className="text-primary">Teaching Methodology</span>
            </h2>
          </div>

          {/* Expandable Sections */}
          <div className="space-y-3">
            {methodologySections.map((section, index) => (
              <div key={index} className="border border-border/60 rounded-xl overflow-hidden bg-card">
                {/* Header Button */}
                <button
                  onClick={() => setExpandedIndex(expandedIndex === index ? -1 : index)}
                  className="w-full flex items-center justify-between p-5 md:p-6 hover:bg-secondary/30 transition-colors text-left group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-sm md:text-base font-bold text-primary">+</span>
                    <h3 className="text-lg md:text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {section.title}
                    </h3>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform ${
                      expandedIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Expanded Content */}
                {expandedIndex === index && (
                  <div className="border-t border-border/40 p-5 md:p-6 bg-secondary/10 space-y-5">
                    {section.intro && (
                      <p className="text-foreground text-sm md:text-base leading-relaxed">{section.intro}</p>
                    )}

                    {section.subtitle && (
                      <h4 className="text-lg md:text-xl font-bold text-foreground mt-4 mb-3">
                        {section.subtitle}
                      </h4>
                    )}

                    {section.description && (
                      <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                        {section.description}
                      </p>
                    )}

                    {section.objectives && section.objectives.length > 0 && (
                      <div>
                        {section.objectivesTitle && (
                          <h5 className="font-bold text-foreground mb-3 text-sm md:text-base">
                            {section.objectivesTitle}
                          </h5>
                        )}
                        <ul className="space-y-2">
                          {section.objectives.map((objective, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-sm md:text-base">
                              <span className="text-primary font-bold mt-1">•</span>
                              <span className="text-muted-foreground leading-relaxed">{objective}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MethodologySection;
