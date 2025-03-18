'use client';

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import InteractiveBackground from "@/components/common/InteractiveBackground";

export default function PrivacyPolicy() {
  const contentRef = useScrollAnimation();

  return (
    <div className="relative">
      <InteractiveBackground />
      <section ref={contentRef} className="relative py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-12 text-gradient">
              Privacy Policy
            </h1>
            
            <div className="space-y-8 text-foreground/80">
              <section>
                <h2 className="text-2xl font-semibold mb-4 text-accent">1. Information We Collect</h2>
                <p>
                  We collect information that you provide directly to us when subscribing to our newsletter:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>Email address</li>
                  <li>First name</li>
                  <li>Last name</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-accent">2. How We Use Your Information</h2>
                <p>
                  We use the information we collect to:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>Send you our weekly newsletter</li>
                  <li>Personalize your experience</li>
                  <li>Improve our services</li>
                  <li>Communicate with you about your subscription</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-accent">3. Data Storage and Security</h2>
                <p>
                  We use Supabase to securely store your information. We implement appropriate security measures to protect your personal data from unauthorized access, alteration, disclosure, or destruction.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-accent">4. Email Communications</h2>
                <p>
                  We use SendGrid to deliver our newsletters. By subscribing, you agree to receive our weekly emails. You can unsubscribe at any time by clicking the unsubscribe link in any of our emails.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-accent">5. Your Rights</h2>
                <p>
                  You have the right to:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>Access your personal data</li>
                  <li>Correct inaccurate data</li>
                  <li>Request deletion of your data</li>
                  <li>Opt-out of marketing communications</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-accent">6. Contact Us</h2>
                <p>
                  If you have any questions about this Privacy Policy, please contact us at:
                </p>
                <p className="mt-2">
                  Email: privacy@zenith-newsletter.com
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-accent">7. Updates to This Policy</h2>
                <p>
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
                </p>
              </section>

              <p className="text-sm text-foreground/60 mt-8">
                Last Updated: {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 