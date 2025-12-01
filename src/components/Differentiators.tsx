import { Award, Users, Star } from "lucide-react";

const Differentiators = () => {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
          {/* Card 1 */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
            <div className="relative bg-white dark:bg-slate-950 border border-primary/20 rounded-2xl p-8 md:p-10 shadow-soft hover:shadow-medium transition-all duration-300">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-14 w-14 rounded-xl bg-gradient-to-br from-primary to-primary/80 text-white">
                    <Star className="h-7 w-7" />
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-primary/70 uppercase tracking-wide mb-1">Our Excellence</p>
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">
                    An Institute Exclusively for
                  </h3>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                  <p className="text-lg md:text-xl font-semibold text-foreground">Spoken English</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                  <p className="text-lg md:text-xl font-semibold text-foreground">Personality Development</p>
                </div>
              </div>
              <p className="mt-6 text-muted-foreground">Specialized training designed specifically for these core areas of transformation</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-accent/5 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
            <div className="relative bg-white dark:bg-slate-950 border border-accent/20 rounded-2xl p-8 md:p-10 shadow-soft hover:shadow-medium transition-all duration-300">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-14 w-14 rounded-xl bg-gradient-to-br from-accent to-accent/80 text-white">
                    <Award className="h-7 w-7" />
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-accent/70 uppercase tracking-wide mb-1">Our Proven Track Record</p>
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">
                    Trained 10,000+ Students Since 1999
                  </h3>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-foreground">Coaching by Founders</p>
                    <p className="text-sm text-muted-foreground">Direct mentorship from institute founders with 25+ years experience</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Star className="h-5 w-5 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-foreground">No Franchises/No Branches</p>
                    <p className="text-sm text-muted-foreground">Single location ensures consistent quality and personalized attention</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { number: "10,000+", label: "Students Trained" },
            { number: "25+", label: "Years of Excellence" },
            { number: "95%", label: "Success Rate" },
            { number: "4.9/5", label: "Student Rating" },
          ].map((stat, index) => (
            <div key={index} className="text-center p-4 md:p-6">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <p className="text-sm md:text-base text-muted-foreground font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Differentiators;
