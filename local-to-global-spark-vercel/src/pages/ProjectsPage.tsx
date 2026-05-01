import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { supabase } from "@/integrations/supabase/client";

interface Project {
  id: string; title: string; category: string | null; description: string | null;
  image_url: string | null; link: string | null;
}

function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  useEffect(() => {
    supabase.from("projects").select("*").order("sort_order").then(({ data }) => setProjects(data as Project[] ?? []));
  }, []);

  return (
    <SiteLayout>
      <section className="container-page pt-20 pb-12">
        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Selected Work</p>
        <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tighter leading-[0.95] max-w-4xl text-balance">
          Brands we've taken<br />
          <span className="italic font-light text-muted-foreground">local to global.</span>
        </h1>
      </section>

      <section className="container-page py-12">
        {projects.length === 0 ? (
          <div className="text-center py-24 text-muted-foreground">
            <p>Projects coming soon. Add your first project from the admin panel.</p>
          </div>
        ) : (
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
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">{p.category}</p>
                      <h3 className="text-xl font-display font-bold tracking-tight">{p.title}</h3>
                    </div>
                    <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground group-hover:rotate-45 transition-all" />
                  </div>
                  {p.description && (
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-2">{p.description}</p>
                  )}
                </div>
              </a>
            ))}
          </div>
        )}
      </section>
    </SiteLayout>
  );
}

export default ProjectsPage;
