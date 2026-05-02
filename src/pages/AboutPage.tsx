import { Link } from "react-router-dom";
import { ArrowUpRight, Target, Heart, Zap, Trophy } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import founders from "@/assets/founders.png";

const values = [
  { icon: Target, title: "Strategy first", desc: "Every creative decision is anchored to a measurable business goal." },
  { icon: Heart, title: "Real partnerships", desc: "We work as an extension of your team, not just an external vendor." },
  { icon: Zap, title: "Move fast", desc: "Lean process, weekly shipments, no endless approval loops." },
  { icon: Trophy, title: "Real growth", desc: "We chase actual ROI — not vanity metrics or empty followers." },
];

function AboutPage() {
  return (
    <SiteLayout>
      <section className="container-page pt-20 pb-16">
        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">About</p>
        <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tighter leading-[0.95] max-w-4xl text-balance">
          We help brands<br />
          <span className="italic font-light text-muted-foreground">find their audience.</span>
        </h1>
        <p className="mt-8 max-w-2xl text-lg text-muted-foreground leading-relaxed">
          GWS Marketing — short for Grow With Swapnil — is a creative-strategic studio built on one belief: every local business deserves a global stage. We blend storytelling with execution to help brands stand out and scale.
        </p>
      </section>

      <section className="container-page py-12">
        <div className="rounded-[2.5rem] bg-surface border border-border p-8 md:p-16 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Our Mission</p>
            <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight text-balance">
              Local businesses ko digital platforms ke through global level tak le jaana.
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              We started GWS to fix something that frustrated us — local businesses with great products getting lost online while bigger brands dominated. Our job is to level the playing field with creative content, smart strategy and modern execution.
            </p>
          </div>
          <div className="relative">
            <div className="absolute inset-x-8 -bottom-4 h-32 bg-foreground/10 blur-3xl rounded-full" aria-hidden />
            <img src={founders} alt="GWS Founders" className="relative w-full h-auto" />
          </div>
        </div>
      </section>

      <section className="container-page py-24">
        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">What makes us different</p>
        <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tighter max-w-3xl text-balance mb-14">
          Four principles. Zero compromises.
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {values.map((v) => (
            <div key={v.title} className="rounded-3xl border border-border bg-background p-8 hover:bg-foreground hover:text-background transition-colors group">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border group-hover:border-background/20 mb-5">
                <v.icon className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-display font-bold tracking-tight mb-2">{v.title}</h3>
              <p className="text-muted-foreground group-hover:text-background/70 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page pb-24">
        <div className="rounded-[2rem] bg-foreground text-background p-10 md:p-16 text-center">
          <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tighter">Let's build something great.</h2>
          <Link to="/contact" className="mt-8 inline-flex items-center gap-2 rounded-full bg-background text-foreground px-6 py-3.5 text-sm font-semibold">
            Start a project <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}

export default AboutPage;
