import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send, Loader2, CheckCircle, MessageCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useCreateBooking } from '@/hooks/useBooking';
import { format } from 'date-fns';

const quoteFormSchema = z.object({
  fullName: z.string().trim().min(2, 'Name must be at least 2 characters').max(100, 'Name too long'),
  email: z.string().trim().email('Invalid email address').max(255, 'Email too long'),
  phone: z.string().trim().max(20, 'Phone number too long').optional().or(z.literal('')),
  specialRequests: z.string().trim().max(1000, 'Message too long').optional().or(z.literal('')),
});

type QuoteFormValues = z.infer<typeof quoteFormSchema>;

interface QuoteRequestFormProps {
  packageId: string;
  packageName: string;
  packageSlug: string;
  location: string;
  duration: string;
  travelDate?: Date;
  adults: number;
  children: number;
  isResident: boolean;
  selectedAddOns: string[];
  addOnNames: string[];
  totalPrice: number;
}

const QuoteRequestForm = ({
  packageId,
  packageName,
  packageSlug,
  location,
  duration,
  travelDate,
  adults,
  children,
  isResident,
  selectedAddOns,
  addOnNames,
  totalPrice,
}: QuoteRequestFormProps) => {
  const { toast } = useToast();
  const createBooking = useCreateBooking();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      specialRequests: '',
    },
  });

  const onSubmit = async (data: QuoteFormValues) => {
    try {
      // Build detailed message with quote configuration
      const addOnsList = addOnNames.length > 0 
        ? `Selected Add-ons: ${addOnNames.join(', ')}` 
        : 'No add-ons selected';
      
      const message = [
        `QUOTE REQUEST - ${packageName}`,
        `Location: ${location}`,
        `Duration: ${duration}`,
        `Travel Date: ${travelDate ? format(travelDate, 'MMMM d, yyyy') : 'Flexible'}`,
        `Guests: ${adults} Adult(s)${children > 0 ? `, ${children} Child(ren)` : ''}`,
        `Rate Type: ${isResident ? 'Kenya Resident' : 'Non-Resident'}`,
        addOnsList,
        `Estimated Total: ${isResident ? 'KES' : 'USD'} ${totalPrice.toLocaleString()}`,
        data.specialRequests ? `\nSpecial Requests: ${data.specialRequests}` : '',
      ].filter(Boolean).join('\n');

      await createBooking.mutateAsync({
        packageId: packageId,
        packageName: packageName,
        fullName: data.fullName,
        email: data.email,
        phone: data.phone || '',
        travelDate: travelDate ? format(travelDate, 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd'),
        guests: adults + children,
        isResident: isResident,
        message: message,
        totalPrice: Math.round(totalPrice),
      });

      setIsSubmitted(true);
      reset();
      
      toast({
        title: 'Quote Request Sent!',
        description: 'We\'ll get back to you within 24 hours with a personalized quote.',
      });
    } catch (error) {
      console.error('Error submitting quote request:', error);
      toast({
        title: 'Error',
        description: 'Failed to submit your request. Please try again.',
        variant: 'destructive',
      });
    }
  };

  // Generate WhatsApp message
  const getWhatsAppMessage = () => {
    const addOnsList = addOnNames.length > 0 
      ? `Add-ons: ${addOnNames.join(', ')}` 
      : '';
    
    const message = [
      `Hi! I'm interested in the ${packageName}.`,
      `📅 Travel Date: ${travelDate ? format(travelDate, 'MMMM d, yyyy') : 'Flexible'}`,
      `👥 Guests: ${adults} Adult(s)${children > 0 ? `, ${children} Child(ren)` : ''}`,
      `💰 Rate: ${isResident ? 'Kenya Resident' : 'Non-Resident'}`,
      addOnsList,
      `Estimated: ${isResident ? 'KES' : 'USD'} ${totalPrice.toLocaleString()}`,
      'Please send me a detailed quote!',
    ].filter(Boolean).join('\n');
    
    return encodeURIComponent(message);
  };

  if (isSubmitted) {
    return (
      <div ref={formRef} className="bg-card rounded-3xl p-6 lg:p-8 shadow-card border border-border">
        <div className="text-center py-8">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-primary" />
          </div>
          <h3 className="font-display text-2xl font-bold text-foreground mb-2">
            Quote Request Sent!
          </h3>
          <p className="text-muted-foreground mb-6">
            Our safari experts will review your request and send you a personalized quote within 24 hours.
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="text-primary hover:underline font-medium"
          >
            Submit another request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div ref={formRef} id="quote-form" className="bg-card rounded-3xl p-6 lg:p-8 shadow-card border border-border scroll-mt-24">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
          4
        </div>
        <div>
          <h2 className="font-display text-xl font-bold text-foreground">
            Request Your Quote
          </h2>
          <p className="text-sm text-muted-foreground">
            Get a personalized quote within 24 hours
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Full Name */}
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-foreground mb-2">
            Full Name *
          </label>
          <input
            id="fullName"
            type="text"
            {...register('fullName')}
            placeholder="Enter your full name"
            className="w-full px-4 py-3 bg-muted rounded-xl border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
          />
          {errors.fullName && (
            <p className="mt-1 text-sm text-destructive">{errors.fullName.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
            Email Address *
          </label>
          <input
            id="email"
            type="email"
            {...register('email')}
            placeholder="your@email.com"
            className="w-full px-4 py-3 bg-muted rounded-xl border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-destructive">{errors.email.message}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
            Phone Number (Optional)
          </label>
          <input
            id="phone"
            type="tel"
            {...register('phone')}
            placeholder="+254 7XX XXX XXX"
            className="w-full px-4 py-3 bg-muted rounded-xl border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-destructive">{errors.phone.message}</p>
          )}
        </div>

        {/* Special Requests */}
        <div>
          <label htmlFor="specialRequests" className="block text-sm font-medium text-foreground mb-2">
            Special Requests (Optional)
          </label>
          <textarea
            id="specialRequests"
            {...register('specialRequests')}
            placeholder="Any specific requirements, dietary needs, or questions..."
            rows={3}
            className="w-full px-4 py-3 bg-muted rounded-xl border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors resize-none"
          />
          {errors.specialRequests && (
            <p className="mt-1 text-sm text-destructive">{errors.specialRequests.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-gold w-full flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Request Quote
            </>
          )}
        </button>
      </form>

      {/* WhatsApp Alternative */}
      <div className="mt-6 pt-6 border-t border-border">
        <p className="text-sm text-muted-foreground text-center mb-3">
          Prefer to chat directly?
        </p>
        <a
          href={`https://wa.me/254722792069?text=${getWhatsAppMessage()}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-full transition-colors"
        >
          <MessageCircle className="w-5 h-5" />
          Chat on WhatsApp
        </a>
      </div>
    </div>
  );
};

export default QuoteRequestForm;
