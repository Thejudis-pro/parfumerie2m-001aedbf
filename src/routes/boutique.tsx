import { Link, createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { SiteLayout } from "@/components/commerce/SiteLayout";
import { products, whatsappUrl } from "@/lib/perfume-data";

const collectionValues = ["all", "scentlab", "takeoff", "dubai", "pocket", "authentic", "haqqi"] as const;
const priceValues = ["all", "under-10000", "10000-20000", "over-20000"] as const;

const boutiqueSearchSchema = z.object({
  collection: fallback(z.enum(collectionValues), "all").default("all"),
  price: fallback(z.enum(priceValues), "all").default("all"),
});

export const Route = createFileRoute("/boutique")({
  validateSearch: zodValidator(boutiqueSearchSchema),
  head: () => ({
    meta: [
      { title: "Boutique — +33 Parfums Authentiques | 2M Parfumerie Dakar" },
      { name: "description", content: "Parcourez +33 parfums authentiques : SCENTLAB, TAKEOFF Fragrance, Dubai Perfumes, Haqqi et plus. Filtrez par collection. Livraison Dakar." },
      { property: "og:title", content: "Boutique — +33 Parfums Authentiques | 2M Parfumerie Dakar" },
      { property: "og:description", content: "Parcourez +33 parfums authentiques : SCENTLAB, TAKEOFF Fragrance, Dubai Perfumes, Haqqi et plus." },
    ],
  }),
  component: BoutiquePage,
});

type Collection = (typeof collectionValues)[number];
type PriceRange = (typeof priceValues)[number];

type BoutiqueProduct = {
  name: string;
  ref: string;
  notes: string;
  price: number;
  collection: Collection;
  image: string;
  placeholder?: boolean;
};

const collectionFilters: { label: string; value: Collection }[] = [
  { label: "Toutes", value: "all" },
  { label: "SCENTLAB", value: "scentlab" },
  { label: "TAKEOFF FRAGANCE", value: "takeoff" },
  { label: "Dubai Perfumes", value: "dubai" },
  { label: "Pocket Perfumes", value: "pocket" },
  { label: "Authentic Perfumes", value: "authentic" },
  { label: "Haqqi", value: "haqqi" },
];

const priceFilters: { label: string; value: PriceRange }[] = [
  { label: "< 10 000 FCFA", value: "under-10000" },
  { label: "10 000 – 20 000 FCFA", value: "10000-20000" },
  { label: "> 20 000 FCFA", value: "over-20000" },
];

const catalog: BoutiqueProduct[] = [
  { name: "Creamy Almond", ref: "Hypnotic Poison", notes: "Noix de coco · Prune · Abricot", price: 6000, collection: "scentlab", image: products[7].image },
  { name: "Fruity Gourmand", ref: "La Vie est Belle", notes: "Iris · Praline · Patchouli", price: 8000, collection: "scentlab", image: products[4].image },
  { name: "Vienna", ref: "Delina Parfums de Marly", notes: "Pivoine · Litchi · Musc", price: 12000, collection: "scentlab", image: products[4].image },
  { name: "Rosy Hazelnut", ref: "Amouage Guidance", notes: "Rose · Noisette · Ambre", price: 15000, collection: "scentlab", image: products[6].image },
  { name: "Monaco", ref: "Xerjoff 40 Knots", notes: "Bergamote · Iris · Santal", price: 18000, collection: "scentlab", image: products[3].image },
  ...Array.from({ length: 9 }, (_, index) => ({ name: `SCENTLAB ${index + 6}`, ref: "Nom à renseigner", notes: "Notes à confirmer par le client", price: 10000 + (index % 4) * 2500, collection: "scentlab" as const, image: products[index % products.length].image, placeholder: true })),
  ...Array.from({ length: 19 }, (_, index) => ({ name: `TAKEOFF ${index + 1}`, ref: "Fragrance à renseigner", notes: "Notes à confirmer par le client", price: 6000 + (index % 8) * 2000, collection: "takeoff" as const, image: products[(index + 1) % products.length].image, placeholder: true })),
  { name: "Dubai Oud Rose", ref: "Dubai Perfumes", notes: "Oud · Rose · Musc", price: 22000, collection: "dubai", image: products[2].image },
  { name: "Pocket Amber", ref: "Pocket Perfumes", notes: "Ambre · Vanille · Musc", price: 7000, collection: "pocket", image: products[0].image },
  { name: "Authentic Rouge", ref: "Authentic Perfumes", notes: "Safran · Ambre · Bois", price: 25000, collection: "authentic", image: products[1].image },
  { name: "Haqqi Signature", ref: "Haqqi", notes: "Bois précieux · Musc · Épices", price: 20000, collection: "haqqi", image: products[5].image },
];

function BoutiquePage() {
  const { collection, price } = Route.useSearch();
  const [visibleCount, setVisibleCount] = useState(12);

  const filteredProducts = useMemo(() => {
    return catalog.filter((product) => {
      const collectionMatch = collection === "all" || product.collection === collection;
      const priceMatch = price === "all" || (price === "under-10000" && product.price < 10000) || (price === "10000-20000" && product.price >= 10000 && product.price <= 20000) || (price === "over-20000" && product.price > 20000);
      return collectionMatch && priceMatch;
    });
  }, [collection, price]);

  const visibleProducts = filteredProducts.slice(0, visibleCount);

  return (
    <SiteLayout>
      <section className="border-b border-border bg-surface pt-24 pb-16 md:pt-32">
        <div className="section-shell text-center">
          <p className="caption-luxe text-accent">Toutes les collections</p>
          <h1 className="mt-4 font-display text-4xl font-semibold text-foreground md:text-[56px]">La Boutique</h1>
          <p className="mt-4 text-muted-foreground">+33 fragrances authentiques. Trouvez celle qui vous ressemble.</p>
        </div>
      </section>

      <section className="sticky top-[65px] z-40 border-b border-border bg-background py-8">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-3 px-6">
          {collectionFilters.map((filter) => (
            <FilterLink key={filter.value} active={collection === filter.value} search={{ collection: filter.value, price }} label={filter.label} />
          ))}
          <span className="mx-2 hidden h-10 w-px bg-border md:block" aria-hidden="true" />
          {priceFilters.map((filter) => (
            <FilterLink key={filter.value} active={price === filter.value} search={{ collection, price: filter.value }} label={filter.label} />
          ))}
        </div>
      </section>

      <section className="bg-background py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {visibleProducts.map((product, index) => (
              <CatalogCard key={`${product.collection}-${product.name}-${index}`} product={product} index={index} />
            ))}
          </div>
          {visibleCount < filteredProducts.length && (
            <div className="mt-12 text-center">
              <Button variant="outline" size="lg" onClick={() => setVisibleCount((count) => count + 12)}>Load More</Button>
            </div>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}

function FilterLink({ active, search, label }: { active: boolean; search: { collection: Collection; price: PriceRange }; label: string }) {
  return (
    <Link to="/boutique" search={search} className={active ? "rounded-full border border-accent bg-accent px-4 py-2 text-[13px] font-semibold text-primary-foreground" : "rounded-full border border-border bg-transparent px-4 py-2 text-[13px] text-muted-foreground hover:border-accent hover:text-foreground"}>
      {label}
    </Link>
  );
}

function CatalogCard({ product, index }: { product: BoutiqueProduct; index: number }) {
  const collectionLabel = collectionFilters.find((filter) => filter.value === product.collection)?.label ?? "Collection";
  return (
    <article data-collection={product.collection} className="fade-up group overflow-hidden rounded-lg border border-border bg-card shadow-card transition-all hover:-translate-y-1.5 hover:border-accent" style={{ animationDelay: `${index * 80}ms` }}>
      <div className="image-zoom relative aspect-square overflow-hidden bg-surface">
        <span className="absolute left-3 top-3 z-10 rounded-full bg-surface px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">{collectionLabel}</span>
        {product.placeholder && <span className="absolute right-3 top-3 z-10 rounded-full bg-accent-muted px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-accent">À renseigner</span>}
        <img src={product.image} alt={`${product.name} — ${collectionLabel}`} className="h-full w-full object-cover" loading="lazy" />
      </div>
      <div className="p-5">
        <p className="mb-1 text-[11px] uppercase tracking-[0.1em] text-muted-foreground">{product.ref}</p>
        <h3 className="mb-1 font-display text-[22px] text-foreground">{product.name}</h3>
        <p className="mb-4 text-xs italic text-muted-foreground">{product.notes}</p>
        <div className="flex items-center justify-between gap-3">
          <p className="font-body text-xl font-semibold text-accent">{formatPrice(product.price)}</p>
          <Button asChild size="sm">
            <a href={whatsappUrl(`Bonjour 2M Parfumerie, je souhaite commander ${product.name} (${collectionLabel}) à ${formatPrice(product.price)}.`)} target="_blank" rel="noreferrer">Commander</a>
          </Button>
        </div>
      </div>
    </article>
  );
}

function formatPrice(price: number) {
  return `${new Intl.NumberFormat("fr-FR").format(price)} FCFA`;
}