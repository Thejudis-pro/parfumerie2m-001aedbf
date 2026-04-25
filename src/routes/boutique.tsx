import { Link, createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { SiteLayout } from "@/components/commerce/SiteLayout";
import { whatsappUrl } from "@/lib/perfume-data";
import { catalog, collectionFilters, collectionLabel, collectionValues, formatPrice, priceFilters, priceValues, slugifyProduct, type BoutiqueProduct, type Collection, type PriceRange } from "@/lib/catalog-data";

function validateBoutiqueSearch(search: Record<string, unknown>) {
  const collection = collectionValues.includes(search.collection as Collection) ? (search.collection as Collection) : "all";
  const price = priceValues.includes(search.price as PriceRange) ? (search.price as PriceRange) : "all";

  return { collection, price };
}

export const Route = createFileRoute("/boutique")({
  validateSearch: validateBoutiqueSearch,
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
  const label = collectionLabel(product.collection);
  return (
    <article data-collection={product.collection} className="fade-up group overflow-hidden rounded-lg border border-border bg-card shadow-card transition-all hover:-translate-y-1.5 hover:border-accent" style={{ animationDelay: `${index * 80}ms` }}>
      <div className="image-zoom relative aspect-square overflow-hidden bg-surface">
        <span className="absolute left-3 top-3 z-10 rounded-full bg-surface px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">{label}</span>
        {product.placeholder && <span className="absolute right-3 top-3 z-10 rounded-full bg-accent-muted px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-accent">À renseigner</span>}
        <Link to="/boutique/$productSlug" params={{ productSlug: slugifyProduct(product) }} aria-label={`Voir ${product.name}`}>
          <img src={product.image} alt={`${product.name} — ${label}`} className="h-full w-full object-cover" loading="lazy" />
        </Link>
      </div>
      <div className="p-5">
        <p className="mb-1 text-[11px] uppercase tracking-[0.1em] text-muted-foreground">{product.ref}</p>
        <Link to="/boutique/$productSlug" params={{ productSlug: slugifyProduct(product) }} className="mb-1 block font-display text-[22px] text-foreground hover:text-accent">{product.name}</Link>
        <p className="mb-4 text-xs italic text-muted-foreground">{product.notes}</p>
        <div className="flex items-center justify-between gap-3">
          <p className="font-body text-xl font-semibold text-accent">{formatPrice(product.price)}</p>
          <Button asChild size="sm">
            <a href={whatsappUrl(`Bonjour 2M Parfumerie, je souhaite commander ${product.name} (${label}) à ${formatPrice(product.price)}.`)} target="_blank" rel="noreferrer">Commander</a>
          </Button>
        </div>
      </div>
    </article>
  );
}
