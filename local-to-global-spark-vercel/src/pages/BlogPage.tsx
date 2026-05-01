import { SiteLayout } from "@/components/site/SiteLayout";

function BlogPage() {
  return (
    <SiteLayout>
      <section className="container-page pt-20 pb-12">
        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Insights</p>
        <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tighter leading-[0.95] max-w-4xl text-balance">
          Growth playbooks<br />
          <span className="italic font-light text-muted-foreground">we live by.</span>
        </h1>
      </section>

      <section className="container-page py-24">
        <div className="rounded-3xl border border-border bg-surface p-12 md:p-20 text-center">
          <p className="text-sm font-mono text-muted-foreground mb-4">Coming soon</p>
          <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight max-w-2xl mx-auto text-balance">
            Our first insights drop next month. Stay tuned.
          </h2>
          <p className="mt-4 text-muted-foreground max-w-lg mx-auto">
            Deep dives on social strategy, SEO playbooks and behind-the-scenes case studies — straight from our team.
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}

export default BlogPage;
