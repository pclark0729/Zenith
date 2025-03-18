'use client';

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import InteractiveBackground from "@/components/common/InteractiveBackground";

export default function Home() {
  const heroRef = useScrollAnimation();
  const benefitsRef = useScrollAnimation();
  const formRef = useScrollAnimation();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'Zenith Newsletter',
            description: 'Weekly insights on mindfulness, growth mindset, and productivity habits',
            url: 'https://zenith.news',
            potentialAction: {
              '@type': 'SubscribeAction',
              target: {
                '@type': 'EntryPoint',
                urlTemplate: 'https://zenith.news/api/subscribe'
              }
            }
          })
        }}
      />
      <div className="relative">
        <InteractiveBackground />
        
        {/* Hero Section */}
        <section ref={heroRef} className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center">
          <div className="container mx-auto px-4 py-24 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="mb-6 space-y-4">
                <h1 className="text-6xl md:text-7xl font-bold tracking-tighter text-gradient">
                  <span className="block">MINDFUL</span>
                  <span className="block">GROWTH</span>
                </h1>
              </div>
              <div className="overflow-hidden">
                <p className="text-xl md:text-2xl text-foreground/80 mb-12 animate-slide-up [animation-delay:300ms]">
                  Weekly insights for your personal development journey
                </p>
              </div>
              <div className="flex justify-center gap-4 animate-fade-in [animation-delay:600ms]">
                <a
                  href="#subscribe"
                  className="corner-hover px-8 py-4 text-accent hover:text-accent/80 transition-colors"
                >
                  JOIN NOW
                </a>
                <a
                  href="#learn-more"
                  className="corner-hover px-4 py-4 text-foreground/80 hover:text-accent transition-colors"
                >
                  LEARN MORE
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="learn-more" ref={benefitsRef} className="py-24 scroll-mt-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gradient">
                Transform Your Journey
              </h2>
              <p className="text-lg text-foreground/80">
                Join our community of mindful achievers and unlock your full potential.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="benefit-card p-4"
                >
                  <div className="benefit-icon mb-2 text-xl">{benefit.icon}</div>
                  <h3 className="text-lg font-semibold mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-foreground/70">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section id="subscribe" ref={formRef} className="py-24 scroll-mt-20">
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-accent animate-pulse">
                Join Our Community
              </h2>
              <form className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="form-field">
                    <input
                      type="text"
                      placeholder=" "
                      className="w-full"
                      required
                    />
                    <label>First Name</label>
                  </div>
                  <div className="form-field">
                    <input
                      type="text"
                      placeholder=" "
                      className="w-full"
                      required
                    />
                    <label>Last Name</label>
                  </div>
                </div>
                <div className="form-field">
                  <input
                    type="email"
                    placeholder=" "
                    className="w-full"
                    required
                  />
                  <label>Email Address</label>
                </div>
                <div className="flex items-center space-x-2">
                  <label htmlFor="terms" className="flex items-center space-x-2 cursor-pointer">
                    <div className="relative">
                      <input
                        type="checkbox"
                        id="terms"
                        className="peer absolute inset-0 w-5 h-5 opacity-0 cursor-pointer"
                        required
                      />
                      <div className="w-5 h-5 border-2 border-accent/30 rounded-sm peer-checked:border-accent peer-checked:bg-accent/10 transition-all duration-200 ease-in-out peer-focus:ring-2 peer-focus:ring-accent/20">
                        <svg
                          className="w-5 h-5 text-accent opacity-0 peer-checked:opacity-100 transition-opacity duration-200"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                    </div>
                    <span className="text-sm text-foreground/60">
                      I agree to receive weekly emails and accept the{' '}
                      <a href="/privacy" className="text-accent hover:text-accent/80 transition-colors">
                        privacy policy
                      </a>
                      {' '}and{' '}
                      <a href="/terms" className="text-accent hover:text-accent/80 transition-colors">
                        terms of service
                      </a>
                    </span>
                  </label>
                </div>
                <button
                  type="submit"
                  className="corner-hover w-full py-4 text-lg text-accent hover:text-accent/80 transition-colors"
                >
                  SUBSCRIBE
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

const benefits = [
  {
    icon: "🧘",
    title: "Mindfulness Practices",
    description:
      "Learn practical techniques to stay present, reduce stress, and enhance your mental clarity.",
  },
  {
    icon: "🎯",
    title: "Growth Mindset",
    description:
      "Develop resilience and embrace challenges with proven strategies for personal growth.",
  },
  {
    icon: "⚡",
    title: "Peak Productivity",
    description:
      "Master time management and focus techniques to achieve more while maintaining balance.",
  },
  {
    icon: "🌟",
    title: "Weekly Inspiration",
    description:
      "Get curated insights and actionable tips to keep you motivated on your journey.",
  },
];
