import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Send, Loader2, Check, Calendar, Users, Mail, Phone, User, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';
import { useCreateBooking } from '@/hooks/useBooking';

const bookingSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  email: z
    .string()
    .trim()
    .email('Please enter a valid email address')
    .max(255, 'Email must be less than 255 characters'),
  phone: z
    .string()
    .trim()
    .min(10, 'Please enter a valid phone number')
    .max(20, 'Phone number is too long')
    .regex(/^[+]?[\d\s()-]+$/, 'Please enter a valid phone number'),
  travelDate: z
    .string()
    .min(1, 'Please select a travel date'),
  guests: z
    .string()
    .min(1, 'Please select number of guests'),
  isResident: z.boolean().default(false),
  message: z
    .string()
    .trim()
    .max(1000, 'Message must be less than 1000 characters')
    .optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

interface BookingFormProps {
  packageId?: string;
  packageName: string;
}

const BookingForm = ({ packageId, packageName }: BookingFormProps) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const createBooking = useCreateBooking();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      isResident: false,
    },
  });

  const parseGuestCount = (guestString: string): number => {
    const match = guestString.match(/(\d+)/);
    return match ? parseInt(match[1], 10) : 2;
  };

  const onSubmit = async (data: BookingFormData) => {
    try {
      await createBooking.mutateAsync({
        packageId: packageId || null,
        packageName,
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        travelDate: data.travelDate,
        guests: parseGuestCount(data.guests),
        isResident: data.isResident,
        message: data.message,
      });

      setIsSubmitted(true);
      toast.success('Request sent! We\'ll get back to you within 24 hours.');

      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        reset();
      }, 3000);
    } catch (error) {
      console.error('Booking error:', error);
      toast.error('Failed to submit request. Please try again.');
    }
  };

  const inputClass = (hasError: boolean) =>
    `w-full bg-background border ${
      hasError ? 'border-destructive' : 'border-border'
    } rounded-xl px-4 py-3.5 pl-12 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors`;

  const guestOptions = [
    '1 Adult',
    '2 Adults',
    '2 Adults, 1 Child',
    '2 Adults, 2 Children',
    '3 Adults',
    '4 Adults',
    '4+ (Specify in message)',
  ];

  if (isSubmitted) {
    return (
      <div className="bg-card rounded-3xl p-8 shadow-card border border-border text-center">
        <div className="w-16 h-16 rounded-full bg-safari flex items-center justify-center mx-auto mb-6">
          <Check className="w-8 h-8 text-white" />
        </div>
        <h3 className="font-display text-2xl font-bold text-foreground mb-3">
          Request Received!
        </h3>
        <p className="text-muted-foreground">
          Thank you for your interest in {packageName}. Our team will contact you within 24 hours with a personalized quote.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-3xl p-6 lg:p-8 shadow-card border border-border">
      <h3 className="font-display text-2xl font-bold text-foreground mb-2">
        Request a Quote
      </h3>
      <p className="text-muted-foreground mb-8">
        No payment required. Get a personalized quote within 24 hours.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Resident Toggle */}
        <div className="flex items-center justify-between p-4 bg-primary/5 rounded-xl border border-primary/20">
          <label htmlFor="isResident" className="text-sm font-medium text-foreground">
            I am a Kenyan Resident
          </label>
          <input
            {...register('isResident')}
            id="isResident"
            type="checkbox"
            className="w-5 h-5 rounded border-border text-primary focus:ring-primary"
          />
        </div>

        {/* Full Name */}
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-foreground mb-2">
            Full Name *
          </label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              {...register('fullName')}
              id="fullName"
              type="text"
              placeholder="John Doe"
              className={inputClass(!!errors.fullName)}
            />
          </div>
          {errors.fullName && (
            <p className="mt-1.5 text-sm text-destructive">{errors.fullName.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
            Email Address *
          </label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              {...register('email')}
              id="email"
              type="email"
              placeholder="john@example.com"
              className={inputClass(!!errors.email)}
            />
          </div>
          {errors.email && (
            <p className="mt-1.5 text-sm text-destructive">{errors.email.message}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
            Phone Number *
          </label>
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              {...register('phone')}
              id="phone"
              type="tel"
              placeholder="+254 700 000 000"
              className={inputClass(!!errors.phone)}
            />
          </div>
          {errors.phone && (
            <p className="mt-1.5 text-sm text-destructive">{errors.phone.message}</p>
          )}
        </div>

        {/* Travel Date */}
        <div>
          <label htmlFor="travelDate" className="block text-sm font-medium text-foreground mb-2">
            Preferred Travel Date *
          </label>
          <div className="relative">
            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              {...register('travelDate')}
              id="travelDate"
              type="date"
              min={new Date().toISOString().split('T')[0]}
              className={inputClass(!!errors.travelDate)}
            />
          </div>
          {errors.travelDate && (
            <p className="mt-1.5 text-sm text-destructive">{errors.travelDate.message}</p>
          )}
        </div>

        {/* Number of Guests */}
        <div>
          <label htmlFor="guests" className="block text-sm font-medium text-foreground mb-2">
            Number of Guests *
          </label>
          <div className="relative">
            <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <select
              {...register('guests')}
              id="guests"
              className={inputClass(!!errors.guests)}
            >
              <option value="">Select guests</option>
              {guestOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          {errors.guests && (
            <p className="mt-1.5 text-sm text-destructive">{errors.guests.message}</p>
          )}
        </div>

        {/* Special Requests */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
            Special Requests (Optional)
          </label>
          <div className="relative">
            <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-muted-foreground" />
            <textarea
              {...register('message')}
              id="message"
              rows={4}
              placeholder="Any special requests, dietary requirements, or questions..."
              className={`${inputClass(!!errors.message)} resize-none`}
            />
          </div>
          {errors.message && (
            <p className="mt-1.5 text-sm text-destructive">{errors.message.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={createBooking.isPending}
          className="btn-gold w-full flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {createBooking.isPending ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Sending Request...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Request Quote / Check Availability
            </>
          )}
        </button>

        <p className="text-xs text-center text-muted-foreground">
          By submitting, you agree to our Terms of Service and Privacy Policy.
        </p>
      </form>
    </div>
  );
};

export default BookingForm;
