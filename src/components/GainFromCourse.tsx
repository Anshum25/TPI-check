import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { useContent } from "@/lib/content";

const GainFromCourse = () => {
  const { content } = useContent();
  const gainHeading = content.home.gainHeading || "What You Will Gain";
  const gainTitle = content.home.gainTitle || "What you would gain from the course!";
  const groups = content.home.gainGroups || [];

  const [expandedIndex, setExpandedIndex] = useState<number>(0);
  const contentRefs = useRef<Array<HTMLDivElement | null>>([]);

  // Ensure the expanded panel calculates its height after render so it opens correctly
  useEffect(() => {
    contentRefs.current.forEach((el, i) => {
      if (!el) return;
     
    });
  }, [expandedIndex, groups.length]);

  if (!groups.length) return null;

  return (
    <section className="py-12 md:py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-10 md:mb-14 text-center md:text-left">
            <span className="text-xs font-semibold text-primary uppercase tracking-widest mb-3 inline-block">
              {gainHeading}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight text-foreground">
              {gainTitle}
            </h2>
          </div>

          {/* Accordion */}
          <div className="space-y-3">
            {groups.map((group, index) => (
              <div key={index} className="border border-border/60 rounded-xl overflow-hidden bg-card">
                {/* Header Button */}
                <button
                  onClick={() => setExpandedIndex(expandedIndex === index ? -1 : index)}
                  className="w-full flex items-center justify-between p-5 md:p-6 hover:bg-secondary/30 transition-colors text-left group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-sm md:text-base font-bold text-primary">
                      {expandedIndex === index ? "−" : "+"}
                    </span>
                    <h3 className="text-lg md:text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {group.title}
                    </h3>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform ${
                      expandedIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Content with smooth transition */}
                <div
                  ref={(el) => (contentRefs.current[index] = el)}
                  style={{ maxHeight: expandedIndex === index ? undefined : "0px", opacity: expandedIndex === index ? 1 : 0 }}
                  className={`border-t border-border/40 bg-secondary/10 overflow-hidden transition-[max-height] duration-300 ease-in-out transition-opacity`}
                >
                  <div className="p-5 md:p-6">
                    <div className="space-y-5">
                      {group.subtitle && (
                        <h4 className="text-xl md:text-2xl font-extrabold text-foreground text-center">
                          {group.subtitle}
                        </h4>
                      )}
                      {group.items && group.items.length > 0 ? (
                        <ul className="space-y-4 list-disc pl-6 marker:text-primary">
                          {group.items.map((item, itemIndex) => (
                            <li key={itemIndex}>
                              <p className="font-semibold text-foreground">{item.title}</p>
                              <p className="text-muted-foreground text-sm md:text-base">
                                {item.description}
                              </p>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GainFromCourse;
