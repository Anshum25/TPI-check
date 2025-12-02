import { Clock, Calendar, Users } from "lucide-react";

const CourseDetails = () => {
  return (
    <section className="py-12 md:py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header - Full Width */}
          <div className="mb-12 md:mb-14">
            <span className="text-xs font-semibold text-primary uppercase tracking-widest mb-4 inline-block">Program Overview</span>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight text-foreground">
              The <span className="text-primary">Course</span>
            </h2>
          </div>

          {/* Main Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-stretch">
            {/* Left - Schedule Card (on desktop) / Last (on mobile) */}
            <div className="order-2 md:order-1 bg-card border border-border/60 rounded-2xl shadow-soft p-6 md:p-8">
              <h3 className="text-2xl font-bold text-foreground mb-8">Batch Schedule</h3>

              {/* Morning Batches */}
              <div className="mb-8">
                <h4 className="text-lg font-bold text-foreground mb-4 flex items-center gap-3">
                  <span className="w-1 h-6 bg-primary rounded-full"></span>
                  Morning
                </h4>
                <div className="space-y-3 ml-4">
                  <div className="flex items-center justify-between pb-3 border-b border-border/40">
                    <span className="text-muted-foreground text-sm md:text-base">Batch 1</span>
                    <span className="font-semibold text-foreground text-sm md:text-base">8:00 am to 9:30 am</span>
                  </div>
                  <div className="flex items-center justify-between pb-3 border-b border-border/40">
                    <span className="text-muted-foreground text-sm md:text-base">Batch 2</span>
                    <span className="font-semibold text-foreground text-sm md:text-base">9:30 am to 11:00 am</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-sm md:text-base">Batch 3</span>
                    <span className="font-semibold text-foreground text-sm md:text-base">11:00 am to 12:30 pm</span>
                  </div>
                </div>
              </div>

              {/* Evening Batches */}
              <div>
                <h4 className="text-lg font-bold text-foreground mb-4 flex items-center gap-3">
                  <span className="w-1 h-6 bg-accent rounded-full"></span>
                  Evening
                </h4>
                <div className="space-y-3 ml-4">
                  <div className="flex items-center justify-between pb-3 border-b border-border/40">
                    <span className="text-muted-foreground text-sm md:text-base">Batch 4</span>
                    <span className="font-semibold text-foreground text-sm md:text-base">6:00 pm to 7:30 pm</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-sm md:text-base">Batch 5</span>
                    <span className="font-semibold text-foreground text-sm md:text-base">7:30 pm to 9:00 pm</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Key Details (on desktop) / First (on mobile) */}
            <div className="order-1 md:order-2 space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-bold text-foreground text-lg">Duration</p>
                  <p className="text-muted-foreground">Two months</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="font-bold text-foreground text-lg">Sessions</p>
                  <p className="text-muted-foreground">Monday to Friday (90 minutes)</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-bold text-foreground text-lg">Seminars</p>
                  <p className="text-muted-foreground">Twice in a month (Saturday)</p>
                </div>
              </div>
            </div>

            {/* Right - Schedule Card (on desktop) / Last (on mobile) */}
            <div className="order-2 md:order-2 bg-card border border-border/60 rounded-2xl shadow-soft p-6 md:p-8">
              <h3 className="text-2xl font-bold text-foreground mb-8">Batch Schedule</h3>

              {/* Morning Batches */}
              <div className="mb-8">
                <h4 className="text-lg font-bold text-foreground mb-4 flex items-center gap-3">
                  <span className="w-1 h-6 bg-primary rounded-full"></span>
                  Morning
                </h4>
                <div className="space-y-3 ml-4">
                  <div className="flex items-center justify-between pb-3 border-b border-border/40">
                    <span className="text-muted-foreground text-sm md:text-base">Batch 1</span>
                    <span className="font-semibold text-foreground text-sm md:text-base">8:00 am to 9:30 am</span>
                  </div>
                  <div className="flex items-center justify-between pb-3 border-b border-border/40">
                    <span className="text-muted-foreground text-sm md:text-base">Batch 2</span>
                    <span className="font-semibold text-foreground text-sm md:text-base">9:30 am to 11:00 am</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-sm md:text-base">Batch 3</span>
                    <span className="font-semibold text-foreground text-sm md:text-base">11:00 am to 12:30 pm</span>
                  </div>
                </div>
              </div>

              {/* Evening Batches */}
              <div>
                <h4 className="text-lg font-bold text-foreground mb-4 flex items-center gap-3">
                  <span className="w-1 h-6 bg-accent rounded-full"></span>
                  Evening
                </h4>
                <div className="space-y-3 ml-4">
                  <div className="flex items-center justify-between pb-3 border-b border-border/40">
                    <span className="text-muted-foreground text-sm md:text-base">Batch 4</span>
                    <span className="font-semibold text-foreground text-sm md:text-base">6:00 pm to 7:30 pm</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-sm md:text-base">Batch 5</span>
                    <span className="font-semibold text-foreground text-sm md:text-base">7:30 pm to 9:00 pm</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseDetails;
