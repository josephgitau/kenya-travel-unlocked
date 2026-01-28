import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, Cookie } from 'lucide-react';
import { Button } from '@/components/ui/button';

const COOKIE_CONSENT_KEY = 'awili-cookie-consent';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already given consent
    const hasConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!hasConsent) {
      // Small delay for better UX
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-fade-in-up">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-card border border-border rounded-2xl shadow-elevated p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex items-start gap-3 flex-1">
            <Cookie className="h-6 w-6 text-primary shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-foreground">
                We use cookies to enhance your experience on our site. By continuing to browse, you agree to our use of cookies.{' '}
                <Link to="/privacy" className="text-primary hover:underline font-medium">
                  Learn more
                </Link>
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDecline}
              className="flex-1 sm:flex-none"
            >
              Decline
            </Button>
            <Button
              size="sm"
              onClick={handleAccept}
              className="btn-gold flex-1 sm:flex-none"
            >
              Accept
            </Button>
          </div>
          
          <button
            onClick={handleDecline}
            className="absolute top-2 right-2 sm:hidden p-1 text-muted-foreground hover:text-foreground"
            aria-label="Close cookie banner"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
