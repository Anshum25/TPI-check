import { Clock, Calendar, Users } from "lucide-react";

const CourseDetails = () => {
  const batches = [
    { name: "Batch 1", time: "8:00 am - 9:30 am" },
    { name: "Batch 2", time: "9:30 am - 11:00 am" },
    { name: "Batch 3", time: "11:00 am - 12:30 pm" },
    { name: "Batch 4", time: "6:00 pm - 7:30 pm" },
    { name: "Batch 5", time: "7:30 pm - 9:00 pm" },
  ];

  return (
    <section className="py-12 md:py-16 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header - Left Aligned */}
          <div className="mb-10 md:mb-14">
            <span className="text-xs font-semibold text-primary uppercase tracking-widest mb-3 inline-block">Program Overview</span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight text-foreground mb-2">
              The <span className="text-primary">Course</span>
            </h2>
          </div>

          {/* Key Details - Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-10 md:mb-12">
            <div className="border-l-4 border-primary pl-4 md:pl-6 py-3">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-primary" />
                <p className="font-bold text-foreground">Duration</p>
              </div>
              <p className="text-muted-foreground text-sm md:text-base">Two months</p>
            </div>

            <div className="border-l-4 border-accent pl-4 md:pl-6 py-3">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-5 h-5 text-accent" />
                <p className="font-bold text-foreground">Sessions</p>
              </div>
              <p className="text-muted-foreground text-sm md:text-base">Monday to Friday (90 min)</p>
            </div>

            <div className="border-l-4 border-primary pl-4 md:pl-6 py-3">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-5 h-5 text-primary" />
                <p className="font-bold text-foreground">Seminars</p>
              </div>
              <p className="text-muted-foreground text-sm md:text-base">Twice in a month (Saturday)</p>
            </div>
          </div>

          {/* Batch Schedule */}
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-foreground mb-6">Batch Schedule</h3>

            {/* Morning Batches */}
            <div className="mb-8 md:mb-10">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-sm font-semibold text-primary uppercase tracking-wider">Morning</span>
                <span className="w-8 h-0.5 rounded-full bg-primary/30"></span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {batches.slice(0, 3).map((batch, idx) => (
                  <div
                    key={idx}
                    className="bg-card border border-border/60 rounded-xl p-5 md:p-6 shadow-soft hover:shadow-medium transition-all duration-300 hover:border-primary/40"
                  >
                    <div className="mb-4">
                      <p className="text-xs md:text-sm font-semibold text-primary uppercase tracking-wider mb-2">Enrollment Open</p>
                      <h5 className="text-lg md:text-xl font-bold text-foreground">{batch.name}</h5>
                    </div>
                    <div className="pt-4 border-t border-border/40">
                      <p className="text-sm md:text-base font-semibold text-primary">{batch.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Evening Batches */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-sm font-semibold text-accent uppercase tracking-wider">Evening</span>
                <span className="w-8 h-0.5 rounded-full bg-accent/30"></span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {batches.slice(3).map((batch, idx) => (
                  <div
                    key={idx}
                    className="bg-card border border-border/60 rounded-xl p-5 md:p-6 shadow-soft hover:shadow-medium transition-all duration-300 hover:border-accent/40"
                  >
                    <div className="mb-4">
                      <p className="text-xs md:text-sm font-semibold text-accent uppercase tracking-wider mb-2">Enrollment Open</p>
                      <h5 className="text-lg md:text-xl font-bold text-foreground">{batch.name}</h5>
                    </div>
                    <div className="pt-4 border-t border-border/40">
                      <p className="text-sm md:text-base font-semibold text-accent">{batch.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseDetails;
