import { DEFAULT_CONTENT, useContent } from "@/lib/content";
import googleLogo from "@/assets/google.svg";
import facebookLogo from "@/assets/facebook.svg";
import justdialLogo from "@/assets/justdial.svg";
import { useNavigate } from "react-router-dom";

const HomeReviewsSection = () => {
  const { content } = useContent();
  const successStories = content.successStories ?? DEFAULT_CONTENT.successStories;
  const home = content.home ?? DEFAULT_CONTENT.home;
  const links = successStories?.cta?.reviewLinks || [];
  const homeReviews = home?.homeReviews;
  const navigate = useNavigate();

  if (!links.length) return null;

  return (
    <section className="py-16 md:py-20 relative overflow-hidden bg-gradient-to-br from-rose-50/80 via-blue-50/60 to-purple-50/70 dark:from-rose-950/20 dark:via-blue-950/15 dark:to-purple-950/25">
      <div className="absolute top-10 left-10 w-20 h-20 bg-rose-200/30 dark:bg-rose-800/20 rounded-full blur-xl"></div>
      <div className="absolute top-32 right-16 w-16 h-16 bg-blue-200/40 dark:bg-blue-800/25 rounded-full blur-lg"></div>
      <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-purple-200/35 dark:bg-purple-800/20 rounded-full blur-md"></div>
      <div className="absolute bottom-32 right-1/3 w-24 h-24 bg-pink-200/25 dark:bg-pink-800/15 rounded-full blur-2xl"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            {homeReviews?.title || "Review from our achievers"}
          </h2>
          <p className="text-muted-foreground mb-6">
            {homeReviews?.subtitle || "Read authentic reviews from students who transformed their English and personality with us."}
          </p>
        
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {links.map((item, i) => {
            const label = item.label.toLowerCase();
            const targetId = label.includes("google")
              ? "google-reviews"
              : label.includes("facebook")
              ? "facebook-reviews"
              : label.includes("justdial")
              ? "justdial-reviews"
              : "";

            const src = label.includes("google")
              ? googleLogo
              : label.includes("facebook")
              ? facebookLogo
              : justdialLogo;
            const alt = label.includes("google")
              ? "Google"
              : label.includes("facebook")
              ? "Facebook"
              : "JustDial";

            const handleClick = () => {
              if (targetId) {
                navigate("/reviews", { state: { scrollTo: targetId } });
              } else {
                navigate("/reviews");
              }
            };

            return (
              <button
                key={i}
                type="button"
                onClick={handleClick}
                className="bg-card border border-border/60 rounded-xl shadow-soft p-5 flex items-center justify-center gap-3 hover:shadow-medium transition-shadow w-full"
              >
                <img src={src} alt={`${alt} logo`} className="h-7 w-7" />
                <span className="font-semibold text-foreground text-sm md:text-base">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HomeReviewsSection;
