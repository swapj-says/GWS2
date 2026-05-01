import { useEffect, useState } from "react";
import { Plus, Trash2, Save } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { ImageUpload } from "./ImageUpload";

interface Testimonial { id: string; name: string; role: string | null; company: string | null; content: string; avatar_url: string | null; rating: number; sort_order: number }

export function TestimonialsAdmin() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [editing, setEditing] = useState<Partial<Testimonial> | null>(null);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    const { data } = await supabase.from("testimonials").select("*").order("sort_order");
    setItems((data as Testimonial[]) ?? []);
  };
  useEffect(() => { load(); }, []);

  const save = async () => {
    if (!editing?.name || !editing?.content) return;
    setSaving(true);
    const payload = { name: editing.name, role: editing.role ?? "", company: editing.company ?? "", content: editing.content, avatar_url: editing.avatar_url ?? null, rating: editing.rating ?? 5, sort_order: editing.sort_order ?? 0 };
    if (editing.id) await supabase.from("testimonials").update(payload).eq("id", editing.id);
    else await supabase.from("testimonials").insert(payload);
    setSaving(false); setEditing(null); load();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete?")) return;
    await supabase.from("testimonials").delete().eq("id", id); load();
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-display font-bold">Testimonials ({items.length})</h2>
          <button onClick={() => setEditing({ rating: 5, sort_order: items.length + 1 })} className="inline-flex items-center gap-1.5 rounded-full bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold"><Plus className="h-4 w-4" /> Add</button>
        </div>
        {items.length === 0 && <p className="text-sm text-muted-foreground p-6 rounded-2xl bg-background border border-border">No testimonials yet.</p>}
        {items.map((t) => (
          <div key={t.id} className="p-4 rounded-2xl bg-background border border-border">
            <div className="flex gap-3 items-start">
              <div className="h-10 w-10 rounded-full bg-muted overflow-hidden shrink-0">{t.avatar_url && <img src={t.avatar_url} alt="" className="h-full w-full object-cover" />}</div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}{t.company ? ` · ${t.company}` : ""}</p>
                <p className="text-xs text-muted-foreground line-clamp-2 mt-1">"{t.content}"</p>
              </div>
              <div className="flex gap-1.5 shrink-0">
                <button onClick={() => setEditing(t)} className="text-xs px-3 py-1.5 rounded-lg border border-border hover:bg-muted">Edit</button>
                <button onClick={() => remove(t.id)} className="p-1.5 rounded-lg border border-border hover:bg-destructive hover:text-destructive-foreground"><Trash2 className="h-3.5 w-3.5" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editing && (
        <div className="rounded-2xl bg-background border border-border p-6 space-y-4 h-fit lg:sticky lg:top-24">
          <h3 className="font-display font-bold text-lg">{editing.id ? "Edit testimonial" : "New testimonial"}</h3>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Name</label><input value={editing.name ?? ""} onChange={(e) => setEditing({ ...editing, name: e.target.value })} className="mt-1.5 w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm" /></div>
            <div><label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Role</label><input value={editing.role ?? ""} onChange={(e) => setEditing({ ...editing, role: e.target.value })} className="mt-1.5 w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm" /></div>
          </div>
          <div><label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Company</label><input value={editing.company ?? ""} onChange={(e) => setEditing({ ...editing, company: e.target.value })} className="mt-1.5 w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm" /></div>
          <div><label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Quote</label><textarea rows={4} value={editing.content ?? ""} onChange={(e) => setEditing({ ...editing, content: e.target.value })} className="mt-1.5 w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm resize-none" /></div>
          <ImageUpload label="Avatar" value={editing.avatar_url ?? null} onChange={(url) => setEditing({ ...editing, avatar_url: url })} />
          <div className="grid grid-cols-2 gap-3">
            <div><label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Rating</label><input type="number" min={1} max={5} value={editing.rating ?? 5} onChange={(e) => setEditing({ ...editing, rating: Number(e.target.value) })} className="mt-1.5 w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm" /></div>
            <div><label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Sort order</label><input type="number" value={editing.sort_order ?? 0} onChange={(e) => setEditing({ ...editing, sort_order: Number(e.target.value) })} className="mt-1.5 w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm" /></div>
          </div>
          <div className="flex gap-2 pt-2">
            <button onClick={save} disabled={saving} className="inline-flex items-center gap-1.5 rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm font-semibold disabled:opacity-50"><Save className="h-4 w-4" /> {saving ? "Saving…" : "Save"}</button>
            <button onClick={() => setEditing(null)} className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
