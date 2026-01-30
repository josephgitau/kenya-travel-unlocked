import { useState, useEffect } from 'react';
import { Menu, X, Phone, ChevronDown, Calendar, HelpCircle, Calculator, MapPin } from 'lucide-react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import awiliLogo from '@/assets/awili-safaris-logo.png';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: 'Destinations', href: '/destinations' },
    { label: 'Experiences', href: '#experiences' },
    { label: 'Itinerary', href: '#itinerary' },
    { label: 'Contact', href: '#contact' },
  ];

  const planYourTripLinks = [
    { label: 'Wildlife Calendar', href: '/calendar', icon: Calendar, description: 'Best times to see wildlife' },
    { label: 'Safari Quiz', href: '/quiz', icon: HelpCircle, description: 'Find your perfect safari' },
    { label: 'Instant Quote', href: '/quote', icon: Calculator, description: 'Get pricing instantly' },
    { label: 'Destinations Guide', href: '/destinations', icon: MapPin, description: 'Explore all destinations' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const sectionId = href.replace('#', '');
      setIsMobileMenuOpen(false);

      if (location.pathname === '/') {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        navigate('/' + href);
      }
    }
  };

  const isHomePage = location.pathname === '/';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-card/95 backdrop-blur-md shadow-md py-2'
          : isHomePage 
            ? 'bg-gradient-to-b from-black/50 to-transparent py-4'
            : 'bg-card/95 backdrop-blur-md py-3'
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <img 
              src={awiliLogo} 
              alt="Awili Safaris" 
              className="w-12 h-12 rounded-full object-cover shadow-lg group-hover:scale-105 transition-transform"
            />
            <div className="flex flex-col">
              <span className={`font-display text-xl font-bold leading-tight ${
                isScrolled || !isHomePage ? 'text-foreground' : 'text-white'
              }`}>
                Awili<span className="text-primary">Safaris</span>
              </span>
              <span className={`text-[10px] uppercase tracking-widest ${
                isScrolled || !isHomePage ? 'text-muted-foreground' : 'text-white/70'
              }`}>
                Kenya Adventures
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href.startsWith('#') ? '/' : link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all hover:bg-primary/10 hover:text-primary ${
                  isScrolled || !isHomePage ? 'text-foreground' : 'text-white hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            {/* Plan Your Trip Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button 
                  className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-full transition-all hover:bg-primary/10 hover:text-primary ${
                    isScrolled || !isHomePage ? 'text-foreground' : 'text-white'
                  }`}
                >
                  Plan Your Trip
                  <ChevronDown className="w-4 h-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end" 
                sideOffset={8}
                className="w-72 p-2 bg-card border border-border shadow-elevated rounded-2xl z-50"
              >
                {planYourTripLinks.map((link) => (
                  <DropdownMenuItem key={link.label} asChild>
                    <Link 
                      to={link.href}
                      className="flex items-start gap-3 p-3 rounded-xl cursor-pointer hover:bg-muted transition-colors"
                    >
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                        <link.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-semibold text-foreground">{link.label}</div>
                        <div className="text-xs text-muted-foreground">{link.description}</div>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:+254732017425"
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors hover:bg-muted ${
                isScrolled || !isHomePage ? 'text-foreground' : 'text-white'
              }`}
            >
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Phone className="w-4 h-4 text-primary" />
              </div>
              <span className="hidden xl:inline">+254 732 017 425</span>
            </a>
            <Link 
              to="/quote"
              className="btn-gold text-sm py-2.5 px-6 shadow-lg hover:shadow-xl transition-all"
            >
              Book Safari
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 rounded-full hover:bg-muted/50 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileMenuOpen ? (
              <X className={`w-6 h-6 ${isScrolled || !isHomePage ? 'text-foreground' : 'text-white'}`} />
            ) : (
              <Menu className={`w-6 h-6 ${isScrolled || !isHomePage ? 'text-foreground' : 'text-white'}`} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <nav className="py-4 mt-4 bg-card/95 backdrop-blur-lg rounded-xl p-4 border border-border/50">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href.startsWith('#') ? '/' : link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="flex items-center py-3 text-foreground font-medium hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
            
            {/* Plan Your Trip Section - Mobile */}
            <div className="py-3 mt-2">
              <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Plan Your Trip</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {planYourTripLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="flex flex-col items-center gap-2 p-4 bg-muted/50 rounded-2xl text-center hover:bg-muted transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <link.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-foreground">{link.label}</span>
                </Link>
              ))}
            </div>
            
            <div className="flex items-center gap-3 mt-4 pt-4 border-t border-border/50">
              <a
                href="tel:+254732017425"
                className="flex items-center gap-2 flex-1 justify-center py-3 bg-muted rounded-full text-foreground font-medium"
              >
                <Phone className="w-4 h-4 text-primary" />
                Call Us
              </a>
              <Link 
                to="/quote"
                className="btn-gold flex-1 text-center py-3"
              >
                Book Safari
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
