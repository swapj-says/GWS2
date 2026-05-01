import { useEffect, useState } from "react";
import { Plus, Trash2, Save } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { ImageUpload } from "./ImageUpload";

interface Logo { id: string; name: string; logo_url: string; sort_order: number }

export function LogosAdmin() {
  const [items, setItems] = useState<Logo[]>([]);
  const [editing, setEditing] = useState<Partial<Logo> | null>(null);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    const { data } = await supabase.from("client_logos").select("*").order("sort_order");
    setItems((data as Logo[]) ?? []);
  };
  useEffect(() => { load(); }, []);

  const save = async () => {
    if (!editing?.name || !editing?.logo_url) return;
    setSaving(true);
    const payload = { name: editing.name, logo_url: editing.logo_url, sort_order: editing.sort_order ?? 0 };
    if (editing.id) await supabase.from("client_logos").update(payload).eq("id", editing.id);
    else await supabase.from("client_logos").insert(payload);
    setSaving(false); setEditing(null); load();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete?")) return;
    await supabase.from("client_logos").delete().eq("id", id); load();
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-display font-bold">Client Logos ({items.length})</h2>
          <button onClick={() => setEditing({ sort_order: items.length + 1 })} className="inline-flex items-center gap-1.5 rounded-full bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold"><Plus className="h-4 w-4" /> Add</button>
        </div>
        {items.length === 0 && <p className="text-sm text-muted-foreground p-6 rounded-2xl bg-background border border-border">No logos yet.</p>}
        <div className="grid grid-cols-2 gap-3">
          {items.map((l) => (
            <div key={l.id} className="p-4 rounded-2xl bg-background border border-border">
              <div className="h-16 grid place-items-center bg-muted rounded-lg overflow-hidden mb-3">
                <img src={l.logo_url} alt={l.name} className="max-h-12 max-w-full object-contain" />
              </div>
              <p className="text-sm font-semibold truncate">{l.name}</p>
              <div className="flex gap-1.5 mt-2">
                <button onClick={() => setEditing(l)} className="flex-1 text-xs px-3 py-1.5 rounded-lg border border-border hover:bg-muted">Edit</button>
                <button onClick={() => remove(l.id)} className="p-1.5 rounded-lg border border-border hover:bg-destructive hover:text-destructive-foreground"><Trash2 className="h-3.5 w-3.5" /></button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {editing && (
        <div className="rounded-2xl bg-background border border-border p-6 space-y-4 h-fit lg:sticky lg:top-24">
          <h3 className="font-display font-bold text-lg">{editing.id ? "Edit logo" : "New logo"}</h3>
          <div><label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Brand name</label><input value={editing.name ?? ""} onChange={(e) => setEditing({ ...editing, name: e.target.value })} className="mt-1.5 w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm" /></div>
          <ImageUpload label="Logo" value={editing.logo_url ?? null} onChange={(url) => setEditing({ ...editing, logo_url: url ?? "" })} />
          <div><label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Sort order</label><input type="number" value={editing.sort_order ?? 0} onChange={(e) => setEditing({ ...editing, sort_order: Number(e.target.value) })} className="mt-1.5 w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm" /></div>
          <div className="flex gap-2 pt-2">
            <button onClick={save} disabled={saving} className="inline-flex items-center gap-1.5 rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm font-semibold disabled:opacity-50"><Save className="h-4 w-4" /> {saving ? "Saving…" : "Save"}</button>
            <button onClick={() => setEditing(null)} className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
