import { Link } from "react-router-dom";
import { Instagram, Mail, MessageCircle } from "lucide-react";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="mt-32 border-t border-border bg-surface">
      <div className="container-page py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo />
          <p className="mt-4 max-w-sm text-sm text-muted-foreground leading-relaxed">
            Local to Global with GWS — a digital marketing studio helping ambitious brands
            grow online with creative content and proven strategy.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="rounded-full border border-border p-2.5 hover:bg-foreground hover:text-background transition-colors">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="mailto:hello@gwsmarketing.com" className="rounded-full border border-border p-2.5 hover:bg-foreground hover:text-background transition-colors">
              <Mail className="h-4 w-4" />
            </a>
            <a href="https://wa.me/" target="_blank" rel="noreferrer" className="rounded-full border border-border p-2.5 hover:bg-foreground hover:text-background transition-colors">
              <MessageCircle className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Explore</h4>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/services" className="hover:text-foreground text-muted-foreground">Services</Link></li>
            <li><Link to="/projects" className="hover:text-foreground text-muted-foreground">Work</Link></li>
            <li><Link to="/about" className="hover:text-foreground text-muted-foreground">About</Link></li>
            <li><Link to="/blog" className="hover:text-foreground text-muted-foreground">Insights</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Get in touch</h4>
          <ul className="space-y-2.5 text-sm text-muted-foreground">
            <li>hello@gwsmarketing.com</li>
            <li>India · Worldwide</li>
            <li>
              <Link to="/contact" className="text-foreground font-semibold hover:underline underline-offset-4">
                Start a project →
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-page py-6 flex flex-col md:flex-row gap-2 items-center justify-between text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} GWS Marketing. All rights reserved.</p>
          <p>Grow With Swapnil — Local to Global.</p>
        </div>
      </div>
    </footer>
  );
}
