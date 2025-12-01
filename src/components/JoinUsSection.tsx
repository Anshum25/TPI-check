import { BookOpen, Users, Lightbulb } from "lucide-react";

const JoinUsSection = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              Join us and bring a <span className="text-primary">Turning Point</span> in your life
            </h2>
            <p className="text-muted-foreground text-lg">From basic to advanced level</p>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {/* Card 1 */}
            <div className="bg-card p-6 rounded-lg shadow-soft border border-border/50">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full gradient-hero text-primary-foreground mb-4">
                <BookOpen className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-3">25+ Years of Excellence</h3>
              <p className="text-sm text-muted-foreground">
                Established by Ashish Bhatt and Pragna Bhatt in 1999, we've been the ultimate solution for effective English communication skills.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-card p-6 rounded-lg shadow-soft border border-border/50">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full gradient-accent text-accent-foreground mb-4">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-3">Learn from Founders</h3>
              <p className="text-sm text-muted-foreground">
                Study directly with the institute owners - Mr Ashish Bhatt and Mrs Pragna Bhatt who have rich experience in making students fluent and confident.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-card p-6 rounded-lg shadow-soft border border-border/50">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full gradient-hero text-primary-foreground mb-4">
                <Lightbulb className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-3">Unique Teaching Method</h3>
              <p className="text-sm text-muted-foreground">
                Our teaching approach is completely out of the box and highly effective. You'll find learning Spoken English very easy and interesting.
              </p>
            </div>
          </div>

          {/* Main Message */}
          <div className="bg-gradient-to-r from-primary/5 to-accent/5 p-8 md:p-10 rounded-xl border border-primary/10">
            <p className="text-muted-foreground text-base leading-relaxed">
              Be fluent and confident in English just like our students. Turning Point Institute is well-known as the best English speaking classes in Ahmedabad. Over two decades, we've evolved into an ultimate solution for effective communication skills. If you're looking for the best english speaking classes in Ahmedabad, Turning Point is the perfect institute for you to achieve your goal.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinUsSection;
