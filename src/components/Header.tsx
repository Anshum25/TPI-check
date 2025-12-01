import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import RequestCallbackDialog from "@/components/RequestCallbackDialog";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [callbackOpen, setCallbackOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About Us" },
    // { path: "/courses", label: "Courses" },
    { path: "/faculty", label: "Faculty" },
    { path: "/admissions", label: "Admissions" },
    { path: "/success-stories", label: "Success Stories" },
    { path: "/gallery", label: "Gallery" },
    { path: "/reviews", label: "Reviews" },
    { path: "/faq", label: "FAQ" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="w-full px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex items-center">
              <img
                src="https://turningpointinstitute.in/wp-content/uploads/2022/07/cropped-cropped-cropped-Blue-Dark-Minimalist-Initial-T-Letter-Logo-512-x-512-px-1.png"
                alt="Logo"
                className="h-10 w-10 rounded-full object-cover"
              />
              <div className="ml-3">
                <h1 className="text-lg font-bold leading-tight">TURNING POINT INSTITUTE</h1>
                <p className="text-xs text-muted-foreground">THE ONE TO TURN TO</p>
              </div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${isActive(link.path) ? "text-primary" : "text-foreground/60"
                  }`}
              >
                {link.label}
              </Link>
            ))}
            <Button size="sm" className="gradient-accent" type="button" onClick={() => setCallbackOpen(true)}>
              <Phone className="mr-2 h-4 w-4" />
              Request Callback
            </Button>
          </nav>

          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-sm font-medium transition-colors hover:text-primary ${isActive(link.path) ? "text-primary" : "text-foreground/60"
                    }`}
                >
                  {link.label}
                </Link>
              ))}
              <Button size="sm" className="gradient-accent w-full" type="button" onClick={() => setCallbackOpen(true)}>
                <Phone className="mr-2 h-4 w-4" />
                Request Callback
              </Button>
            </div>
          </nav>
        )}
      </div>
      <RequestCallbackDialog open={callbackOpen} onOpenChange={setCallbackOpen} />
    </header>
  );
};

export default Header;
