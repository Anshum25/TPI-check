import { Clock, Calendar, Users } from "lucide-react";

const CourseDetails = () => {
  const batches = [
    { name: "Batch 1", time: "8:00 - 9:30 AM", type: "morning", color: "from-blue-500 to-cyan-500" },
    { name: "Batch 2", time: "9:30 - 11:00 AM", type: "morning", color: "from-blue-600 to-blue-400" },
    { name: "Batch 3", time: "11:00 AM - 12:30 PM", type: "morning", color: "from-cyan-500 to-blue-500" },
    { name: "Batch 4", time: "6:00 - 7:30 PM", type: "evening", color: "from-rose-500 to-orange-500" },
    { name: "Batch 5", time: "7:30 - 9:00 PM", type: "evening", color: "from-rose-600 to-rose-400" },
  ];

  return (
    <section className="py-16 md:py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-12 md:mb-14">
            <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider rounded-full mb-4">
              Program Details
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
              The <span className="text-primary">Course</span>
            </h2>

            {/* Key Stats - 3 Column Layout */}
            <div className="grid grid-cols-3 gap-3 md:gap-6 max-w-3xl">
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg p-4 md:p-5 border border-primary/20">
                <Clock className="w-6 h-6 md:w-7 md:h-7 text-primary mb-2" />
                <p className="text-xs md:text-sm font-semibold text-foreground">Duration</p>
                <p className="text-lg md:text-2xl font-bold text-primary">2 Months</p>
              </div>

              <div className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-lg p-4 md:p-5 border border-accent/20">
                <Calendar className="w-6 h-6 md:w-7 md:h-7 text-accent mb-2" />
                <p className="text-xs md:text-sm font-semibold text-foreground">Sessions</p>
                <p className="text-lg md:text-2xl font-bold text-accent">Mon-Fri</p>
              </div>

              <div className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 rounded-lg p-4 md:p-5 border border-purple-500/20">
                <Users className="w-6 h-6 md:w-7 md:h-7 text-purple-500 mb-2" />
                <p className="text-xs md:text-sm font-semibold text-foreground">Seminars</p>
                <p className="text-lg md:text-2xl font-bold text-purple-500">2x/Month</p>
              </div>
            </div>
          </div>

          {/* Batch Schedule - Large Cards Grid */}
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-foreground mb-6">Available Batches</h3>

            {/* Morning Section */}
            <div className="mb-10">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-1 h-6 rounded-full bg-gradient-to-b from-blue-500 to-cyan-500"></span>
                <h4 className="text-lg font-bold text-foreground">Morning</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {batches.slice(0, 3).map((batch, idx) => (
                  <div
                    key={idx}
                    className={`bg-gradient-to-br ${batch.color} rounded-2xl p-6 md:p-8 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer border border-white/20`}
                  >
                    <div className="flex items-end justify-between h-full">
                      <div>
                        <p className="text-sm font-semibold opacity-90 mb-2">Enrollment Available</p>
                        <h5 className="text-3xl md:text-4xl font-bold mb-4">{batch.name}</h5>
                      </div>
                    </div>
                    <p className="text-base md:text-lg font-bold mt-4 bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 inline-block">
                      {batch.time}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Evening Section */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-1 h-6 rounded-full bg-gradient-to-b from-rose-500 to-orange-500"></span>
                <h4 className="text-lg font-bold text-foreground">Evening</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
                {batches.slice(3).map((batch, idx) => (
                  <div
                    key={idx}
                    className={`bg-gradient-to-br ${batch.color} rounded-2xl p-6 md:p-8 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer border border-white/20`}
                  >
                    <div className="flex items-end justify-between h-full">
                      <div>
                        <p className="text-sm font-semibold opacity-90 mb-2">Enrollment Available</p>
                        <h5 className="text-3xl md:text-4xl font-bold mb-4">{batch.name}</h5>
                      </div>
                    </div>
                    <p className="text-base md:text-lg font-bold mt-4 bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 inline-block">
                      {batch.time}
                    </p>
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
