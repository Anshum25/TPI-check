import { useState, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { useContent } from "@/lib/content";

const GainFromCourse = () => {
  const { content } = useContent();
  const { admissions } = content;
  const groups = admissions.targetGroups || [];

  const [expandedIndex, setExpandedIndex] = useState<number>(0);
  const contentRefs = useRef<Array<HTMLDivElement | null>>([]);

  if (!groups.length) return null;

  return (
    <section className="py-12 md:py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-10 md:mb-14 text-center md:text-left">
            <span className="text-xs font-semibold text-primary uppercase tracking-widest mb-3 inline-block">
              What You Will Gain
            </span>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight text-foreground">
              What you would gain from the <span className="text-primary">course!</span>
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
                  style={{
                    maxHeight:
                      expandedIndex === index
                        ? (contentRefs.current[index]?.scrollHeight || 0) + 24
                        : 0,
                  }}
                  className={`border-t border-border/40 bg-secondary/10 overflow-hidden transition-[max-height] duration-300 ease-in-out transition-opacity ${
                    expandedIndex === index ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <div className="p-5 md:p-6">
                    {group.title.toLowerCase().includes("working") ? (
                      <div className="space-y-5">
                        <h4 className="text-xl md:text-2xl font-extrabold text-foreground text-center">
                          Make English your strength and achieve higher professional growth!
                        </h4>
                        <ul className="space-y-4 list-disc pl-6 marker:text-primary">
                          <li>
                            <p className="font-semibold text-foreground">Correct Language (Written Communication)</p>
                            <p className="text-muted-foreground text-sm md:text-base">
                              Present your ideas effectively with extraordinary skills to construct smallest to most complex sentences with absolute clarity and decency.
                            </p>
                          </li>
                          <li>
                            <p className="font-semibold text-foreground">Presentation Skills (Verbal Communication)</p>
                            <p className="text-muted-foreground text-sm md:text-base">
                              Speak fluently in English with tremendous confidence that you are always correct in the language. Remove stage fear and develop correct body language by performing various activities on the stage.
                            </p>
                          </li>
                          <li>
                            <p className="font-semibold text-foreground">Be a quick learner ( Reading Skills)</p>
                            <p className="text-muted-foreground text-sm md:text-base">
                              Develop ability To Read with Double speed and understand the mails and Other written Communication Without Any Confusion . Pursue Further Education or Training with Excellent Reading Skills and Get Success
                            </p>
                          </li>
                        </ul>
                      </div>
                    ) : group.title.toLowerCase().includes("student") ? (
                      <div className="space-y-5">
                        <h4 className="text-xl md:text-2xl font-extrabold text-foreground text-center">
                          Make English your language to get success in higher education and social life
                        </h4>
                        <ul className="space-y-4 list-disc pl-6 marker:text-primary">
                          <li>
                            <p className="font-semibold text-foreground">Replace your mother tongue with English</p>
                            <p className="text-muted-foreground text-sm md:text-base">
                              Get so much clarity and perfection in English that you would speak in English every where and with anyone.
                            </p>
                          </li>
                          <li>
                            <p className="font-semibold text-foreground">Make your higher education interesting and burden-less</p>
                            <p className="text-muted-foreground text-sm md:text-base">
                              Develop very effective reading and writing skills which would help you to study effectively and get good marks in collage.
                            </p>
                          </li>
                          <li>
                            <p className="font-semibold text-foreground">Transform into a confident and out spoken person</p>
                            <p className="text-muted-foreground text-sm md:text-base">
                              A number of speaking activities will help you transform into a person with confidence to communicate effectively and create own identity where ever you go.
                            </p>
                          </li>
                        </ul>
                      </div>
                    ) : group.title.toLowerCase().includes("home") ? (
                      <div className="space-y-5">
                        <h4 className="text-xl md:text-2xl font-extrabold text-foreground text-center">
                          Get fluency and confidence in spoken English and play your roles effectively.
                        </h4>
                        <ul className="space-y-4 list-disc pl-6 marker:text-primary">
                          <li>
                            <p className="font-semibold text-foreground">Be the best teacher of your child</p>
                            <p className="text-muted-foreground text-sm md:text-base">
                              You will get amazing clarity in English language which will help you to support your child who is studying in English medium. Also you will be able to communicate effectively with your child's teacher in English.
                            </p>
                          </li>
                          <li>
                            <p className="font-semibold text-foreground">Be fluent and confident</p>
                            <p className="text-muted-foreground text-sm md:text-base">
                              A lot of practice will make you fluent in English and you will be confident to speak in English just like your mother tongue. It will give confidence to your child as well as an environment to learn better in English medium school.
                            </p>
                          </li>
                          <li>
                            <p className="font-semibold text-foreground">Be presentable in social life</p>
                            <p className="text-muted-foreground text-sm md:text-base">
                              A lot of speaking activities like public speaking, group discussions, role plays and more will help you to become confident and presentable in your social circle.
                            </p>
                          </li>
                        </ul>
                      </div>
                    ) : (
                      <ul className="space-y-2 md:space-y-3">
                        {group.benefits.map((b, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm md:text-base">
                            <span className="text-primary font-bold mt-1">•</span>
                            <span className="text-muted-foreground leading-relaxed">{b}</span>
                          </li>
                        ))}
                      </ul>
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

export default GainFromCourse;
