import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowUpRight, Sparkles, Share2, Code2, Search, MapPin, Star } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Marquee } from "@/components/site/Marquee";
import founders from "@/assets/founders.png";
import { supabase } from "@/integrations/supabase/client";

const iconMap: Record<string, typeof Sparkles> = {
  Sparkles, Share2, Code2, Search, MapPin,
};

interface Service { id: string; title: string; description: string | null; icon: string | null }
interface Project { id: string; title: string; category: string | null; image_url: string | null; link: string | null }

function HomePage() {
  const [services, setServices] = useState<Service[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: servicesData } = await supabase.from("services").select("id,title,description,icon").order("sort_order");
        if (servicesData && servicesData.length > 0) setServices(servicesData);

        const { data: projectsData } = await supabase.from("projects").select("id,title,category,image_url,link").eq("featured", true).order("sort_order").limit(4);
        if (projectsData && projectsData.length > 0) setProjects(projectsData);
      } catch (error) {
        console.warn("Supabase not connected. Using mock data for preview.");
        setServices([
          { id: "1", title: "Brand Strategy", description: "Comprehensive brand strategy and positioning.", icon: "Sparkles" },
          { id: "2", title: "Social Media", description: "Engaging social media campaigns.", icon: "Share2" },
          { id: "3", title: "Web Development", description: "High-performance web applications.", icon: "Code2" }
        ]);
      }
    };

    fetchData();
  }, []);

  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-60" aria-hidden />
        <div className="absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-background to-transparent" aria-hidden />
        <div className="container-page relative pt-12 md:pt-20 pb-0">
          <div className="text-center max-w-4xl mx-auto animate-reveal">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 backdrop-blur px-4 py-1.5 text-xs font-medium text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-foreground animate-pulse" />
              Now booking Q3 projects
            </span>
          </div>

          {/* Founders image - overlapping hero text like reference */}
          <div className="relative mt-8 max-w-xl mx-auto z-0 pointer-events-none">
            <div className="absolute inset-x-8 -bottom-4 h-40 bg-foreground/8 blur-3xl rounded-full" aria-hidden />
            <img
              src={founders}
              alt="GWS Marketing founders"
              className="relative w-full h-auto animate-float"
              style={{
                WebkitMaskImage: "linear-gradient(to bottom, black 60%, transparent 100%)",
                maskImage: "linear-gradient(to bottom, black 60%, transparent 100%)"
              }}
            />
          </div>

          {/* Hero text below image */}
          <div className="text-center max-w-4xl mx-auto relative z-10 pb-20 -mt-20 md:-mt-28">
            <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-display font-bold tracking-tighter leading-[0.95] text-balance">
              Grow your brand,<br />
              <span className="italic font-light text-muted-foreground">Local to Global.</span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-base md:text-lg text-muted-foreground leading-relaxed">
              GWS Marketing is a creative-strategic studio helping ambitious businesses build a strong digital identity — from social to search.
            </p>

            <div className="mt-9 flex items-center justify-center gap-3 flex-wrap">
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3.5 text-sm font-semibold hover:bg-primary/90 transition-all hover:scale-[1.02]">
                Let's Talk <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link to="/projects" className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3.5 text-sm font-semibold hover:bg-muted transition-all">
                See Our Work
              </Link>
            </div>

            {/* Trust */}
            <div className="mt-10 flex items-center justify-center gap-3">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-8 w-8 rounded-full border-2 border-background bg-gradient-to-br from-muted to-accent" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                Trusted by <span className="font-bold text-foreground">50+</span> growing brands
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <Marquee items={["Local to Global", "Grow With Swapnil", "Real Growth", "Creative + Strategy", "GWS Marketing"]} />

      {/* SERVICES */}
      <section className="container-page py-24 md:py-32">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">What we do</p>
            <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight max-w-2xl text-balance">
              Everything your brand needs to win online.
            </h2>
          </div>
          <Link to="/services" className="inline-flex items-center gap-1.5 text-sm font-semibold hover:gap-2 transition-all">
            All services <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-px bg-border rounded-3xl overflow-hidden border border-border">
          {services.map((s, i) => {
            const Icon = iconMap[s.icon ?? "Sparkles"] ?? Sparkles;
            return (
              <div
                key={s.id}
                className={`group bg-background p-8 md:p-10 hover:bg-foreground hover:text-background transition-colors duration-300 grid md:grid-cols-12 gap-6 items-start ${i === 0 ? "" : ""}`}
              >
                <div className="md:col-span-1 text-sm font-mono text-muted-foreground group-hover:text-background/60">
                  0{i + 1}
                </div>
                <div className="md:col-span-3">
                  <div className="inline-flex items-center justify-center h-11 w-11 rounded-xl border border-border group-hover:border-background/20 mb-3">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-display font-bold tracking-tight">{s.title}</h3>
                </div>
                <p className="md:col-span-7 text-sm md:text-base text-muted-foreground group-hover:text-background/80 leading-relaxed">
                  {s.description}
                </p>
                <div className="md:col-span-1 flex md:justify-end">
                  <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-background transition-transform group-hover:rotate-45" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* WORK */}
      {projects.length > 0 && (
        <section className="container-page py-24 md:py-32 border-t border-border">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Selected work</p>
              <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight max-w-2xl text-balance">
                Brands we've helped scale.
              </h2>
            </div>
            <Link to="/projects" className="inline-flex items-center gap-1.5 text-sm font-semibold hover:gap-2 transition-all">
              View all <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((p) => (
              <a
                key={p.id}
                href={p.link ?? "#"}
                target={p.link ? "_blank" : undefined}
                rel="noreferrer"
                className="group block rounded-3xl overflow-hidden bg-surface border border-border hover:border-foreground transition-colors"
              >
                <div className="aspect-[4/3] overflow-hidden bg-muted">
                  {p.image_url ? (
                    <img src={p.image_url} alt={p.title} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  ) : (
                    <div className="h-full w-full grid place-items-center text-muted-foreground text-sm">No image</div>
                  )}
                </div>
                <div className="p-6 flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">{p.category}</p>
                    <h3 className="text-xl font-display font-bold tracking-tight">{p.title}</h3>
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground group-hover:rotate-45 transition-all" />
                </div>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="container-page py-24">
        <div className="rounded-[2.5rem] bg-foreground text-background p-10 md:p-20 text-center relative overflow-hidden">
          <div className="absolute inset-0 grid-bg opacity-10" aria-hidden />
          <div className="relative">
            <Sparkles className="h-8 w-8 mx-auto mb-6 opacity-80" />
            <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tighter text-balance">
              Ready to grow with GWS?
            </h2>
            <p className="mt-5 text-base md:text-lg text-background/70 max-w-xl mx-auto">
              Book a free 30-minute strategy call. We'll map out exactly how to scale your brand.
            </p>
            <Link to="/contact" className="mt-8 inline-flex items-center gap-2 rounded-full bg-background text-foreground px-7 py-4 text-sm font-semibold hover:scale-105 transition-transform">
              Start your project <ArrowUpRight className="h-4 w-4" />
            </Link>
            <div className="mt-10 flex items-center justify-center gap-1 text-sm text-background/60">
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4 fill-current" />
              <span className="ml-2">Loved by founders</span>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

export default HomePage;
