import { createFileRoute } from "@tanstack/react-router";
import { Check, Edit3, Plus, Save, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import type { Database, Json } from "@/integrations/supabase/types";
import { catalog, slugifyProduct } from "@/lib/catalog-data";

type ProductRow = Database["public"]["Tables"]["products"]["Row"];
type AdminProduct = ProductRow & { source: "catalog" | "database" };
type OrderRow = Database["public"]["Tables"]["orders"]["Row"];

const blankProduct = { name: "", subtitle: "", collection: "scentlab", price: 0, notes_top: "", notes_heart: "", notes_base: "", description: "", image_url: "", slug: "", in_stock: true, is_bestseller: false };
const blankOrder = { customer_name: "", customer_phone: "", customer_address: "", total: 0, status: "nouveau", notes: "", itemsText: "" };
const statCards = [
  { icon: BarChart3, label: "CA", key: "revenue" },
  { icon: Package, label: "Produits", key: "products" },
  { icon: ShoppingBag, label: "Commandes", key: "orders" },
  { icon: Package, label: "En stock", key: "inStock" },
] as const;

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — 2M Parfumerie" }, { name: "robots", content: "noindex" }] }),
  component: AdminPage,
});

function AdminPage() {
  const [sessionEmail, setSessionEmail] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [auth, setAuth] = useState({ email: "", password: "" });
  const [productForm, setProductForm] = useState(blankProduct);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [orderForm, setOrderForm] = useState(blankOrder);
  const [activeTab, setActiveTab] = useState<"orders" | "products" | "blog" | "settings">("products");
  const [showProductForm, setShowProductForm] = useState(false);

  const stats = useMemo(() => ({ products: products.length, inStock: products.filter((p) => p.in_stock).length, orders: orders.length, revenue: orders.reduce((sum, order) => sum + order.total, 0) }), [products, orders]);

  const loadAdminData = async () => {
    setLoading(true);
    const { data: sessionData } = await supabase.auth.getSession();
    const user = sessionData.session?.user;
    setSessionEmail(user?.email ?? null);
    if (!user) { setIsAdmin(false); setLoading(false); return; }

    const { data: roleAllowed } = await supabase.rpc("has_role", { _user_id: user.id, _role: "admin" });
    setIsAdmin(Boolean(roleAllowed));
    if (roleAllowed) {
      const [{ data: productRows }, { data: orderRows }] = await Promise.all([
        supabase.from("products").select("*").order("created_at", { ascending: false }),
        supabase.from("orders").select("*").order("created_at", { ascending: false }),
      ]);
      setProducts(mergeCatalogWithDatabaseProducts(productRows ?? []));
      setOrders(orderRows ?? []);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadAdminData();
    const { data: listener } = supabase.auth.onAuthStateChange(() => { setTimeout(loadAdminData, 0); });
    return () => listener.subscription.unsubscribe();
  }, []);

  const signIn = async (event: FormEvent) => {
    event.preventDefault();
    const { error } = await supabase.auth.signInWithPassword(auth);
    if (error) toast.error(error.message); else toast.success("Connexion réussie");
  };

  const signUp = async () => {
    const { error } = await supabase.auth.signUp({ email: auth.email, password: auth.password, options: { emailRedirectTo: window.location.origin + "/admin" } });
    if (error) toast.error(error.message); else toast.success("Compte créé. Vérifiez votre email.");
  };

  const saveProduct = async (event: FormEvent) => {
    event.preventDefault();
    const payload = { ...productForm, price: Number(productForm.price), slug: productForm.slug || slugify(productForm.name) };
    const query = editingProductId ? supabase.from("products").update(payload).eq("id", editingProductId) : supabase.from("products").insert(payload);
    const { error } = await query;
    if (error) toast.error(error.message); else { toast.success("Produit enregistré"); setProductForm(blankProduct); setEditingProductId(null); setShowProductForm(false); loadAdminData(); }
  };

  const deleteProduct = async (id: string) => {
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) toast.error(error.message); else { toast.success("Produit supprimé"); loadAdminData(); }
  };

  const saveOrder = async (event: FormEvent) => {
    event.preventDefault();
    const items = orderForm.itemsText.split("\n").filter(Boolean).map((line) => ({ label: line }));
    const { error } = await supabase.from("orders").insert({ customer_name: orderForm.customer_name, customer_phone: orderForm.customer_phone, customer_address: orderForm.customer_address, total: Number(orderForm.total), status: orderForm.status, notes: orderForm.notes, items: items as Json });
    if (error) toast.error(error.message); else { toast.success("Commande ajoutée"); setOrderForm(blankOrder); loadAdminData(); }
  };

  const updateOrderStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("orders").update({ status }).eq("id", id);
    if (error) toast.error(error.message); else loadAdminData();
  };

  if (loading) return <AdminShell><p className="text-muted-foreground">Chargement…</p></AdminShell>;

  if (!sessionEmail) {
    return (
      <AdminShell>
        <form onSubmit={signIn} className="mx-auto max-w-md rounded-lg border border-border bg-card p-8 shadow-card">
          <h1 className="font-display text-4xl text-foreground">Admin 2M</h1>
          <p className="mt-2 text-sm text-muted-foreground">Connexion propriétaire uniquement.</p>
          <input className="mt-8 w-full rounded-md border border-border bg-background px-4 py-3 text-foreground" placeholder="Email" type="email" value={auth.email} onChange={(e) => setAuth({ ...auth, email: e.target.value })} required />
          <input className="mt-3 w-full rounded-md border border-border bg-background px-4 py-3 text-foreground" placeholder="Mot de passe" type="password" value={auth.password} onChange={(e) => setAuth({ ...auth, password: e.target.value })} required />
          <Button className="mt-6 w-full" type="submit">Se connecter</Button>
          <Button className="mt-3 w-full" type="button" variant="outline" onClick={signUp}>Créer le compte admin</Button>
          <Button className="mt-3 w-full" type="button" variant="ghost" onClick={() => lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin + "/admin" })}>Continuer avec Google</Button>
        </form>
      </AdminShell>
    );
  }

  if (!isAdmin) {
    return <AdminShell><div className="mx-auto max-w-lg rounded-lg border border-border bg-card p-8 text-center"><h1 className="font-display text-4xl text-foreground">Accès en attente</h1><p className="mt-3 text-muted-foreground">Votre compte {sessionEmail} doit recevoir le rôle admin dans Lovable Cloud.</p><Button className="mt-6" variant="outline" onClick={() => supabase.auth.signOut()}>Déconnexion</Button></div></AdminShell>;
  }

  return (
    <AdminShell>
      <AdminChrome email={sessionEmail} activeTab={activeTab} setActiveTab={setActiveTab}>
        {activeTab === "products" && <ProductsPanel products={products} showProductForm={showProductForm} setShowProductForm={setShowProductForm} productForm={productForm} setProductForm={setProductForm} saveProduct={saveProduct} editingProductId={editingProductId} setEditingProductId={setEditingProductId} deleteProduct={deleteProduct} />}
        {activeTab === "orders" && <OrdersPanel orders={orders} orderForm={orderForm} setOrderForm={setOrderForm} saveOrder={saveOrder} updateOrderStatus={updateOrderStatus} />}
        {activeTab === "blog" && <EmptyAdminSection title="Blog" />}
        {activeTab === "settings" && <EmptyAdminSection title="Paramètres" />}
      </AdminChrome>
    </AdminShell>
  );
}

