import Link from "next/link";
import { Mail, MapPin, Phone, Facebook, Twitter, Instagram, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <Link href="/" className="flex items-center gap-2 text-xl font-semibold">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
              v0
            </span>
            Visionary
          </Link>
          <p className="text-sm text-muted-foreground">
            Visionary is your destination for future-ready technology. Explore curated selections of
            smartphones, laptops, audio gear, and wearables crafted for modern lifestyles.
          </p>
          <div className="flex items-center gap-3 text-muted-foreground">
            <Link href="#" aria-label="Facebook" className="hover:text-foreground">
              <Facebook className="h-5 w-5" />
            </Link>
            <Link href="#" aria-label="Instagram" className="hover:text-foreground">
              <Instagram className="h-5 w-5" />
            </Link>
            <Link href="#" aria-label="Twitter" className="hover:text-foreground">
              <Twitter className="h-5 w-5" />
            </Link>
            <Link href="#" aria-label="YouTube" className="hover:text-foreground">
              <Youtube className="h-5 w-5" />
            </Link>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-semibold uppercase tracking-wide">Customer Care</h4>
          <div className="space-y-2 text-sm text-muted-foreground">
            <Link href="/shipping" className="block hover:text-foreground">
              Shipping & Returns
            </Link>
            <Link href="/faq" className="block hover:text-foreground">
              FAQs
            </Link>
            <Link href="/support" className="block hover:text-foreground">
              Support Center
            </Link>
            <Link href="/account" className="block hover:text-foreground">
              My Account
            </Link>
            <Link href="/orders" className="block hover:text-foreground">
              Order Tracking
            </Link>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-semibold uppercase tracking-wide">Visit Us</h4>
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4" />
              <p>123 Innovation Avenue, Suite 500, San Francisco, CA 94016</p>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <a href="tel:+14155550123" className="hover:text-foreground">
                (415) 555-0123
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <a href="mailto:support@visionary.io" className="hover:text-foreground">
                support@visionary.io
              </a>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-sm font-semibold uppercase tracking-wide">Stay in the loop</h4>
          <p className="text-sm text-muted-foreground">
            Subscribe to receive curated deals, product drops, and exclusive experiences from Visionary.
          </p>
          <form className="flex flex-col gap-2 sm:flex-row" aria-label="Newsletter signup">
            <label className="sr-only" htmlFor="newsletter-email">
              Email
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              placeholder="Enter your email"
              className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Subscribe
            </button>
          </form>
          <p className="text-xs text-muted-foreground">
            By subscribing, you agree to receive marketing emails. You can unsubscribe at any time.
          </p>
        </div>
      </div>
      <div className="border-t bg-background/60 py-4">
        <div className="container flex flex-col justify-between gap-2 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} Visionary Commerce. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms & Conditions</Link>
            <Link href="/cookies">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
