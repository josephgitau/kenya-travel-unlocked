import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, Loader2, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(100, 'Name must be less than 100 characters'),
  email: z.string().trim().email('Invalid email address').max(255, 'Email must be less than 255 characters'),
  phone: z.string().trim().optional(),
  subject: z.string().trim().min(2, 'Subject is required').max(200, 'Subject must be less than 200 characters'),
  message: z.string().trim().min(10, 'Message must be at least 10 characters').max(2000, 'Message must be less than 2000 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof ContactFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
      result.error.errors.forEach(err => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as keyof ContactFormData] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('contact_inquiries')
        .insert({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone?.trim() || null,
          subject: formData.subject.trim(),
          message: formData.message.trim(),
        });

      if (error) throw error;

      setIsSubmitted(true);
      toast({
        title: 'Message Sent!',
        description: 'Thank you for contacting us. We\'ll get back to you within 24 hours.',
      });

      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      }, 3000);
    } catch (error) {
      console.error('Contact form submission error:', error);
      toast({
        title: 'Submission failed',
        description: 'Please try again later or contact us directly via phone.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Visit Us',
      content: 'Kamakis, Nairobi, Kenya',
    },
    {
      icon: Phone,
      title: 'Call Us',
      content: '+254 722 792 069 / +254 732 017 425',
      href: 'tel:+254722792069',
    },
    {
      icon: Mail,
      title: 'Email Us',
      content: 'info@awilisafaris.com',
      href: 'mailto:info@awilisafaris.com',
    },
    {
      icon: Clock,
      title: 'Working Hours',
      content: 'Mon - Sat: 8AM - 6PM EAT',
    },
  ];

  return (
    <section id="contact" className="py-20 lg:py-28 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <span className="text-primary font-semibold uppercase tracking-wider text-sm">Contact Us</span>
          <h2 className="section-title mt-2">Get In Touch</h2>
          <p className="section-subtitle mt-4 mx-auto">
            Have questions about our safari packages? We're here to help plan your perfect Kenyan adventure.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-8">
            {contactInfo.map((item) => (
              <div key={item.title} className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-display font-semibold text-foreground">{item.title}</h4>
                  {item.href ? (
                    <a href={item.href} className="text-muted-foreground hover:text-primary transition-colors">
                      {item.content}
                    </a>
                  ) : (
                    <p className="text-muted-foreground">{item.content}</p>
                  )}
                </div>
              </div>
            ))}

            {/* Quick WhatsApp */}
            <div className="p-6 rounded-2xl bg-secondary text-secondary-foreground">
              <h4 className="font-display font-semibold mb-2">Prefer WhatsApp?</h4>
              <p className="text-secondary-foreground/80 text-sm mb-4">
                Chat with us directly for quick responses about packages, availability, and custom itineraries.
              </p>
              <a
                href="https://wa.me/254722792069?text=Hello!%20I%27m%20interested%20in%20booking%20a%20safari."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] text-white font-semibold px-5 py-2.5 rounded-full text-sm hover:brightness-110 transition-all"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <div className="bg-card rounded-2xl p-6 lg:p-8 shadow-card">
              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <CheckCircle2 className="w-16 h-16 text-secondary mb-4" />
                  <h3 className="font-display text-2xl font-bold text-foreground mb-2">Message Sent!</h3>
                  <p className="text-muted-foreground">We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        className={errors.name ? 'border-destructive' : ''}
                      />
                      {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        className={errors.email ? 'border-destructive' : ''}
                      />
                      {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        placeholder="+254 700 000 000"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        name="subject"
                        placeholder="Safari Inquiry"
                        value={formData.subject}
                        onChange={handleChange}
                        className={errors.subject ? 'border-destructive' : ''}
                      />
                      {errors.subject && <p className="text-sm text-destructive">{errors.subject}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell us about your ideal safari experience, preferred dates, group size, and any special requirements..."
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className={errors.message ? 'border-destructive' : ''}
                    />
                    {errors.message && <p className="text-sm text-destructive">{errors.message}</p>}
                  </div>

                  <Button type="submit" className="btn-gold w-full sm:w-auto" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
