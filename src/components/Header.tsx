import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import RequestCallbackDialog from "@/components/RequestCallbackDialog";
import tpLogo from "@/assets/cropped-cropped-cropped-Blue-Dark-Minimalist-Initial-T-Letter-Logo-512-x-512-px-1-removebg-preview.png";



/**
 * Header component with manual-only popup system
 * 
 * Features:
 * - Manual "Request Callback" button in desktop and mobile navigation
 * - No automatic popup timing or interruptions
 * - Clean, simple popup state management
 * - Responsive navigation with mobile menu
 */

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [callbackOpen, setCallbackOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Simple popup handlers
  const handlePopupOpen = () => setCallbackOpen(true);
  const handleDialogChange = (open: boolean) => setCallbackOpen(open);

  useEffect(() => {
    const updateScrolled = () => {
      setIsScrolled(window.scrollY > 10);
    };

    updateScrolled();
    window.addEventListener("scroll", updateScrolled, { passive: true });
    return () => {
      window.removeEventListener("scroll", updateScrolled);
    };
  }, []);

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About Us" },
    // { path: "/courses", label: "Courses" },
    { path: "/faculty", label: "Faculty" },
    { path: "/admissions", label: "Admissions" },
    { path: "/gallery", label: "Gallery" },
    { path: "/reviews", label: "Reviews" },
    { path: "/faq", label: "FAQ" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-colors duration-300 ${isScrolled
          ? "bg-background/30 backdrop-blur-md supports-[backdrop-filter]:bg-background/20"
          : "border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
          }`}
      >
        <div className="container-flex mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <Link to="/" className="flex-shrink-0">
              <div className="flex items-center">
                <img src={tpLogo} alt="Turning Point Institute" className="h-10 w-10 object-contain" />
                <div className="ml-2">
                  <h1 className="text-sm font-bold leading-tight">TURNING POINT INSTITUTE</h1>
                  <p className="text-xs text-muted-foreground">THE ONE TO TURN TO</p>
                </div>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 text-sm font-medium transition-colors hover:text-primary ${isActive(link.path) ? "text-primary" : "text-foreground/60"
                    }`}
                >
                  {link.label}
                </Link>
              ))}
              <Button size="sm" className="gradient-accent ml-4" type="button" onClick={handlePopupOpen}>
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
                <Button size="sm" className="gradient-accent w-full" type="button" onClick={handlePopupOpen}>
                  <Phone className="mr-2 h-4 w-4" />
                  Request Callback
                </Button>
              </div>
            </nav>
          )}
        </div>
        <RequestCallbackDialog open={callbackOpen} onOpenChange={handleDialogChange} />
      </header>
      <div className="h-16" />
    </>
  );
};

export default Header;
