import { ArrowLeft, AlertTriangle, Calendar, DollarSign, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';

const Cancellation = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title="Cancellation Policy - Awili Safaris"
        description="Understand our cancellation and refund policy for safari bookings with Awili Safaris Kenya."
      />
      <Header />
      
      <main className="flex-1 pt-20 lg:pt-24">
        <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-16">
          {/* Back Link */}
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <div className="max-w-4xl">
            <h1 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Cancellation & Refund Policy
            </h1>
            <p className="text-muted-foreground mb-8">
              Last updated: January 2025
            </p>

            {/* Quick Overview Cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
              <div className="bg-card border border-border rounded-xl p-5">
                <Calendar className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-semibold text-foreground mb-1">60+ Days</h3>
                <p className="text-sm text-muted-foreground">Full refund minus deposit</p>
              </div>
              <div className="bg-card border border-border rounded-xl p-5">
                <DollarSign className="w-8 h-8 text-accent mb-3" />
                <h3 className="font-semibold text-foreground mb-1">30-59 Days</h3>
                <p className="text-sm text-muted-foreground">50% of total cost refunded</p>
              </div>
              <div className="bg-card border border-border rounded-xl p-5">
                <AlertTriangle className="w-8 h-8 text-destructive mb-3" />
                <h3 className="font-semibold text-foreground mb-1">Under 30 Days</h3>
                <p className="text-sm text-muted-foreground">No refund applicable</p>
              </div>
            </div>

            <div className="prose prose-lg max-w-none">
              <section className="mb-10">
                <h2 className="font-display text-xl font-bold text-foreground mb-4">1. Cancellation by Client</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We understand that plans can change. If you need to cancel your safari booking, the following refund schedule applies based on the number of days before your scheduled departure:
                </p>
                
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse bg-card rounded-xl overflow-hidden">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="text-left p-4 font-semibold text-foreground">Cancellation Notice</th>
                        <th className="text-left p-4 font-semibold text-foreground">Refund Amount</th>
                        <th className="text-left p-4 font-semibold text-foreground">Retained by Awili Safaris</th>
                      </tr>
                    </thead>
                    <tbody className="text-muted-foreground">
                      <tr className="border-t border-border">
                        <td className="p-4">60+ days before departure</td>
                        <td className="p-4 text-green-600 dark:text-green-400">Full refund minus 30% deposit</td>
                        <td className="p-4">30% deposit (non-refundable)</td>
                      </tr>
                      <tr className="border-t border-border">
                        <td className="p-4">45-59 days before departure</td>
                        <td className="p-4 text-yellow-600 dark:text-yellow-400">50% of total cost</td>
                        <td className="p-4">50% of total cost</td>
                      </tr>
                      <tr className="border-t border-border">
                        <td className="p-4">30-44 days before departure</td>
                        <td className="p-4 text-orange-600 dark:text-orange-400">25% of total cost</td>
                        <td className="p-4">75% of total cost</td>
                      </tr>
                      <tr className="border-t border-border">
                        <td className="p-4">15-29 days before departure</td>
                        <td className="p-4 text-red-500">10% of total cost</td>
                        <td className="p-4">90% of total cost</td>
                      </tr>
                      <tr className="border-t border-border">
                        <td className="p-4">14 days or less / No-show</td>
                        <td className="p-4 text-red-600 dark:text-red-400">No refund</td>
                        <td className="p-4">100% of total cost</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="mb-10">
                <h2 className="font-display text-xl font-bold text-foreground mb-4">2. How to Cancel</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  All cancellation requests must be submitted in writing via:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Email: info@awilisafaris.com</li>
                  <li>WhatsApp: +254 722 792 069</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  The cancellation date is considered the date we receive your written notice during business hours (Monday-Friday, 8 AM - 6 PM EAT). Requests received after business hours will be processed the next business day.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="font-display text-xl font-bold text-foreground mb-4">3. Deposit Policy</h2>
                <ul className="list-disc pl-6 text-muted-foreground space-y-3">
                  <li>A 30% non-refundable deposit is required to confirm all bookings.</li>
                  <li>For peak season bookings (July-October, December-January), a 50% deposit may be required.</li>
                  <li>Deposits secure your accommodations and are used to make advance payments to our partners.</li>
                  <li>The remaining balance is due 30 days before departure.</li>
                </ul>
              </section>

              <section className="mb-10">
                <h2 className="font-display text-xl font-bold text-foreground mb-4">4. Refund Processing</h2>
                <ul className="list-disc pl-6 text-muted-foreground space-y-3">
                  <li>Approved refunds are processed within 14 business days of cancellation confirmation.</li>
                  <li>Refunds are issued via the original payment method when possible.</li>
                  <li>Bank transfer fees or currency conversion costs may be deducted from the refund amount.</li>
                  <li>M-Pesa refunds are processed within 48 hours to the original number.</li>
                </ul>
              </section>

              <section className="mb-10">
                <h2 className="font-display text-xl font-bold text-foreground mb-4">5. Changes & Amendments</h2>
                <div className="flex items-start gap-3 bg-muted/50 rounded-xl p-5 mb-4">
                  <RefreshCw className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <p className="text-muted-foreground">
                    We encourage date changes over cancellations when possible. One free date change is allowed if requested more than 45 days before departure (subject to availability).
                  </p>
                </div>
                <ul className="list-disc pl-6 text-muted-foreground space-y-3">
                  <li>Date changes within 45 days of departure incur a $50 / KES 7,500 amendment fee.</li>
                  <li>Changes to package type, duration, or destination may result in price adjustments.</li>
                  <li>Name changes are allowed up to 30 days before departure at no extra cost.</li>
                  <li>Upgrades can be made at any time, subject to availability and price difference payment.</li>
                </ul>
              </section>

              <section className="mb-10">
                <h2 className="font-display text-xl font-bold text-foreground mb-4">6. Cancellation by Awili Safaris</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  In rare circumstances, we may need to cancel or modify your booking due to:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                  <li>Insufficient group numbers for scheduled group departures</li>
                  <li>Safety concerns (civil unrest, natural disasters, health advisories)</li>
                  <li>Unforeseen circumstances beyond our control</li>
                  <li>Supplier closures or unavailability</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed">
                  If we cancel your booking, you will receive a full refund of all payments made, or the option to transfer to an alternative departure date or package of equal value.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="font-display text-xl font-bold text-foreground mb-4">7. Force Majeure</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Force majeure events include but are not limited to:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                  <li>Natural disasters, severe weather, or volcanic activity</li>
                  <li>War, terrorism, or civil unrest</li>
                  <li>Government travel restrictions or border closures</li>
                  <li>Pandemics or health emergencies</li>
                  <li>Airline or transport strikes</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed">
                  In such cases, we will work with you to reschedule your safari or provide a credit voucher valid for 24 months. Refunds may not be possible if costs have already been incurred with suppliers.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="font-display text-xl font-bold text-foreground mb-4">8. Travel Insurance</h2>
                <div className="bg-accent/10 border border-accent/20 rounded-xl p-5 mb-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-foreground mb-1">Strongly Recommended</p>
                      <p className="text-muted-foreground text-sm">
                        We strongly advise all travelers to purchase comprehensive travel insurance that covers trip cancellation, medical emergencies, evacuation, and personal belongings.
                      </p>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Travel insurance can protect you from financial loss in case of unexpected cancellation, medical emergencies, or other unforeseen circumstances. We can recommend reputable insurance providers upon request.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="font-display text-xl font-bold text-foreground mb-4">9. Group Bookings</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Special terms apply to group bookings (6+ travelers):
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Separate group cancellation terms will be provided in your booking confirmation</li>
                  <li>Partial group cancellations may affect pricing for remaining travelers</li>
                  <li>Group deposits may be higher (up to 50%) depending on the package</li>
                  <li>Contact us directly for custom group cancellation arrangements</li>
                </ul>
              </section>

              <section className="mb-10">
                <h2 className="font-display text-xl font-bold text-foreground mb-4">10. Special Packages & Promotions</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Discounted packages, flash sales, and promotional offers may have different cancellation terms as specified at the time of booking. Non-refundable rates are available at additional discounts but carry stricter cancellation policies.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="font-display text-xl font-bold text-foreground mb-4">11. Contact Us</h2>
                <p className="text-muted-foreground leading-relaxed">
                  For cancellation requests or questions about this policy:
                </p>
                <div className="bg-muted/50 rounded-xl p-6 mt-4">
                  <p className="text-foreground font-medium">Awili Safaris - Bookings Department</p>
                  <p className="text-muted-foreground mt-2">Kamakis, Nairobi, Kenya</p>
                  <p className="text-muted-foreground mt-2">Email: info@awilisafaris.com</p>
                  <p className="text-muted-foreground">Phone: +254 722 792 069</p>
                  <p className="text-muted-foreground">WhatsApp: +254 722 792 069</p>
                  <p className="text-muted-foreground mt-2 text-sm">Business Hours: Mon-Fri 8:00 AM - 6:00 PM, Sat 9:00 AM - 4:00 PM (EAT)</p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Cancellation;
