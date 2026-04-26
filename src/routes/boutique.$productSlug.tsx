import { Link, createFileRoute } from "@tanstack/react-router";
import { Phone } from "lucide-react";
import { useMemo } from "react";

import { Button } from "@/components/ui/button";
import { AddToCartButton } from "@/components/commerce/AddToCartButton";
import { SiteLayout } from "@/components/commerce/SiteLayout";
import { catalog, collectionLabel, findProductBySlug, formatPrice, slugifyProduct, type BoutiqueProduct } from "@/lib/catalog-data";
import { displayPhone } from "@/lib/perfume-data";

export const Route = createFileRoute("/boutique/$productSlug")({
  head: ({ params }) => {
    const product = findProductBySlug(params.productSlug);
    const title = product ? `${product.name} — ${collectionLabel(product.collection)} | 2M Parfumerie` : "Parfum introuvable | 2M Parfumerie";
    const description = product ? `${product.name}, ${collectionLabel(product.collection)}, ${product.notes}. ${formatPrice(product.price)}. Livraison partout au Sénégal.` : "Ce parfum n'est pas disponible dans la boutique 2M Parfumerie.";
    return { meta: [{ title }, { name: "description", content: description }, { property: "og:title", content: title }, { property: "og:description", content: description }] };
  },
  component: ProductPage,
});

function ProductPage() {
  const { productSlug } = Route.useParams();
  const product = findProductBySlug(productSlug);

  if (!product) {
    return (
      <SiteLayout>
        <section className="section-shell py-40 text-center">
          <p className="caption-luxe text-accent">Boutique</p>
          <h1 className="mt-4 font-display text-4xl text-foreground">Parfum introuvable</h1>
          <p className="mx-auto mt-4 max-w-md text-muted-foreground">Cette référence n’est pas encore disponible dans la boutique en ligne.</p>
          <Button asChild variant="outline" size="lg" className="mt-8"><Link to="/boutique" search={{ collection: "all", price: "all" }}>Retour à la boutique</Link></Button>
        </section>
      </SiteLayout>
    );
  }

  return <ProductTemplate product={product} />;
}

function ProductTemplate({ product }: { product: BoutiqueProduct }) {
  const label = collectionLabel(product.collection);
  const similar = catalog.filter((item) => item.collection === product.collection && slugifyProduct(item) !== slugifyProduct(product)).slice(0, 4);

  return (
    <SiteLayout>
      <section className="bg-background pt-24 pb-12 md:pt-32 md:pb-16">
        <div className="section-shell grid gap-8 md:grid-cols-2 md:gap-16">
          <div className="order-1">
            <div className="mx-auto flex aspect-square max-w-lg items-center justify-center overflow-hidden rounded-xl bg-surface p-5 shadow-card md:p-8">
              <img src={product.image} alt={`${product.name} chez 2M Parfumerie`} className="h-full w-full rounded-lg object-contain" />
            </div>
          </div>

          <aside className="order-2 md:sticky md:top-24 md:self-start">
            <span className="caption-luxe mb-4 inline-block rounded-full bg-accent-muted px-3 py-1 text-accent">{label}</span>
            <h1 className="font-display text-4xl font-medium leading-tight text-foreground md:text-5xl">{product.name}</h1>
            <p className="mt-3 text-sm italic text-muted-foreground">Inspiré de {product.ref}{product.inspiration ? ` · ${product.inspiration}` : ""}</p>
            <p className="mt-6 font-body text-[32px] font-bold text-accent">{formatPrice(product.price)}</p>
            <p className="mt-2 text-[13px] text-whatsapp">✓ En stock — Livraison partout au Sénégal</p>

            <div className="mt-8"><AddToCartButton item={{ id: slugifyProduct(product), name: product.name, collection: label, price: product.price, imageUrl: product.image }} /></div>
            <a href="tel:+221761923441" className="mt-3 flex min-h-11 items-center justify-center gap-2 text-center text-[13px] text-muted-foreground hover:text-accent"><Phone className="size-4" aria-hidden="true" /> Ou appeler : {displayPhone}</a>

            <div className="my-8 h-px bg-border" />
            <div>
              <h2 className="mb-4 font-display text-xl text-foreground">Composition</h2>
              {[
                ["🌸", "Notes de tête", product.headNotes],
                ["💐", "Notes de cœur", product.heartNotes],
                ["🌿", "Notes de fond", product.baseNotes],
              ].map(([icon, title, notes]) => (
                <div key={title} className="flex gap-3 border-b border-border py-2 text-sm text-muted-foreground last:border-0"><span aria-hidden="true">{icon}</span><p><strong className="text-foreground">{title}:</strong> {notes}</p></div>
              ))}
            </div>

            <div className="mt-8 grid grid-cols-1 gap-3 min-[380px]:grid-cols-3">
              {[['Contenance', product.volume], ['Concentration', product.concentration], ['Famille', product.family]].map(([title, value]) => (
                <div key={title} className="rounded-md bg-surface p-4 text-center"><p className="caption-luxe text-muted-foreground">{title}</p><p className="mt-2 text-xs text-foreground">{value}</p></div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-surface-alt py-12 md:py-16">
        <div className="section-shell mx-auto max-w-3xl">
          <h2 className="mb-6 font-display text-[32px] text-foreground md:text-5xl">À propos de ce parfum</h2>
          <p className="text-base leading-[1.9] text-muted-foreground">{product.description}</p>
        </div>
      </section>

      <section className="bg-background py-16 md:py-20">
        <div className="section-shell">
          <h2 className="mb-12 text-center font-display text-[32px] text-foreground md:text-5xl">De la même collection</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {similar.map((item) => <SimilarCard key={slugifyProduct(item)} product={item} />)}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function SimilarCard({ product }: { product: BoutiqueProduct }) {
  const label = collectionLabel(product.collection);
  return (
    <article className="overflow-hidden rounded-lg border border-border bg-card shadow-card transition-all hover:-translate-y-1.5 hover:border-accent">
      <Link to="/boutique/$productSlug" params={{ productSlug: slugifyProduct(product) }} search={{ collection: "all", price: "all" }} className="image-zoom block aspect-square overflow-hidden bg-surface">
        <img src={product.image} alt={`${product.name} chez 2M Parfumerie`} className="h-full w-full object-contain p-5 transition-transform duration-500 hover:scale-105" loading="lazy" />
      </Link>
      <div className="p-5">
        <p className="mb-1 text-[11px] uppercase tracking-[0.1em] text-muted-foreground">{product.ref}</p>
        <Link to="/boutique/$productSlug" params={{ productSlug: slugifyProduct(product) }} search={{ collection: "all", price: "all" }} className="font-display text-[22px] text-foreground hover:text-accent">{product.name}</Link>
        <p className="mt-4 font-body text-xl font-semibold text-accent">{formatPrice(product.price)}</p>
        <div className="mt-4"><AddToCartButton item={{ id: slugifyProduct(product), name: product.name, collection: label, price: product.price, imageUrl: product.image }} /></div>
      </div>
    </article>
  );
}