import { useState, type FormEvent } from "react";
import { Mail, MessageCircle, Instagram, MapPin, Send, Check } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";

function ContactPage() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const subject = `Project inquiry from ${data.get("name")}`;
    const body = `Name: ${data.get("name")}\nEmail: ${data.get("email")}\nCompany: ${data.get("company")}\n\n${data.get("message")}`;
    window.location.href = `mailto:hello@gwsmarketing.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <SiteLayout>
      <section className="container-page pt-20 pb-12">
        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Contact</p>
        <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tighter leading-[0.95] max-w-4xl text-balance">
          Let's grow<br />
          <span className="italic font-light text-muted-foreground">together.</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg text-muted-foreground">
          Tell us about your brand. We'll get back within one business day.
        </p>
      </section>

      <section className="container-page py-12 grid lg:grid-cols-5 gap-8">
        <form onSubmit={handleSubmit} className="lg:col-span-3 rounded-3xl border border-border bg-surface p-8 md:p-10 space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Name</label>
              <input name="name" required className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-foreground" />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Email</label>
              <input name="email" type="email" required className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-foreground" />
            </div>
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Company / Brand</label>
            <input name="company" className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-foreground" />
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">How can we help?</label>
            <textarea name="message" required rows={5} className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-foreground resize-none" />
          </div>
          <button type="submit" className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3.5 text-sm font-semibold hover:bg-primary/90 transition-colors">
            {sent ? <><Check className="h-4 w-4" /> Opening email…</> : <>Send message <Send className="h-4 w-4" /></>}
          </button>
        </form>

        <div className="lg:col-span-2 space-y-4">
          <a href="mailto:hello@gwsmarketing.com" className="block rounded-3xl border border-border bg-background p-6 hover:bg-foreground hover:text-background transition-colors group">
            <Mail className="h-5 w-5 mb-3" />
            <p className="text-xs uppercase tracking-widest text-muted-foreground group-hover:text-background/60 mb-1">Email</p>
            <p className="font-semibold">hello@gwsmarketing.com</p>
          </a>
          <a href="https://wa.me/" target="_blank" rel="noreferrer" className="block rounded-3xl border border-border bg-background p-6 hover:bg-foreground hover:text-background transition-colors group">
            <MessageCircle className="h-5 w-5 mb-3" />
            <p className="text-xs uppercase tracking-widest text-muted-foreground group-hover:text-background/60 mb-1">WhatsApp</p>
            <p className="font-semibold">Quick chat →</p>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="block rounded-3xl border border-border bg-background p-6 hover:bg-foreground hover:text-background transition-colors group">
            <Instagram className="h-5 w-5 mb-3" />
            <p className="text-xs uppercase tracking-widest text-muted-foreground group-hover:text-background/60 mb-1">Instagram</p>
            <p className="font-semibold">@gwsmarketing</p>
          </a>
          <div className="rounded-3xl border border-border bg-background p-6">
            <MapPin className="h-5 w-5 mb-3" />
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Based in</p>
            <p className="font-semibold">India · Worldwide</p>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

export default ContactPage;
