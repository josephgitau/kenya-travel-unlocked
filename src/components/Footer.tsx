import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'Maasai Mara Safaris', href: '#' },
    { label: 'Beach Holidays', href: '#' },
    { label: 'Day Trips', href: '#' },
    { label: 'Group Tours', href: '#' },
    { label: 'Custom Packages', href: '#' },
  ];

  const destinations = [
    { label: 'Maasai Mara', href: '#' },
    { label: 'Amboseli', href: '#' },
    { label: 'Samburu', href: '#' },
    { label: 'Diani Beach', href: '#' },
    { label: 'Lake Nakuru', href: '#' },
  ];

  const company = [
    { label: 'About Us', href: '#' },
    { label: 'Our Team', href: '#' },
    { label: 'Reviews', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Contact', href: '#' },
  ];

  return (
    <footer id="contact" className="bg-earth text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <a href="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-display font-bold text-xl">A</span>
              </div>
              <span className="font-display text-2xl font-bold text-white">
                Awili<span className="text-primary">Safaris</span>
              </span>
            </a>
            <p className="text-white/70 mb-6">
              Your trusted partner for unforgettable Kenyan adventures. From bush to beach, we create memories that last a lifetime.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-bold mb-6">Safari Packages</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-white/70 hover:text-primary transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="font-display text-lg font-bold mb-6">Destinations</h4>
            <ul className="space-y-3">
              {destinations.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-white/70 hover:text-primary transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg font-bold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-white/70">
                  Westlands Business Center, Nairobi, Kenya
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <a href="tel:+254700000000" className="text-white/70 hover:text-primary transition-colors">
                  +254 700 000 000
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <a href="mailto:info@awilisafaris.co.ke" className="text-white/70 hover:text-primary transition-colors">
                  info@awilisafaris.co.ke
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-primary shrink-0" />
                <span className="text-white/70">Mon - Sat: 8AM - 6PM</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            {/* Certifications */}
            <div className="flex flex-wrap items-center justify-center gap-6">
              <div className="flex items-center gap-2 text-sm text-white/60">
                <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center text-xs font-bold">
                  TRA
                </div>
                <span>Licensed by TRA</span>
              </div>
              <div className="h-4 w-px bg-white/20" />
              <div className="flex items-center gap-3">
                <span className="text-sm text-white/60">We accept:</span>
                <div className="flex items-center gap-2">
                  <div className="bg-white/10 px-2 py-1 rounded text-xs font-bold">M-Pesa</div>
                  <div className="bg-white/10 px-2 py-1 rounded text-xs font-bold">VISA</div>
                  <div className="bg-white/10 px-2 py-1 rounded text-xs font-bold">MasterCard</div>
                </div>
              </div>
            </div>

            {/* Copyright */}
            <div className="text-sm text-white/60 text-center lg:text-right">
              © {currentYear} Awili Safaris. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
