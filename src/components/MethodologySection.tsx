import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useContent } from "@/lib/content";

const MethodologySection = () => {
  const { content } = useContent();
  const methodologySections = content?.home?.methodologySections || [];
  const methodologyHeading = content?.home?.methodologyHeading || "How We Teach";
  const methodologyTitle = content?.home?.methodologyTitle || "Our Teaching Methodology";

  const [expandedIndex, setExpandedIndex] = useState<number>(0);
  const contentRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    // update maxHeight + opacity for each accordion panel when expandedIndex changes
    contentRefs.current.forEach((el, i) => {
      if (!el) return;
      if (expandedIndex === i) {
        // set to scrollHeight so CSS transition on max-height animates
        el.style.maxHeight = `${el.scrollHeight}px`;
        el.style.opacity = "1";
      } else {
        el.style.maxHeight = "0px";
        el.style.opacity = "0";
      }
    });
  }, [expandedIndex, methodologySections.length]);

  if (methodologySections.length === 0) return null;

  return (
    <section className="py-12 md:py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-10 md:mb-14">
            <span className="text-xs font-semibold text-primary uppercase tracking-widest mb-4 inline-block">
              {methodologyHeading}
            </span>
            <h2 className="text-2xl md:text-4xl font-bold leading-tight text-foreground">
              {methodologyTitle}
            </h2>
          </div>

          {/* Expandable Sections */}
          <div className="space-y-3">
            {methodologySections.map((section, index) => (
              <div
                key={index}
                className="border border-border/60 rounded-xl overflow-hidden bg-card"
              >
                {/* Header Button */}
                <button
                  type="button"
                  aria-expanded={expandedIndex === index}
                  aria-controls={`methodology-panel-${index}`}
                  onClick={() =>
                    setExpandedIndex((prev) => (prev === index ? -1 : index))
                  }
                  className="w-full flex items-center justify-between p-5 md:p-6 hover:bg-secondary/30 transition-colors text-left group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-sm md:text-base font-bold text-primary">
                      +
                    </span>
                    <h3 className="text-lg md:text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {section.title}
                    </h3>
                  </div>

                  <ChevronDown
                    className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform duration-500 ease-in-out ${expandedIndex === index ? "rotate-180" : ""
                      }`}
                    aria-hidden
                  />
                </button>

                {/* Expanded Content */}
                <div
                  id={`methodology-panel-${index}`}
                  ref={(el) => (contentRefs.current[index] = el)}
                  className="border-t border-border/40 bg-secondary/10 space-y-5 overflow-hidden transition-[max-height] duration-300 ease-in-out transition-opacity"
                  // initial inline styles ensure collapsed state until effect runs
                  style={{ maxHeight: expandedIndex === index ? undefined : "0px", opacity: expandedIndex === index ? 1 : 0 }}
                >
                  <div className="p-5 md:p-6">
                    {(() => {
                      const desc = (section.description && section.description.trim().length > 0)
                        ? section.description
                        : (section.intro || "");
                      return desc ? (
                        <p className="text-muted-foreground text-sm md:text-base leading-relaxed">{desc}</p>
                      ) : null;
                    })()}

                    {index === 1 && section.objectives && section.objectives.length > 0 && (
                      <div>
                        {index === 1 && section.objectivesTitle && (
                          <h5 className="font-bold text-foreground mb-3 mt-8 text-sm md:text-base">
                            {section.objectivesTitle}
                          </h5>
                        )}
                        <ul className="space-y-2">
                          {section.objectives.map((objective: string, idx: number) => (
                            <li
                              key={idx}
                              className="flex items-start gap-3 text-sm md:text-base"
                            >
                              <span className="text-primary font-bold mt-1">•</span>
                              <span className="text-muted-foreground leading-relaxed">
                                {objective}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {section.images && section.images.length > 0 && (
                      <div className="mt-8 grid grid-cols-3 gap-4">
                        {section.images.map((image, imgIdx) => (
                          <div
                            key={imgIdx}
                            className="overflow-hidden rounded-lg shadow-medium"
                          >
                            <img
                              src={image.src.startsWith('data:') || image.src.startsWith('http') ? image.src : image.src}
                              alt={image.alt || `Section image ${imgIdx + 1}`}
                              className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                              onError={(e) => {
                                (e.target as HTMLImageElement).style.display = 'none';
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    )}
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

export default MethodologySection;
