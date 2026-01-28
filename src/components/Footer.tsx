import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter, Youtube, Shield, Award, CreditCard, Calendar, HelpCircle, Calculator, Loader2 } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';

const emailSchema = z.string().trim().email('Please enter a valid email address').max(255);

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const scrollToSection = (href: string) => {
    const sectionId = href.replace('#', '');
    if (location.pathname === '/') {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/' + href);
    }
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = emailSchema.safeParse(email);
    if (!result.success) {
      toast({
        title: 'Invalid email',
        description: result.error.errors[0].message,
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert({ email: email.trim() });

      if (error) {
        if (error.code === '23505') { // Unique violation
          toast({
            title: 'Already subscribed',
            description: 'This email is already on our mailing list!',
          });
        } else {
          throw error;
        }
      } else {
        toast({
          title: 'Successfully subscribed!',
          description: 'Thank you for joining our safari community.',
        });
        setEmail('');
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      toast({
        title: 'Subscription failed',
        description: 'Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const safariPackages = [
    { label: 'Maasai Mara Safari Adventure', href: '/package/maasai-mara' },
    { label: 'Amboseli Elephant Paradise', href: '/package/amboseli' },
    { label: 'Samburu Wilderness Experience', href: '/package/samburu' },
    { label: 'Diani Beach Coastal Escape', href: '/package/diani-beach' },
    { label: 'Lake Naivasha Weekend Getaway', href: '/package/lake-naivasha' },
  ];

  const planYourSafari = [
    { label: 'Wildlife Calendar', href: '/calendar', icon: Calendar },
    { label: 'Safari Quiz', href: '/quiz', icon: HelpCircle },
    { label: 'Instant Quote', href: '/quote', icon: Calculator },
    { label: 'Destinations Guide', href: '/destinations', icon: MapPin },
  ];

  const quickLinks = [
    { label: 'Home', href: '/', isRoute: true },
    { label: 'Destinations', href: '#destinations', isRoute: false },
    { label: 'Experiences', href: '#experiences', isRoute: false },
    { label: 'Sample Itinerary', href: '#itinerary', isRoute: false },
    { label: 'Contact Us', href: '#contact', isRoute: false },
  ];

  const legalLinks = [
    { label: 'Terms & Conditions', href: '/terms' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Cancellation Policy', href: '/cancellation' },
  ];

  return (
    <footer className="bg-earth text-white">
      {/* Newsletter Section */}
      <div className="border-b border-white/10">
        <div className="container mx-auto px-4 lg:px-8 py-10 lg:py-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="text-center lg:text-left">
              <h3 className="font-display text-xl lg:text-2xl font-bold mb-2">Get Safari Deals & Travel Tips</h3>
              <p className="text-white/70 text-sm lg:text-base">Subscribe for exclusive offers and Kenya travel inspiration</p>
            </div>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto max-w-md">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/50 outline-none focus:border-primary transition-colors"
                disabled={isSubmitting}
              />
              <button 
                type="submit" 
                className="btn-gold py-3 px-6 rounded-full whitespace-nowrap disabled:opacity-50 flex items-center justify-center gap-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Subscribing...
                  </>
                ) : (
                  'Subscribe'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-5">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-display font-bold text-xl">A</span>
              </div>
              <span className="font-display text-2xl font-bold text-white">
                Awili<span className="text-primary">Safaris</span>
              </span>
            </Link>
            <p className="text-white/70 mb-5 leading-relaxed max-w-sm">
              Your trusted partner for unforgettable Kenyan adventures. From the rolling plains of the Mara to the pristine beaches of Diani, we create memories that last a lifetime.
            </p>
            
            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2">
                <Shield className="w-4 h-4 text-primary" />
                <span className="text-xs font-medium">TRA Licensed</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2">
                <Award className="w-4 h-4 text-primary" />
                <span className="text-xs font-medium">KATO Member</span>
              </div>
            </div>
            
            {/* Social Links */}
            <div className="flex gap-3">
              <a 
                href="https://facebook.com/awilisafaris" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Follow us on Facebook"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#1877F2] flex items-center justify-center transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="https://instagram.com/awilisafaris" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Follow us on Instagram"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#E4405F] flex items-center justify-center transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://twitter.com/awilisafaris" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Follow us on Twitter"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#1DA1F2] flex items-center justify-center transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="https://youtube.com/@awilisafaris" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Subscribe on YouTube"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#FF0000] flex items-center justify-center transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Safari Packages */}
          <div>
            <h4 className="font-display text-lg font-bold mb-5">Safari Packages</h4>
            <ul className="space-y-3">
              {safariPackages.map((link) => (
                <li key={link.label}>
                  <Link 
                    to={link.href} 
                    className="text-sm text-white/70 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Plan Your Safari - NEW */}
          <div>
            <h4 className="font-display text-lg font-bold mb-5">Plan Your Safari</h4>
            <ul className="space-y-3">
              {planYourSafari.map((link) => (
                <li key={link.label}>
                  <Link 
                    to={link.href} 
                    className="flex items-center gap-2 text-sm text-white/70 hover:text-primary transition-colors"
                  >
                    <link.icon className="w-4 h-4" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-bold mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  {link.isRoute ? (
                    <Link 
                      to={link.href} 
                      className="text-sm text-white/70 hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <button 
                      onClick={() => scrollToSection(link.href)}
                      className="text-sm text-white/70 hover:text-primary transition-colors"
                    >
                      {link.label}
                    </button>
                  )}
                </li>
              ))}
              <li className="pt-2 border-t border-white/10 mt-3">
                <span className="text-xs text-white/40 uppercase tracking-wider">Legal</span>
              </li>
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <Link 
                    to={link.href} 
                    className="text-sm text-white/70 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg font-bold mb-5">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="text-white/70 text-sm">
                    Awili Safaris Office,<br />
                    Westlands Business Center,<br />
                    Waiyaki Way, Nairobi, Kenya
                  </p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <div>
                  <a href="tel:+254712345678" className="text-white/70 hover:text-primary transition-colors text-sm block">
                    +254 712 345 678
                  </a>
                  <a href="tel:+254798765432" className="text-white/70 hover:text-primary transition-colors text-sm block">
                    +254 798 765 432
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <div>
                  <a href="mailto:info@awilisafaris.co.ke" className="text-white/70 hover:text-primary transition-colors text-sm block">
                    info@awilisafaris.co.ke
                  </a>
                  <a href="mailto:bookings@awilisafaris.co.ke" className="text-white/70 hover:text-primary transition-colors text-sm block">
                    bookings@awilisafaris.co.ke
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div className="text-sm text-white/70">
                  <p>Mon - Fri: 8:00 AM - 6:00 PM</p>
                  <p>Saturday: 9:00 AM - 4:00 PM</p>
                  <p>Sunday: Closed</p>
                  <p className="text-xs text-white/50 mt-1">(24/7 Emergency support for active tours)</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            {/* Payment Methods */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-white/60" />
                <span className="text-sm text-white/60">We accept:</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-[#00A884] px-3 py-1.5 rounded text-xs font-bold text-white">M-Pesa</div>
                <div className="bg-[#1A1F71] px-3 py-1.5 rounded text-xs font-bold text-white">VISA</div>
                <div className="bg-[#EB001B] px-3 py-1.5 rounded text-xs font-bold text-white">MasterCard</div>
                <div className="bg-white/90 px-3 py-1.5 rounded text-xs font-bold text-gray-800">PayPal</div>
              </div>
            </div>

            {/* Copyright */}
            <div className="text-sm text-white/60 text-center lg:text-right">
              <p>© {currentYear} Awili Safaris. All rights reserved.</p>
              <p className="text-xs text-white/40 mt-1">TRA License No: TRA/2024/XXXX | KATO Member ID: XXXX</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
