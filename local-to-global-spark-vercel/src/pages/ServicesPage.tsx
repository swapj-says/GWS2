import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowUpRight, Sparkles, Share2, Code2, Search, MapPin, Check } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { supabase } from "@/integrations/supabase/client";

const iconMap: Record<string, typeof Sparkles> = { Sparkles, Share2, Code2, Search, MapPin };
interface Service { id: string; title: string; description: string | null; icon: string | null }

const deliverables: Record<string, string[]> = {
  "Social Media Management": ["Monthly content calendar", "Daily posting & stories", "Community engagement", "Monthly analytics report"],
  "Content Creation": ["Reels & short-form video", "Branded photo shoots", "Carousel & graphic design", "Copywriting & captions"],
  "Website Development": ["Custom design & build", "Mobile-first responsive", "CMS integration", "Performance optimised"],
  "Search Engine Optimization": ["Technical SEO audit", "Keyword strategy", "On-page optimisation", "Monthly ranking reports"],
  "Google Maps SEO": ["GMB optimisation", "Local citations", "Review strategy", "Local keyword targeting"],
};

function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  useEffect(() => {
    supabase.from("services").select("id,title,description,icon").order("sort_order").then(({ data }) => setServices(data ?? []));
  }, []);

  return (
    <SiteLayout>
      <section className="container-page pt-20 pb-12">
        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Services</p>
        <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tighter leading-[0.95] max-w-4xl text-balance">
          Built to grow brands.<br />
          <span className="italic font-light text-muted-foreground">Designed to convert.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
          Pick one or combine all five — every service is designed to compound on the others for real, measurable growth.
        </p>
      </section>

      <section className="container-page py-12 space-y-6">
        {services.map((s, i) => {
          const Icon = iconMap[s.icon ?? "Sparkles"] ?? Sparkles;
          const items = deliverables[s.title] ?? [];
          return (
            <div key={s.id} className="rounded-3xl border border-border bg-surface hover:bg-foreground hover:text-background transition-colors duration-300 group p-8 md:p-12 grid md:grid-cols-12 gap-8">
              <div className="md:col-span-1 font-mono text-sm text-muted-foreground group-hover:text-background/60">0{i + 1}</div>
              <div className="md:col-span-4">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-border group-hover:border-background/20 mb-4">
                  <Icon className="h-5 w-5" />
                </div>
                <h2 className="text-2xl md:text-3xl font-display font-bold tracking-tight mb-3">{s.title}</h2>
                <p className="text-sm md:text-base text-muted-foreground group-hover:text-background/70 leading-relaxed">{s.description}</p>
              </div>
              <div className="md:col-span-6">
                <p className="text-xs uppercase tracking-widest text-muted-foreground group-hover:text-background/60 mb-4">Deliverables</p>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {items.map((d) => (
                    <li key={d} className="flex items-start gap-2.5 text-sm">
                      <Check className="h-4 w-4 mt-0.5 shrink-0" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="md:col-span-1 flex md:justify-end">
                <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-background group-hover:rotate-45 transition-all" />
              </div>
            </div>
          );
        })}
      </section>

      <section className="container-page py-24">
        <div className="rounded-[2rem] bg-foreground text-background p-10 md:p-16 text-center">
          <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tighter">Need something custom?</h2>
          <p className="mt-4 text-background/70 max-w-xl mx-auto">Tell us about your business and we'll build a plan tailored to your goals.</p>
          <Link to="/contact" className="mt-8 inline-flex items-center gap-2 rounded-full bg-background text-foreground px-6 py-3.5 text-sm font-semibold">
            Get in touch <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}

export default ServicesPage;