function AdminShell({ children }: { children: ReactNode }) { return <main className="min-h-screen bg-background text-foreground">{children}</main>; }
function slugify(value: string) { return value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); }

function mergeCatalogWithDatabaseProducts(databaseProducts: ProductRow[]): AdminProduct[] {
  const databaseBySlug = new Map(databaseProducts.map((product) => [product.slug, product]));
  const catalogSlugs = new Set(catalog.map(slugifyProduct));
  const catalogProducts: AdminProduct[] = catalog.map((product) => {
    const slug = slugifyProduct(product);
    const savedProduct = databaseBySlug.get(slug);
    if (savedProduct) return { ...savedProduct, source: "database" };

    return {
      id: `catalog-${slug}`,
      name: product.name,
      subtitle: product.ref,
      collection: product.collection,
      price: product.price,
      notes_top: product.headNotes,
      notes_heart: product.heartNotes,
      notes_base: product.baseNotes,
      description: product.description,
      image_url: product.image,
      slug,
      in_stock: true,
      is_bestseller: false,
      created_at: null,
      updated_at: null,
      source: "catalog",
    };
  });
  const extraDatabaseProducts = databaseProducts.filter((product) => !catalogSlugs.has(product.slug)).map((product) => ({ ...product, source: "database" as const }));
  return [...catalogProducts, ...extraDatabaseProducts];
}

