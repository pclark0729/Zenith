'use client';

export default function Footer() {
  return (
    <footer className="mt-32 border-t border-accent/10">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-accent/60 text-sm">
            © {new Date().getFullYear()} Zenith. All rights reserved.
          </div>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="/privacy" className="corner-hover px-4 py-2 text-foreground/60 hover:text-accent text-sm">
              Privacy Policy
            </a>
            <a href="/terms" className="corner-hover px-4 py-2 text-foreground/60 hover:text-accent text-sm">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
} 