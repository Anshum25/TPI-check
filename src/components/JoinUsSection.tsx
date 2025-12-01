const JoinUsSection = () => {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Large Bold Title Section */}
          <div className="mb-16 md:mb-20">
            <div className="inline-block mb-4">
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">Start Your Journey</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground mb-6">
              Bring a <span className="text-primary">Turning Point</span> in your life
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
              Be fluent and confident in English, from basic to advanced level
            </p>
          </div>

          {/* Split Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch mb-16">
            {/* Left - Main Content */}
            <div className="flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-6">Why Turning Point?</h3>

                <div className="space-y-6">
                  <div className="border-l-4 border-primary pl-6 py-2">
                    <p className="font-semibold text-foreground mb-2">Established Since 1999</p>
                    <p className="text-muted-foreground text-sm">
                      Founded by Ashish Bhatt and Pragna Bhatt, we've been the ultimate solution for effective English communication skills in Ahmedabad for over 25 years.
                    </p>
                  </div>

                  <div className="border-l-4 border-accent pl-6 py-2">
                    <p className="font-semibold text-foreground mb-2">Learn Directly from Founders</p>
                    <p className="text-muted-foreground text-sm">
                      Study with Mr Ashish Bhatt and Mrs Pragna Bhatt themselves. Their rich experience in making students fluent and confident is unmatched.
                    </p>
                  </div>

                  <div className="border-l-4 border-primary pl-6 py-2">
                    <p className="font-semibold text-foreground mb-2">Out of the Box Teaching</p>
                    <p className="text-muted-foreground text-sm">
                      Our unique approach is completely unconventional and highly effective. You'll find learning Spoken English easy and genuinely interesting.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Stats & Highlight */}
            <div className="flex flex-col justify-between gap-6">
              <div className="gradient-hero rounded-xl p-8 text-primary-foreground">
                <p className="text-5xl font-bold mb-2">25+</p>
                <p className="text-lg font-semibold mb-3">Years of Excellence</p>
                <p className="text-primary-foreground/90 text-sm leading-relaxed">
                  Two decades of transforming lives and building confidence in English communication. Join thousands of successful alumni.
                </p>
              </div>

              <div className="bg-secondary/50 rounded-xl p-8 border-2 border-accent/30">
                <p className="text-2xl font-bold text-foreground mb-3">Perfect Institute For You</p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  If you're looking for the best English speaking classes in Ahmedabad, Turning Point is the ultimate choice. We've evolved into an institution of excellence.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Full Width Message */}
          <div className="bg-gradient-to-r from-primary/10 via-transparent to-accent/10 border border-primary/20 rounded-xl p-8 md:p-12">
            <div className="max-w-3xl">
              <h3 className="text-xl md:text-2xl font-bold text-foreground mb-4">Our Promise</h3>
              <p className="text-muted-foreground leading-relaxed">
                The real strength of any institute is its teachers. At Turning Point, you're not just a student – you're part of a community led by the founders themselves. Your success is our responsibility. You'll experience a teaching method that's proven effective for making students fluent, confident, and genuinely interested in learning English.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinUsSection;
