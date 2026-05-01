import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { LogOut, FolderKanban, Sparkles, MessageSquareQuote, Image as ImageIcon, ArrowLeft, ShieldAlert } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { ProjectsAdmin } from "@/components/admin/ProjectsAdmin";
import { ServicesAdmin } from "@/components/admin/ServicesAdmin";
import { TestimonialsAdmin } from "@/components/admin/TestimonialsAdmin";
import { LogosAdmin } from "@/components/admin/LogosAdmin";

type Tab = "projects" | "services" | "testimonials" | "logos";

const tabs: { id: Tab; label: string; icon: typeof FolderKanban }[] = [
  { id: "projects", label: "Projects", icon: FolderKanban },
  { id: "services", label: "Services", icon: Sparkles },
  { id: "testimonials", label: "Testimonials", icon: MessageSquareQuote },
  { id: "logos", label: "Client Logos", icon: ImageIcon },
];

function Dashboard() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("projects");
  const [userEmail, setUserEmail] = useState<string>("");
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    let unsub: (() => void) | undefined;
    const init = async () => {
      const { data: sess } = await supabase.auth.getSession();
      if (!sess.session) {
        navigate("/admin");
        return;
      }
      setUserEmail(sess.session.user.email ?? "");
      setUserId(sess.session.user.id);

      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", sess.session.user.id);
      setIsAdmin((roles ?? []).some((r) => r.role === "admin"));

      const { data: listener } = supabase.auth.onAuthStateChange((_e, session) => {
        if (!session) navigate("/admin");
      });
      unsub = () => listener.subscription.unsubscribe();
    };
    init();
    return () => unsub?.();
  }, [navigate]);

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate("/admin");
  };

  if (isAdmin === null) {
    return <div className="min-h-screen grid place-items-center text-muted-foreground">Loading…</div>;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface px-6">
        <div className="max-w-lg text-center rounded-3xl border border-border bg-background p-10">
          <ShieldAlert className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
          <h1 className="text-2xl font-display font-bold tracking-tight">Admin access required</h1>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
            Your account isn't an admin yet. To grant admin access, run this in the backend SQL editor:
          </p>
          <pre className="mt-4 text-left text-xs bg-muted rounded-xl p-4 overflow-x-auto font-mono">
{`INSERT INTO public.user_roles (user_id, role)
VALUES ('${userId}', 'admin');`}
          </pre>
          <p className="mt-4 text-xs text-muted-foreground">Signed in as: {userEmail}</p>
          <div className="mt-6 flex gap-3 justify-center">
            <button onClick={signOut} className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold hover:bg-muted">Sign out</button>
            <Link to="/" className="rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm font-semibold">Go to site</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface">
      <header className="border-b border-border bg-background">
        <div className="container-page flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" /> Site
            </Link>
            <div className="h-5 w-px bg-border" />
            <h1 className="font-display font-bold">GWS Admin</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground hidden sm:inline">{userEmail}</span>
            <button onClick={signOut} className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-sm hover:bg-muted">
              <LogOut className="h-4 w-4" /> Sign out
            </button>
          </div>
        </div>
      </header>

      <div className="container-page py-8">
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold whitespace-nowrap transition-colors ${
                tab === t.id ? "bg-primary text-primary-foreground" : "bg-background border border-border hover:bg-muted"
              }`}
            >
              <t.icon className="h-4 w-4" /> {t.label}
            </button>
          ))}
        </div>

        {tab === "projects" && <ProjectsAdmin />}
        {tab === "services" && <ServicesAdmin />}
        {tab === "testimonials" && <TestimonialsAdmin />}
        {tab === "logos" && <LogosAdmin />}
      </div>
    </div>
  );
}

export default Dashboard;
