import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { useContent } from "@/lib/content";

const Footer = () => {
  const { content } = useContent();
  return (
    <footer className="bg-secondary/30 border-t mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <div className="h-10 w-10 rounded-full gradient-hero flex items-center justify-center">
                <span className="text-xl font-bold text-primary-foreground">TP</span>
              </div>
              <span className="ml-2 font-bold text-lg">{content.footer.instituteName}</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              {content.footer.tagline}
            </p>
            <div className="flex space-x-3">
              <a href={content.footer.socialMedia.facebook} className="text-muted-foreground hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">
                <Facebook className="h-5 w-5" />
              </a>
              <a href={content.footer.socialMedia.twitter} className="text-muted-foreground hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">
                <Twitter className="h-5 w-5" />
              </a>
              <a href={content.footer.socialMedia.instagram} className="text-muted-foreground hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">
                <Instagram className="h-5 w-5" />
              </a>
              <a href={content.footer.socialMedia.linkedin} className="text-muted-foreground hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          <div>
            <h3 className="font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {content.footer.quickLinks.map((link, index) => (
                <li key={index}>
                  <Link to={link.to} className="text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Courses</h3>
            <ul className="space-y-2 text-sm">
              {content.footer.courses.map((course, index) => (
                <li key={index} className="text-muted-foreground">{course}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Contact Info</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2 text-muted-foreground">
                <MapPin className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <span>{content.footer.contact.address}</span>
              </li>
              <li className="flex items-center space-x-2 text-muted-foreground">
                <Phone className="h-5 w-5 flex-shrink-0" />
                <span>{content.footer.contact.phone}</span>
              </li>
              <li className="flex items-center space-x-2 text-muted-foreground">
                <Mail className="h-5 w-5 flex-shrink-0" />
                <span>{content.footer.contact.email}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>{content.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
