import { Clock, Calendar, Users, ChevronDown } from "lucide-react";
import { useState } from "react";

const CourseDetails = () => {
  const [expandedSchedule, setExpandedSchedule] = useState<"morning" | "evening" | null>("morning");

  const batches = {
    morning: [
      { name: "Batch 1", time: "8:00 am to 9:30 am" },
      { name: "Batch 2", time: "9:30 am to 11:00 am" },
      { name: "Batch 3", time: "11:00 am to 12:30 pm" },
    ],
    evening: [
      { name: "Batch 4", time: "6:00 pm to 7:30 pm" },
      { name: "Batch 5", time: "7:30 pm to 9:00 pm" },
    ],
  };

  return (
    <section className="py-12 md:py-16 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header - Left Aligned */}
          <div className="mb-10 md:mb-12">
            <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider rounded-full mb-3">
              Program Overview
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">
              The <span className="text-primary">Course</span>
            </h2>
          </div>

          {/* Key Details Grid - Compact on Mobile */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-10 md:mb-12">
            <div className="bg-card border border-border/40 rounded-xl p-5 md:p-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-bold text-foreground text-sm md:text-base">Duration</p>
                  <p className="text-muted-foreground text-sm">Two months</p>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border/40 rounded-xl p-5 md:p-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <Calendar className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="font-bold text-foreground text-sm md:text-base">Sessions</p>
                  <p className="text-muted-foreground text-sm">Mon-Fri (90 min)</p>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border/40 rounded-xl p-5 md:p-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-bold text-foreground text-sm md:text-base">Seminars</p>
                  <p className="text-muted-foreground text-sm">2x/month (Sat)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Batch Schedule - Expandable on Mobile */}
          <div className="bg-card border border-border/60 rounded-xl shadow-soft overflow-hidden">
            <h3 className="text-lg md:text-xl font-bold text-foreground p-5 md:p-6 border-b border-border/40">Batch Schedule</h3>

            <div className="divide-y divide-border/40">
              {/* Morning Schedule */}
              <div>
                <button
                  onClick={() => setExpandedSchedule(expandedSchedule === "morning" ? null : "morning")}
                  className="w-full flex items-center justify-between p-5 md:p-6 hover:bg-secondary/30 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-primary"></span>
                    <h4 className="font-bold text-foreground text-sm md:text-base">Morning Batches</h4>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-muted-foreground transition-transform ${
                      expandedSchedule === "morning" ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {expandedSchedule === "morning" && (
                  <div className="px-5 md:px-6 pb-5 md:pb-6 space-y-3 bg-secondary/20">
                    {batches.morning.map((batch, idx) => (
                      <div key={idx} className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{batch.name}</span>
                        <span className="font-semibold text-foreground">{batch.time}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Evening Schedule */}
              <div>
                <button
                  onClick={() => setExpandedSchedule(expandedSchedule === "evening" ? null : "evening")}
                  className="w-full flex items-center justify-between p-5 md:p-6 hover:bg-secondary/30 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-accent"></span>
                    <h4 className="font-bold text-foreground text-sm md:text-base">Evening Batches</h4>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-muted-foreground transition-transform ${
                      expandedSchedule === "evening" ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {expandedSchedule === "evening" && (
                  <div className="px-5 md:px-6 pb-5 md:pb-6 space-y-3 bg-secondary/20">
                    {batches.evening.map((batch, idx) => (
                      <div key={idx} className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{batch.name}</span>
                        <span className="font-semibold text-foreground">{batch.time}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseDetails;
