'use client';

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import InteractiveBackground from "@/components/common/InteractiveBackground";

export default function TermsOfService() {
  const contentRef = useScrollAnimation();

  return (
    <div className="relative">
      <InteractiveBackground />
      <section ref={contentRef} className="relative py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-12 text-gradient">
              Terms of Service
            </h1>
            
            <div className="space-y-8 text-foreground/80">
              <section>
                <h2 className="text-2xl font-semibold mb-4 text-accent">1. Acceptance of Terms</h2>
                <p>
                  By accessing and using Zenith's newsletter service, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please do not subscribe to our newsletter.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-accent">2. Service Description</h2>
                <p>
                  Zenith provides a weekly newsletter service focused on mindfulness, growth mindset, and productivity habits. The service includes:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>Weekly email newsletters</li>
                  <li>Access to exclusive content</li>
                  <li>Personal development resources</li>
                  <li>Community engagement opportunities</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-accent">3. User Responsibilities</h2>
                <p>
                  As a subscriber, you agree to:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>Provide accurate and complete information</li>
                  <li>Maintain the security of your account</li>
                  <li>Not share your subscription access</li>
                  <li>Comply with all applicable laws and regulations</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-accent">4. Intellectual Property</h2>
                <p>
                  All content provided in our newsletters, including but not limited to text, graphics, logos, and images, is the property of Zenith and is protected by intellectual property laws. You may not reproduce, distribute, or create derivative works without our explicit permission.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-accent">5. Limitation of Liability</h2>
                <p>
                  Zenith shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the service. We do not guarantee the accuracy, completeness, or usefulness of any content in our newsletters.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-accent">6. Termination</h2>
                <p>
                  We reserve the right to terminate or suspend your subscription at any time for any reason, including but not limited to:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>Violation of these terms</li>
                  <li>Abuse of the service</li>
                  <li>Request for termination</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-accent">7. Changes to Terms</h2>
                <p>
                  We reserve the right to modify these terms at any time. We will notify subscribers of any material changes via email or through our website. Continued use of the service after such changes constitutes acceptance of the new terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-accent">8. Contact Information</h2>
                <p>
                  For any questions regarding these Terms of Service, please contact us at:
                </p>
                <p className="mt-2">
                  Email: legal@zenith-newsletter.com
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