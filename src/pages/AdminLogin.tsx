import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState, type FormEvent } from "react";
import { Lock, Mail, ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const ADMIN_EMAIL = "swapnilnaik670@gmail.com";

function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate("/admin/dashboard");
    });
  }, [navigate]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    if (email.toLowerCase() !== ADMIN_EMAIL) {
      setError("Access denied. Invalid admin credentials.");
      setLoading(false);
      return;
    }
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      navigate("/admin/dashboard");
    } catch (err) {
      setError("Access denied. Invalid admin credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface px-6">
      <div className="w-full max-w-md">
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4" /> Back to site
        </Link>
        <div className="rounded-3xl border border-border bg-background p-8 md:p-10">
          <div className="mb-8">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground font-black mb-4">G</span>
            <h1 className="text-3xl font-display font-bold tracking-tight">GWS Admin</h1>
            <p className="text-sm text-muted-foreground mt-1">Sign in to manage your content</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Email</label>
              <div className="relative mt-2">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required className="w-full rounded-xl border border-border bg-background pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-foreground" />
              </div>
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Password</label>
              <div className="relative mt-2">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required minLength={6} className="w-full rounded-xl border border-border bg-background pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-foreground" />
              </div>
            </div>

            {error && (
              <div className="rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">{error}</div>
            )}

            <button type="submit" disabled={loading} className="w-full rounded-full bg-primary text-primary-foreground py-3.5 text-sm font-semibold hover:bg-primary/90 disabled:opacity-50 transition-colors">
              {loading ? "Please wait…" : "Sign in"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
