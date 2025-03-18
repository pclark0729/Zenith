'use client';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-accent/10 backdrop-blur-sm">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          {/* Logo */}
          <a href="/" className="text-accent text-xl font-semibold">
            ZENITH
          </a>
          {/* Main Navigation */}
          <div className="hidden md:flex space-x-6">
            <a href="#learn-more" className="corner-hover px-4 py-2 text-foreground/80 hover:text-accent transition-colors">
              ABOUT
            </a>
          </div>
        </div>
        {/* CTA Button */}
        <a
          href="#subscribe"
          className="hidden md:inline-flex h-10 px-6 items-center justify-center rounded border border-accent/20 bg-accent/10 text-accent hover:bg-accent/20 transition-colors"
        >
          SUBSCRIBE
        </a>
      </nav>
    </header>
  );
} 