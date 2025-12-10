import { Clock, Calendar, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useContent } from "@/lib/content";

const CourseDetails = () => {
  const { content } = useContent();
  const co = content.home.courseOverview;
  const rawTitleParts = co?.title
    ? [co.title]
    : [co?.titleBefore, co?.titleHighlight, co?.titleAfter].filter(Boolean);
  const rawTitle = (rawTitleParts.join(" ") || "The Course").trim();
  const words = rawTitle.split(" ");
  const lastWord = words.pop() || "";
  const leading = words.join(" ");
  return (
    <section className="py-6 md:py-20 relative overflow-hidden bg-gradient-to-br from-rose-50/80 via-blue-50/60 to-purple-50/70 dark:from-rose-950/20 dark:via-blue-950/15 dark:to-purple-950/25">
      {/* Decorative background elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-rose-200/30 dark:bg-rose-800/20 rounded-full blur-xl"></div>
      <div className="absolute top-32 right-16 w-16 h-16 bg-blue-200/40 dark:bg-blue-800/25 rounded-full blur-lg"></div>
      <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-purple-200/35 dark:bg-purple-800/20 rounded-full blur-md"></div>
      <div className="absolute bottom-32 right-1/3 w-24 h-24 bg-pink-200/25 dark:bg-pink-800/15 rounded-full blur-2xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Header - Full Width */}
          <div className="mb-12 md:mb-14">
            <span className="text-xs font-semibold text-primary uppercase tracking-widest mb-4 inline-block">{co?.kicker || "Program Overview"}</span>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight text-foreground">
              {leading && <>{leading} </>}
              <span className="text-primary">{lastWord}</span>
            </h2>
          </div>

          {/* Main Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-stretch">
            {/* Left - Schedule Card (on desktop) / Last (on mobile) */}
            <div className="order-2 md:order-1 bg-card border border-border/60 rounded-2xl shadow-soft p-6 md:p-8">
              <h3 className="text-2xl font-bold text-foreground mb-8">{co?.titleHighlight ? `${co.titleHighlight} Schedule` : 'Batch Schedule'}</h3>
              {(co?.schedule || [
                { heading: 'Morning', color: 'primary', items: [{label:'Batch 1', time:'8:00 am to 9:30 am'},{label:'Batch 2', time:'9:30 am to 11:00 am'},{label:'Batch 3', time:'11:00 am to 12:30 pm'}] },
                { heading: 'Evening', color: 'accent', items: [{label:'Batch 4', time:'6:00 pm to 7:30 pm'},{label:'Batch 5', time:'7:30 pm to 9:00 pm'}] },
              ]).map((g, gi) => (
                <div key={gi} className={gi === 0 ? 'mb-8' : ''}>
                  <h4 className="text-lg font-bold text-foreground mb-4 flex items-center gap-3">
                    <span className={`w-1 h-6 ${(g.color ?? (gi === 1 ? 'accent' : 'primary')) === 'accent' ? 'bg-accent' : 'bg-primary'} rounded-full`}></span>
                    {g.heading}
                  </h4>
                  <div className="space-y-3 ml-0 md:ml-4">
                    {(g.items || []).map((it, ii) => (
                      <div key={ii} className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 pb-3 ${ii < (g.items?.length || 0) - 1 ? 'border-b border-border/40' : ''}`}>
                        <span className="text-muted-foreground text-sm md:text-base whitespace-nowrap">{it.label}</span>
                        <span className="font-semibold text-foreground text-sm md:text-base whitespace-nowrap">{it.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Right - Key Details (on desktop) / First (on mobile) */}
            <div className="order-1 md:order-2 space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0"><Clock className="w-6 h-6 text-primary" /></div>
                <div>
                  <p className="font-bold text-foreground text-lg">{(co?.details?.[0]?.title) || 'Duration'}</p>
                  <p className="text-muted-foreground">{(co?.details?.[0]?.description) || 'Two months'}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0"><Calendar className="w-6 h-6 text-accent" /></div>
                <div>
                  <p className="font-bold text-foreground text-lg">{(co?.details?.[1]?.title) || 'Sessions'}</p>
                  <p className="text-muted-foreground">{(co?.details?.[1]?.description) || 'Monday to Friday (90 minutes)'}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0"><Users className="w-6 h-6 text-primary" /></div>
                <div>
                  <p className="font-bold text-foreground text-lg">{(co?.details?.[2]?.title) || 'Seminars'}</p>
                  <p className="text-muted-foreground">{(co?.details?.[2]?.description) || 'Twice in a month (Saturday)'}</p>
                </div>
              </div>

              {/* CTA Section */}
              <div className="mt-auto pt-8 border-t border-border/40">
                <p className="text-muted-foreground text-sm mb-4">{co?.ctaText || 'Ready to start your transformation journey?'}</p>
                <Button asChild className="w-full gradient-accent">
                  <Link to={co?.ctaLink || "/contact"}>
                    {co?.ctaButton || 'Contact Us'}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseDetails;
