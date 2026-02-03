import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';

const Privacy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title="Privacy Policy - Awili Safaris"
        description="Learn how Awili Safaris collects, uses, and protects your personal information when booking safaris in Kenya."
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
              Privacy Policy
            </h1>
            <p className="text-muted-foreground mb-8">
              Last updated: January 2025
            </p>

            <div className="prose prose-lg max-w-none">
              <section className="mb-10">
                <h2 className="font-display text-xl font-bold text-foreground mb-4">1. Introduction</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Awili Safaris ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your personal information when you use our website and services.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  By using our services, you consent to the practices described in this policy. We encourage you to read this policy carefully and contact us if you have any questions.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="font-display text-xl font-bold text-foreground mb-4">2. Information We Collect</h2>
                
                <h3 className="font-semibold text-foreground mt-6 mb-3">Personal Information</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We collect information you provide directly, including:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-6">
                  <li>Full name, email address, phone number, and postal address</li>
                  <li>Passport details and nationality (for booking purposes)</li>
                  <li>Payment information (processed securely through third-party providers)</li>
                  <li>Dietary requirements, medical conditions, or special needs disclosed for your trip</li>
                  <li>Emergency contact information</li>
                  <li>Travel preferences and previous safari history</li>
                </ul>

                <h3 className="font-semibold text-foreground mt-6 mb-3">Automatically Collected Information</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  When you visit our website, we automatically collect:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>IP address and browser type</li>
                  <li>Device information and operating system</li>
                  <li>Pages visited, time spent, and referring website</li>
                  <li>Cookies and similar tracking technologies (see Section 7)</li>
                </ul>
              </section>

              <section className="mb-10">
                <h2 className="font-display text-xl font-bold text-foreground mb-4">3. How We Use Your Information</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We use your personal information to:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Process and confirm your safari bookings</li>
                  <li>Communicate with you about your trip, including updates and changes</li>
                  <li>Arrange accommodations, transport, and activities with our partners</li>
                  <li>Process payments and issue invoices</li>
                  <li>Send promotional offers and newsletters (with your consent)</li>
                  <li>Improve our website and services based on usage patterns</li>
                  <li>Comply with legal obligations and resolve disputes</li>
                  <li>Provide customer support and respond to inquiries</li>
                </ul>
              </section>

              <section className="mb-10">
                <h2 className="font-display text-xl font-bold text-foreground mb-4">4. Information Sharing & Disclosure</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We may share your information with:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-3 mb-6">
                  <li><strong>Service Providers:</strong> Hotels, lodges, transport companies, and activity operators necessary to fulfill your booking</li>
                  <li><strong>Payment Processors:</strong> Secure third-party payment services (M-Pesa, Visa, MasterCard, PayPal)</li>
                  <li><strong>Government Authorities:</strong> Immigration, park authorities, or law enforcement when legally required</li>
                  <li><strong>Professional Advisors:</strong> Lawyers, accountants, or insurers when necessary</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed">
                  We do not sell, rent, or trade your personal information to third parties for marketing purposes.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="font-display text-xl font-bold text-foreground mb-4">5. Data Security</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We implement appropriate security measures to protect your information:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>SSL encryption for data transmission</li>
                  <li>Secure servers with restricted access</li>
                  <li>Regular security assessments and updates</li>
                  <li>Staff training on data protection practices</li>
                  <li>Limited retention of sensitive payment information</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  While we strive to protect your information, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="font-display text-xl font-bold text-foreground mb-4">6. Data Retention</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy, typically:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-4">
                  <li>Booking records: 7 years (for tax and legal compliance)</li>
                  <li>Marketing preferences: Until you unsubscribe</li>
                  <li>Website analytics: 26 months</li>
                  <li>Customer inquiries: 2 years after last contact</li>
                </ul>
              </section>

              <section className="mb-10">
                <h2 className="font-display text-xl font-bold text-foreground mb-4">7. Cookies & Tracking</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Our website uses cookies and similar technologies to:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                  <li>Remember your preferences and settings</li>
                  <li>Understand how you use our website</li>
                  <li>Provide personalized content and recommendations</li>
                  <li>Analyze website traffic and performance</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed">
                  You can control cookies through your browser settings. Disabling certain cookies may affect website functionality.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="font-display text-xl font-bold text-foreground mb-4">8. Your Rights</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Depending on your location, you may have the right to:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                  <li><strong>Access:</strong> Request a copy of the personal data we hold about you</li>
                  <li><strong>Correction:</strong> Request correction of inaccurate or incomplete data</li>
                  <li><strong>Deletion:</strong> Request deletion of your personal data (subject to legal requirements)</li>
                  <li><strong>Portability:</strong> Receive your data in a structured, machine-readable format</li>
                  <li><strong>Objection:</strong> Object to processing of your data for marketing purposes</li>
                  <li><strong>Withdrawal:</strong> Withdraw consent for marketing communications at any time</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed">
                  To exercise these rights, contact us at info@awilisafaris.com. We will respond within 30 days.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="font-display text-xl font-bold text-foreground mb-4">9. International Transfers</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Your information may be transferred to and processed in countries outside Kenya, including countries where our booking partners are located. We ensure appropriate safeguards are in place to protect your information in accordance with this policy.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="font-display text-xl font-bold text-foreground mb-4">10. Children's Privacy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our services are not directed to children under 18. We collect information about minors only as part of family booking with parental/guardian consent. Parents or guardians may request access to or deletion of their child's information.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="font-display text-xl font-bold text-foreground mb-4">11. Third-Party Links</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our website may contain links to third-party websites. We are not responsible for the privacy practices of these sites. We encourage you to review their privacy policies before providing any personal information.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="font-display text-xl font-bold text-foreground mb-4">12. Policy Updates</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated revision date. Continued use of our services after changes constitutes acceptance of the updated policy.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="font-display text-xl font-bold text-foreground mb-4">13. Contact Us</h2>
                <p className="text-muted-foreground leading-relaxed">
                  For questions, concerns, or requests regarding this Privacy Policy:
                </p>
                <div className="bg-muted/50 rounded-xl p-6 mt-4">
                  <p className="text-foreground font-medium">Awili Safaris - Data Protection</p>
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

export default Privacy;
