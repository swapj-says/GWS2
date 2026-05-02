import { useEffect, useState } from "react";
import { Plus, Trash2, Save, Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { ImageUpload } from "./ImageUpload";

interface Project {
  id: string;
  title: string;
  category: string | null;
  description: string | null;
  image_url: string | null;
  link: string | null;
  featured: boolean;
  sort_order: number;
}

const empty: Omit<Project, "id"> = {
  title: "", category: "", description: "", image_url: null, link: "", featured: false, sort_order: 0,
};

export function ProjectsAdmin() {
  const [items, setItems] = useState<Project[]>([]);
  const [editing, setEditing] = useState<Partial<Project> | null>(null);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    const { data } = await supabase.from("projects").select("*").order("sort_order");
    setItems((data as Project[]) ?? []);
  };
  useEffect(() => { load(); }, []);

  const save = async () => {
    if (!editing?.title) return;
    setSaving(true);
    const payload = { ...empty, ...editing };
    if (editing.id) {
      await supabase.from("projects").update(payload).eq("id", editing.id);
    } else {
      await supabase.from("projects").insert(payload);
    }
    setSaving(false);
    setEditing(null);
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this project?")) return;
    await supabase.from("projects").delete().eq("id", id);
    load();
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-display font-bold">Projects ({items.length})</h2>
          <button onClick={() => setEditing({ ...empty })} className="inline-flex items-center gap-1.5 rounded-full bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold">
            <Plus className="h-4 w-4" /> Add new
          </button>
        </div>
        {items.length === 0 && <p className="text-sm text-muted-foreground p-6 rounded-2xl bg-background border border-border">No projects yet. Click "Add new" to start.</p>}
        {items.map((p) => (
          <div key={p.id} className="flex gap-3 p-3 rounded-2xl bg-background border border-border">
            <div className="h-16 w-16 rounded-lg bg-muted overflow-hidden shrink-0">
              {p.image_url && <img src={p.image_url} alt="" className="h-full w-full object-cover" />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <p className="font-semibold truncate">{p.title}</p>
                {p.featured && <Star className="h-3.5 w-3.5 fill-current" />}
              </div>
              <p className="text-xs text-muted-foreground truncate">{p.category}</p>
            </div>
            <div className="flex gap-1.5 shrink-0">
              <button onClick={() => setEditing(p)} className="text-xs px-3 py-1.5 rounded-lg border border-border hover:bg-muted">Edit</button>
              <button onClick={() => remove(p.id)} className="p-1.5 rounded-lg border border-border hover:bg-destructive hover:text-destructive-foreground"><Trash2 className="h-3.5 w-3.5" /></button>
            </div>
          </div>
        ))}
      </div>

      {editing && (
        <div className="rounded-2xl bg-background border border-border p-6 space-y-4 h-fit lg:sticky lg:top-24">
          <h3 className="font-display font-bold text-lg">{editing.id ? "Edit project" : "New project"}</h3>
          <Field label="Title"><input value={editing.title ?? ""} onChange={(e) => setEditing({ ...editing, title: e.target.value })} className="input" /></Field>
          <Field label="Category"><input value={editing.category ?? ""} onChange={(e) => setEditing({ ...editing, category: e.target.value })} className="input" placeholder="e.g. Social Media" /></Field>
          <Field label="Description"><textarea rows={3} value={editing.description ?? ""} onChange={(e) => setEditing({ ...editing, description: e.target.value })} className="input resize-none" /></Field>
          <Field label="Link (optional)"><input value={editing.link ?? ""} onChange={(e) => setEditing({ ...editing, link: e.target.value })} className="input" placeholder="https://" /></Field>
          <ImageUpload value={editing.image_url} onChange={(url) => setEditing({ ...editing, image_url: url })} />
          <Field label="Sort order"><input type="number" value={editing.sort_order ?? 0} onChange={(e) => setEditing({ ...editing, sort_order: Number(e.target.value) })} className="input" /></Field>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={editing.featured ?? false} onChange={(e) => setEditing({ ...editing, featured: e.target.checked })} />
            Show on homepage
          </label>
          <div className="flex gap-2 pt-2">
            <button onClick={save} disabled={saving} className="inline-flex items-center gap-1.5 rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm font-semibold disabled:opacity-50">
              <Save className="h-4 w-4" /> {saving ? "Saving…" : "Save"}
            </button>
            <button onClick={() => setEditing(null)} className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold">Cancel</button>
          </div>
        </div>
      )}
      <style>{`.input{width:100%;border-radius:0.75rem;border:1px solid var(--border);background:var(--background);padding:0.625rem 0.875rem;font-size:0.875rem;outline:none}.input:focus{box-shadow:0 0 0 2px var(--foreground)}`}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{label}</label>
      <div className="mt-1.5">{children}</div>
    </div>
  );
}
