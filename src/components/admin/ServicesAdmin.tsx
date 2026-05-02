import { useEffect, useState } from "react";
import { Plus, Trash2, Save } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Service { id: string; title: string; description: string | null; icon: string | null; sort_order: number }

const ICONS = ["Sparkles", "Share2", "Code2", "Search", "MapPin"];

export function ServicesAdmin() {
  const [items, setItems] = useState<Service[]>([]);
  const [editing, setEditing] = useState<Partial<Service> | null>(null);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    const { data } = await supabase.from("services").select("*").order("sort_order");
    setItems((data as Service[]) ?? []);
  };
  useEffect(() => { load(); }, []);

  const save = async () => {
    if (!editing?.title) return;
    setSaving(true);
    const payload = { title: editing.title, description: editing.description ?? "", icon: editing.icon ?? "Sparkles", sort_order: editing.sort_order ?? 0 };
    if (editing.id) await supabase.from("services").update(payload).eq("id", editing.id);
    else await supabase.from("services").insert(payload);
    setSaving(false); setEditing(null); load();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this service?")) return;
    await supabase.from("services").delete().eq("id", id); load();
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-display font-bold">Services ({items.length})</h2>
          <button onClick={() => setEditing({ icon: "Sparkles", sort_order: items.length + 1 })} className="inline-flex items-center gap-1.5 rounded-full bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold">
            <Plus className="h-4 w-4" /> Add
          </button>
        </div>
        {items.map((s) => (
          <div key={s.id} className="flex gap-3 p-4 rounded-2xl bg-background border border-border items-start">
            <div className="flex-1 min-w-0">
              <p className="font-semibold">{s.title}</p>
              <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{s.description}</p>
            </div>
            <div className="flex gap-1.5 shrink-0">
              <button onClick={() => setEditing(s)} className="text-xs px-3 py-1.5 rounded-lg border border-border hover:bg-muted">Edit</button>
              <button onClick={() => remove(s.id)} className="p-1.5 rounded-lg border border-border hover:bg-destructive hover:text-destructive-foreground"><Trash2 className="h-3.5 w-3.5" /></button>
            </div>
          </div>
        ))}
      </div>

      {editing && (
        <div className="rounded-2xl bg-background border border-border p-6 space-y-4 h-fit lg:sticky lg:top-24">
          <h3 className="font-display font-bold text-lg">{editing.id ? "Edit service" : "New service"}</h3>
          <div><label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Title</label>
            <input value={editing.title ?? ""} onChange={(e) => setEditing({ ...editing, title: e.target.value })} className="mt-1.5 w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm" /></div>
          <div><label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Description</label>
            <textarea rows={4} value={editing.description ?? ""} onChange={(e) => setEditing({ ...editing, description: e.target.value })} className="mt-1.5 w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm resize-none" /></div>
          <div><label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Icon</label>
            <select value={editing.icon ?? "Sparkles"} onChange={(e) => setEditing({ ...editing, icon: e.target.value })} className="mt-1.5 w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm">
              {ICONS.map((i) => <option key={i} value={i}>{i}</option>)}
            </select></div>
          <div><label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Sort order</label>
            <input type="number" value={editing.sort_order ?? 0} onChange={(e) => setEditing({ ...editing, sort_order: Number(e.target.value) })} className="mt-1.5 w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm" /></div>
          <div className="flex gap-2 pt-2">
            <button onClick={save} disabled={saving} className="inline-flex items-center gap-1.5 rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm font-semibold disabled:opacity-50"><Save className="h-4 w-4" /> {saving ? "Saving…" : "Save"}</button>
            <button onClick={() => setEditing(null)} className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
