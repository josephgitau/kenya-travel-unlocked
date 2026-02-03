import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';

const Terms = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title="Terms & Conditions - Awili Safaris"
        description="Read our terms and conditions for booking safaris and travel packages with Awili Safaris Kenya."
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
              Terms & Conditions
            </h1>
            <p className="text-muted-foreground mb-8">
              Last updated: January 2025
            </p>

            <div className="prose prose-lg max-w-none">
              <section className="mb-10">
                <h2 className="font-display text-xl font-bold text-foreground mb-4">1. Introduction</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Welcome to Awili Safaris. These Terms and Conditions govern your use of our services, including safari bookings, travel packages, and related activities. By booking with us, you agree to be bound by these terms.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Awili Safaris is a licensed tour operator registered in Kenya under the Tourism Regulatory Authority (TRA) and is a member of the Kenya Association of Tour Operators (KATO).
                </p>
              </section>

              <section className="mb-10">
                <h2 className="font-display text-xl font-bold text-foreground mb-4">2. Booking & Reservations</h2>
                <ul className="list-disc pl-6 text-muted-foreground space-y-3">
                  <li>A booking is confirmed only upon receipt of the required deposit and written confirmation from Awili Safaris.</li>
                  <li>A 30% non-refundable deposit is required to secure all bookings unless otherwise agreed in writing.</li>
                  <li>Full payment is due 30 days before the departure date. Bookings made within 30 days require full payment at the time of booking.</li>
                  <li>All prices are quoted in USD or KES as specified. Prices may be subject to change due to currency fluctuations, park fee changes, or other factors beyond our control.</li>
                  <li>Group bookings (6+ persons) may have different payment terms as specified at the time of booking.</li>
                </ul>
              </section>

              <section className="mb-10">
                <h2 className="font-display text-xl font-bold text-foreground mb-4">3. Inclusions & Exclusions</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Each package clearly outlines what is included and excluded. Standard inclusions typically cover:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                  <li>Accommodation as specified in the itinerary</li>
                  <li>Meals as indicated (Full Board, Half Board, or Bed & Breakfast)</li>
                  <li>Safari game drives with professional English-speaking guides</li>
                  <li>Park and conservancy fees for scheduled activities</li>
                  <li>Ground transportation in safari vehicles</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Standard exclusions typically include:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>International and domestic flights unless specified</li>
                  <li>Visa fees and travel insurance</li>
                  <li>Tips and gratuities for guides and staff</li>
                  <li>Personal expenses, laundry, and alcoholic beverages</li>
                  <li>Optional activities not listed in the itinerary</li>
                </ul>
              </section>

              <section className="mb-10">
                <h2 className="font-display text-xl font-bold text-foreground mb-4">4. Travel Documents & Insurance</h2>
                <ul className="list-disc pl-6 text-muted-foreground space-y-3">
                  <li>Clients are responsible for obtaining valid passports, visas, and any required vaccinations for travel to Kenya.</li>
                  <li>We strongly recommend comprehensive travel insurance covering trip cancellation, medical emergencies, evacuation, and personal belongings.</li>
                  <li>Awili Safaris is not responsible for any costs incurred due to missing or invalid travel documents.</li>
                </ul>
              </section>

              <section className="mb-10">
                <h2 className="font-display text-xl font-bold text-foreground mb-4">5. Health & Safety</h2>
                <ul className="list-disc pl-6 text-muted-foreground space-y-3">
                  <li>Safari activities involve inherent risks. Clients participate at their own risk and must follow all safety instructions from guides.</li>
                  <li>Clients should disclose any medical conditions, dietary requirements, or physical limitations that may affect their travel.</li>
                  <li>We reserve the right to refuse service to anyone whose condition may pose a risk to themselves or others.</li>
                  <li>Anti-malaria prophylaxis and yellow fever vaccination may be required or recommended. Consult your doctor before travel.</li>
                </ul>
              </section>

              <section className="mb-10">
                <h2 className="font-display text-xl font-bold text-foreground mb-4">6. Changes & Modifications</h2>
                <ul className="list-disc pl-6 text-muted-foreground space-y-3">
                  <li>We reserve the right to modify itineraries due to weather, wildlife patterns, road conditions, or safety concerns.</li>
                  <li>In case of accommodation unavailability, we will provide alternatives of similar or higher standard at no extra cost.</li>
                  <li>Client-requested changes may incur additional charges and are subject to availability.</li>
                </ul>
              </section>

              <section className="mb-10">
                <h2 className="font-display text-xl font-bold text-foreground mb-4">7. Liability</h2>
                <ul className="list-disc pl-6 text-muted-foreground space-y-3">
                  <li>Awili Safaris acts as an agent for hotels, lodges, transport providers, and other third-party suppliers. We are not liable for their acts, omissions, or defaults.</li>
                  <li>We are not responsible for loss, damage, or theft of personal belongings during the safari.</li>
                  <li>Our liability is limited to the cost of the safari package booked. We are not liable for indirect, consequential, or special damages.</li>
                  <li>Force majeure events (natural disasters, civil unrest, pandemics, etc.) are beyond our control, and no liability is accepted for cancellations or changes due to such events.</li>
                </ul>
              </section>

              <section className="mb-10">
                <h2 className="font-display text-xl font-bold text-foreground mb-4">8. Wildlife & Photography</h2>
                <ul className="list-disc pl-6 text-muted-foreground space-y-3">
                  <li>Wildlife sightings cannot be guaranteed. We make every effort to maximize viewing opportunities based on our experience and local knowledge.</li>
                  <li>We may use photographs and videos taken during safaris for marketing purposes unless clients request otherwise in writing before the trip.</li>
                  <li>Drone usage is prohibited in national parks and reserves without special permits.</li>
                </ul>
              </section>

              <section className="mb-10">
                <h2 className="font-display text-xl font-bold text-foreground mb-4">9. Code of Conduct</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Clients are expected to:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Respect wildlife, local communities, and the environment</li>
                  <li>Follow park rules and guide instructions at all times</li>
                  <li>Maintain appropriate behavior that does not endanger others</li>
                  <li>Not engage in any illegal activities during the safari</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  We reserve the right to terminate services without refund if conduct is deemed inappropriate or dangerous.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="font-display text-xl font-bold text-foreground mb-4">10. Complaints & Disputes</h2>
                <ul className="list-disc pl-6 text-muted-foreground space-y-3">
                  <li>Any complaints during the safari should be reported immediately to the guide or our office for prompt resolution.</li>
                  <li>Written complaints must be submitted within 14 days of trip completion for consideration.</li>
                  <li>These terms are governed by the laws of Kenya. Any disputes shall be resolved through arbitration in Nairobi, Kenya.</li>
                </ul>
              </section>

              <section className="mb-10">
                <h2 className="font-display text-xl font-bold text-foreground mb-4">11. Contact Information</h2>
                <p className="text-muted-foreground leading-relaxed">
                  For questions about these terms, please contact us at:
                </p>
                <div className="bg-muted/50 rounded-xl p-6 mt-4">
                  <p className="text-foreground font-medium">Awili Safaris</p>
                  <p className="text-muted-foreground mt-2">Kamakis, Nairobi, Kenya</p>
                  <p className="text-muted-foreground mt-2">Email: info@awilisafaris.com</p>
                  <p className="text-muted-foreground">Phone: +254 722 792 069</p>
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

export default Terms;
