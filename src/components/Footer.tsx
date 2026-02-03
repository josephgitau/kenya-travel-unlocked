import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter, Youtube, Shield, Award, CreditCard, Calendar, HelpCircle, Calculator, Loader2, ArrowRight, Globe, Headphones, Send } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';
import awiliLogo from '@/assets/awili-safaris-logo.png';

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
        if (error.code === '23505') {
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
    { label: 'Maasai Mara Safari', href: '/package/maasai-mara' },
    { label: 'Amboseli Elephant Paradise', href: '/package/amboseli' },
    { label: 'Samburu Wilderness', href: '/package/samburu' },
    { label: 'Diani Beach Escape', href: '/package/diani-beach' },
    { label: 'Lake Naivasha Getaway', href: '/package/lake-naivasha' },
  ];

  const planYourSafari = [
    { label: 'Wildlife Calendar', href: '/calendar', icon: Calendar },
    { label: 'Safari Quiz', href: '/quiz', icon: HelpCircle },
    { label: 'Instant Quote', href: '/quote', icon: Calculator },
    { label: 'All Destinations', href: '/destinations', icon: MapPin },
  ];

  const quickLinks = [
    { label: 'Home', href: '/', isRoute: true },
    { label: 'Destinations', href: '#destinations', isRoute: false },
    { label: 'Experiences', href: '#experiences', isRoute: false },
    { label: 'Contact Us', href: '#contact', isRoute: false },
  ];

  const legalLinks = [
    { label: 'Terms & Conditions', href: '/terms' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Cancellation Policy', href: '/cancellation' },
  ];

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com/awilisafaris', label: 'Facebook', hoverColor: 'hover:bg-[#1877F2]' },
    { icon: Instagram, href: 'https://instagram.com/awilisafaris', label: 'Instagram', hoverColor: 'hover:bg-gradient-to-tr hover:from-[#FCAF45] hover:via-[#E1306C] hover:to-[#833AB4]' },
    { icon: Twitter, href: 'https://twitter.com/awilisafaris', label: 'Twitter', hoverColor: 'hover:bg-[#1DA1F2]' },
    { icon: Youtube, href: 'https://youtube.com/@awilisafaris', label: 'YouTube', hoverColor: 'hover:bg-[#FF0000]' },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-earth to-[hsl(25_30%_22%)] text-white overflow-hidden">
      {/* Decorative Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      {/* Newsletter Section - Premium CTA */}
      <div className="relative border-b border-white/10">
        <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-16">
          <div className="relative bg-gradient-to-r from-primary/20 via-primary/10 to-transparent rounded-3xl p-8 lg:p-12 overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-primary/5 rounded-full" />
            
            <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="text-center lg:text-left max-w-lg">
                <div className="inline-flex items-center gap-2 bg-primary/20 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-4">
                  <Send className="w-4 h-4" />
                  Join Our Safari Community
                </div>
                <h3 className="font-display text-2xl lg:text-3xl font-bold mb-3">
                  Get Exclusive Safari Deals
                </h3>
                <p className="text-white/70 text-base lg:text-lg">
                  Subscribe for travel tips, wildlife updates, and member-only discounts on Kenya adventures.
                </p>
              </div>
              
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                <div className="relative flex-1 min-w-0 lg:min-w-[300px]">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 outline-none focus:border-primary focus:bg-white/15 transition-all duration-300"
                    disabled={isSubmitting}
                  />
                </div>
                <button 
                  type="submit" 
                  className="group btn-gold py-4 px-8 rounded-xl whitespace-nowrap disabled:opacity-50 flex items-center justify-center gap-2 font-semibold"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Subscribing...
                    </>
                  ) : (
                    <>
                      Subscribe
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative container mx-auto px-4 lg:px-8 py-14 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          
          {/* Brand Section */}
          <div className="lg:col-span-4 space-y-6">
            <Link to="/" className="inline-flex items-center gap-3 group">
              <img 
                src={awiliLogo} 
                alt="Awili Safaris" 
                className="w-14 h-14 rounded-full object-cover shadow-gold group-hover:scale-105 transition-transform"
              />
              <div>
                <span className="font-display text-2xl font-bold text-white block">
                  Awili<span className="text-primary">Safaris</span>
                </span>
                <span className="text-white/50 text-xs uppercase tracking-wider">Kenya Adventures</span>
              </div>
            </Link>
            
            <p className="text-white/70 leading-relaxed text-base max-w-sm">
              Your trusted partner for unforgettable Kenyan adventures. From the Mara's rolling plains to Diani's pristine beaches, we create lifelong memories.
            </p>
            
            {/* Trust Badges - Premium Style */}
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2.5 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 hover:bg-white/10 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Award className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">EATGDA Member</p>
                  <p className="text-[10px] text-white/50">Certified Tour Guides</p>
                </div>
              </div>
            </div>
            
            {/* Social Links - Modern Style */}
            <div className="pt-2">
              <p className="text-white/50 text-sm mb-3 font-medium">Follow Our Adventures</p>
              <div className="flex gap-2">
                {socialLinks.map((social) => (
                  <a 
                    key={social.label}
                    href={social.href} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label={`Follow us on ${social.label}`}
                    className={`w-11 h-11 rounded-xl bg-white/5 border border-white/10 ${social.hoverColor} flex items-center justify-center transition-all duration-300 hover:scale-105 hover:border-transparent`}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              
              {/* Safari Packages */}
              <div>
                <h4 className="font-display text-base font-bold mb-5 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Safari Packages
                </h4>
                <ul className="space-y-3">
                  {safariPackages.map((link) => (
                    <li key={link.label}>
                      <Link 
                        to={link.href} 
                        className="group text-sm text-white/60 hover:text-primary transition-colors flex items-center gap-1"
                      >
                        <span>{link.label}</span>
                        <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Plan Your Safari */}
              <div>
                <h4 className="font-display text-base font-bold mb-5 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Plan Your Trip
                </h4>
                <ul className="space-y-3">
                  {planYourSafari.map((link) => (
                    <li key={link.label}>
                      <Link 
                        to={link.href} 
                        className="group flex items-center gap-2.5 text-sm text-white/60 hover:text-primary transition-colors"
                      >
                        <link.icon className="w-4 h-4 text-white/40 group-hover:text-primary transition-colors" />
                        <span>{link.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="font-display text-base font-bold mb-5 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Quick Links
                </h4>
                <ul className="space-y-3">
                  {quickLinks.map((link) => (
                    <li key={link.label}>
                      {link.isRoute ? (
                        <Link 
                          to={link.href} 
                          className="text-sm text-white/60 hover:text-primary transition-colors"
                        >
                          {link.label}
                        </Link>
                      ) : (
                        <button 
                          onClick={() => scrollToSection(link.href)}
                          className="text-sm text-white/60 hover:text-primary transition-colors"
                        >
                          {link.label}
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
                
                {/* Legal Links */}
                <div className="mt-6 pt-4 border-t border-white/10">
                  <p className="text-[10px] text-white/40 uppercase tracking-wider mb-3 font-medium">Legal</p>
                  <ul className="space-y-2">
                    {legalLinks.map((link) => (
                      <li key={link.label}>
                        <Link 
                          to={link.href} 
                          className="text-xs text-white/50 hover:text-primary transition-colors"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Contact Info */}
              <div>
                <h4 className="font-display text-base font-bold mb-5 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Get In Touch
                </h4>
                <ul className="space-y-4">
                  <li className="group">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-white/5 group-hover:bg-primary/20 flex items-center justify-center shrink-0 transition-colors">
                        <MapPin className="w-4 h-4 text-primary" />
                      </div>
                      <p className="text-sm text-white/60 leading-relaxed">
                        Kamakis, Nairobi, Kenya
                      </p>
                    </div>
                  </li>
                  <li className="group">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-white/5 group-hover:bg-primary/20 flex items-center justify-center shrink-0 transition-colors">
                        <Phone className="w-4 h-4 text-primary" />
                      </div>
                      <div className="space-y-1">
                        <a href="tel:+254722792069" className="text-sm text-white/60 hover:text-primary transition-colors block">
                          +254 722 792 069
                        </a>
                        <a href="tel:+254732017425" className="text-sm text-white/60 hover:text-primary transition-colors block">
                          +254 732 017 425
                        </a>
                      </div>
                    </div>
                  </li>
                  <li className="group">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-white/5 group-hover:bg-primary/20 flex items-center justify-center shrink-0 transition-colors">
                        <Mail className="w-4 h-4 text-primary" />
                      </div>
                      <div className="space-y-1">
                        <a href="mailto:info@awilisafaris.com" className="text-sm text-white/60 hover:text-primary transition-colors block">
                          info@awilisafaris.com
                        </a>
                        <a href="mailto:erickawili@awilisafaris.com" className="text-sm text-white/60 hover:text-primary transition-colors block">
                          erickawili@awilisafaris.com
                        </a>
                      </div>
                    </div>
                  </li>
                  <li className="group">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-white/5 group-hover:bg-primary/20 flex items-center justify-center shrink-0 transition-colors">
                        <Clock className="w-4 h-4 text-primary" />
                      </div>
                      <div className="text-sm text-white/60">
                        <p>Mon - Sat: 8AM - 6PM</p>
                        <p className="text-xs text-white/40 mt-1 flex items-center gap-1">
                          <Headphones className="w-3 h-3" />
                          24/7 Tour Support
                        </p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar - Premium Style */}
      <div className="relative border-t border-white/10 bg-black/20">
        <div className="container mx-auto px-4 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            
            {/* Payment Methods */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <div className="flex items-center gap-2 text-white/50">
                <CreditCard className="w-4 h-4" />
                <span className="text-sm">Secure Payments:</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-[#00A884] px-3 py-1.5 rounded-lg text-xs font-bold text-white shadow-sm">M-Pesa</div>
                <div className="bg-gradient-to-r from-[#1A1F71] to-[#2557D6] px-3 py-1.5 rounded-lg text-xs font-bold text-white shadow-sm">VISA</div>
                <div className="bg-gradient-to-r from-[#EB001B] to-[#F79E1B] px-3 py-1.5 rounded-lg text-xs font-bold text-white shadow-sm">Mastercard</div>
                <div className="bg-white px-3 py-1.5 rounded-lg text-xs font-bold text-[#003087] shadow-sm">PayPal</div>
              </div>
            </div>

            {/* Copyright & Language */}
            <div className="flex flex-col sm:flex-row items-center gap-4 text-center lg:text-right">
              <div className="flex items-center gap-2 text-white/40 text-sm">
                <Globe className="w-4 h-4" />
                <span>English</span>
              </div>
              <div className="text-sm text-white/50">
                <p>© {currentYear} Awili Safaris. All rights reserved.</p>
              </div>
            </div>
          </div>
          
          {/* License Info */}
          <div className="mt-4 pt-4 border-t border-white/5 text-center">
            <p className="text-xs text-white/30">
              East Africa Tour Guides & Drivers Association (EATGDA) Member
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