function ProductForm({ form, setForm, onSubmit, editing }: { form: typeof blankProduct; setForm: (form: typeof blankProduct) => void; onSubmit: (event: FormEvent) => void; editing: boolean }) {
  return <form onSubmit={onSubmit} className="rounded-lg border border-border bg-card p-6"><h2 className="mb-4 font-display text-3xl text-foreground">{editing ? "Modifier produit" : "Ajouter produit"}</h2><div className="grid gap-3">{["name", "subtitle", "collection", "slug", "image_url", "notes_top", "notes_heart", "notes_base"].map((key) => <input key={key} className="rounded-md border border-border bg-background px-4 py-3 text-sm text-foreground" placeholder={key} value={String(form[key as keyof typeof form])} onChange={(e) => setForm({ ...form, [key]: e.target.value })} required={["name", "collection"].includes(key)} />)}<input className="rounded-md border border-border bg-background px-4 py-3 text-sm text-foreground" type="number" placeholder="price" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} required /><textarea className="min-h-28 rounded-md border border-border bg-background px-4 py-3 text-sm text-foreground" placeholder="description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /><label className="flex items-center gap-2 text-sm text-muted-foreground"><input type="checkbox" checked={form.in_stock} onChange={(e) => setForm({ ...form, in_stock: e.target.checked })} /> En stock</label><label className="flex items-center gap-2 text-sm text-muted-foreground"><input type="checkbox" checked={form.is_bestseller} onChange={(e) => setForm({ ...form, is_bestseller: e.target.checked })} /> Bestseller</label><Button type="submit"><Save /> Enregistrer</Button></div></form>;
}

function OrderForm({ form, setForm, onSubmit }: { form: typeof blankOrder; setForm: (form: typeof blankOrder) => void; onSubmit: (event: FormEvent) => void }) {
  return <form onSubmit={onSubmit} className="rounded-lg border border-border bg-card p-6"><h2 className="mb-4 font-display text-3xl text-foreground">Ajouter commande</h2><div className="grid gap-3"><input className="rounded-md border border-border bg-background px-4 py-3 text-sm text-foreground" placeholder="Nom client" value={form.customer_name} onChange={(e) => setForm({ ...form, customer_name: e.target.value })} /><input className="rounded-md border border-border bg-background px-4 py-3 text-sm text-foreground" placeholder="Téléphone" value={form.customer_phone} onChange={(e) => setForm({ ...form, customer_phone: e.target.value })} /><input className="rounded-md border border-border bg-background px-4 py-3 text-sm text-foreground" placeholder="Adresse" value={form.customer_address} onChange={(e) => setForm({ ...form, customer_address: e.target.value })} /><textarea className="min-h-24 rounded-md border border-border bg-background px-4 py-3 text-sm text-foreground" placeholder="Articles, une ligne par produit" value={form.itemsText} onChange={(e) => setForm({ ...form, itemsText: e.target.value })} required /><input className="rounded-md border border-border bg-background px-4 py-3 text-sm text-foreground" type="number" placeholder="Total" value={form.total} onChange={(e) => setForm({ ...form, total: Number(e.target.value) })} required /><textarea className="min-h-20 rounded-md border border-border bg-background px-4 py-3 text-sm text-foreground" placeholder="Notes" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} /><Button type="submit"><Plus /> Ajouter</Button></div></form>;
}