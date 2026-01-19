import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { useContent } from "@/lib/content";
import tpLogo from "@/assets/cropped-cropped-cropped-Blue-Dark-Minimalist-Initial-T-Letter-Logo-512-x-512-px-1-removebg-preview.png";

const Footer = () => {
  const { content } = useContent();
  return (
    <footer id="site-footer" className="relative mt-20 text-primary-foreground bg-gradient-to-b from-slate-800 via-slate-800 to-slate-900">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
        aria-hidden
      />

      <div className="relative container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 items-start">
          {/* Brand + about */}
          <div>
            <div className="flex items-center mb-4">
              <img
                src={tpLogo}
                alt="Turning Point Institute Logo"
                className="h-10 w-10 object-contain"
              />
              <div className="ml-2">
                <span className="block font-bold text-lg leading-tight uppercase">
                  {content.footer.instituteName || "TURNING POINT INSTITUTE"}
                </span>
                <span className="block text-[11px] tracking-[0.18em] text-primary-foreground/80 uppercase">
                  THE ONE TO TURN TO
                </span>
              </div>
            </div>
            <p className="text-sm text-primary-foreground/80 mb-5 max-w-md">
              {content.footer.tagline}
            </p>

            <div className="flex items-center gap-3">
              {content.footer.socialMedia.instagram && (
                <a href={content.footer.socialMedia.instagram} aria-label="Instagram" className="h-9 w-9 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center">
                  <Instagram className="h-4 w-4" />
                </a>
              )}
              {content.footer.socialMedia.facebook && (
                <a href={content.footer.socialMedia.facebook} aria-label="Facebook" className="h-9 w-9 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center">
                  <Facebook className="h-4 w-4" />
                </a>
              )}
              {content.footer.socialMedia.twitter && (
                <a href={content.footer.socialMedia.twitter} aria-label="Twitter" className="h-9 w-9 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center">
                  <Twitter className="h-4 w-4" />
                </a>
              )}
              {content.footer.socialMedia.linkedin && (
                <a href={content.footer.socialMedia.linkedin} aria-label="LinkedIn" className="h-9 w-9 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center">
                  <Linkedin className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:pl-8 xl:pl-12">
            <h3 className="font-bold mb-4 text-accent">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {(content.footer.quickLinks || []).filter((l) => l && typeof l === 'string' && l.trim()).map((linkText, i) => {
                // Map link text to routes
                const routeMap: Record<string, string> = {
                  "Home": "/",
                  "About Us": "/about",
                  "FAQ": "/faq",
                  "Gallery": "/gallery",
                  "Privacy Policy": "/privacy-policy",
                  "Contact": "/contact",
                  "Faculty": "/faculty",
                  "Reviews": "/reviews",
                };
                const route = routeMap[linkText] || "/";
                return (
                  <li key={i}>
                    <Link to={route} className="text-primary-foreground/80 hover:underline hover:decoration-white/60 hover:text-accent">
                      {linkText}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* What We Do */}
          <div>
            <h3 className="font-bold mb-4 text-accent">What We Do</h3>
            <ul className="space-y-2 text-sm">
              {(
                content.footer.whatWeDo && content.footer.whatWeDo.length
                  ? content.footer.whatWeDo
                  : (content.about?.differentiators || []).slice(0, 4).map((item) => item.title)
              ).map((item, i) => (
                <li key={i} className="text-primary-foreground/80">{item}</li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold mb-4 text-accent">Contact Info</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <MapPin className="h-5 w-5 flex-shrink-0 mt-0.5 text-accent" />
                <span className="text-primary-foreground/90">{content.footer.contact.address}</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-5 w-5 flex-shrink-0 text-accent" />
                <span className="text-primary-foreground/90">{content.footer.contact.phone}</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-5 w-5 flex-shrink-0 text-accent" />
                <span className="text-primary-foreground/90">{content.footer.contact.email}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-10 pt-6 text-sm text-primary-foreground/70 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="order-2 md:order-1">{content.footer.copyright}</p>
          <p className="order-1 md:order-2">Made with <span className="text-accent">❤</span> for learners</p>
          <p className="order-3">
            Website by <a href="https://www.devsyncinnovation.in/" target="_blank" rel="noopener noreferrer" className="font-medium hover:underline">DevSync Innovation</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
