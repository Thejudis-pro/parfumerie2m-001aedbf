import { Link, Outlet, createFileRoute, useLocation } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { AddToCartButton } from "@/components/commerce/AddToCartButton";
import { SiteLayout } from "@/components/commerce/SiteLayout";
import {
  collectionFilters,
  collectionLabel,
  formatPrice,
  normalizeCollectionValue,
  slugifyProduct,
  type BoutiqueProduct,
  type Collection,
} from "@/lib/catalog-data";
import { supabase } from "@/integrations/supabase/client";
import { mergeLiveCatalog } from "@/lib/live-catalog";

function validateBoutiqueSearch(search: Record<string, unknown>) {
  const collection =
    typeof search.collection === "string" && search.collection.trim()
      ? normalizeCollectionValue(search.collection)
      : "all";

  return { collection };
}

export const Route = createFileRoute("/boutique")({
  validateSearch: validateBoutiqueSearch,
  head: () => ({
    meta: [
      { title: "Boutique — +100 Parfums Authentiques | 2M Parfumerie Sénégal" },
      {
        name: "description",
        content:
          "Parcourez +100 parfums authentiques : SCENTLAB, TAKEOFF Fragrance, Dubai Perfumes, Haqqi et plus. Filtrez par collection. Livraison partout au Sénégal.",
      },
      {
        property: "og:title",
        content: "Boutique — +100 Parfums Authentiques | 2M Parfumerie Sénégal",
      },
      {
        property: "og:description",
        content:
          "Parcourez +100 parfums authentiques : SCENTLAB, TAKEOFF Fragrance, Dubai Perfumes, Haqqi et plus.",
      },
    ],
  }),
  component: BoutiquePage,
});

function BoutiquePage() {
  const location = useLocation();
  const { collection } = Route.useSearch();
  const [visibleCount, setVisibleCount] = useState(12);
  const [products, setProducts] = useState<BoutiqueProduct[]>([]);

  useEffect(() => {
    setVisibleCount(12);
  }, [collection]);

  useEffect(() => {
    void loadProducts();
  }, []);

  const loadProducts = async () => {
    const { data } = await supabase.from("products").select("*");
    setProducts(mergeLiveCatalog(data ?? []));
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const collectionMatch = collection === "all" || product.collection === collection;
      return collectionMatch;
    });
  }, [products, collection]);

  const visibleProducts = filteredProducts.slice(0, visibleCount);

  if (location.pathname !== "/boutique") {
    return <Outlet />;
  }

  return (
    <SiteLayout>
      <section className="border-b border-border bg-surface pt-24 pb-12 md:pt-32 md:pb-16">
        <div className="section-shell text-center">
          <p className="caption-luxe text-accent">Toutes les collections</p>
          <h1 className="mt-4 font-display text-4xl font-semibold text-foreground md:text-[56px]">
            La Boutique
          </h1>
          <p className="mt-4 text-muted-foreground">
            +100 fragrances authentiques. Trouvez celle qui vous ressemble.
          </p>
        </div>
      </section>

      <section className="border-b border-border bg-background py-5 md:py-8">
        <div className="mx-auto flex max-w-7xl snap-x gap-2 overflow-x-auto px-3 pb-1 md:flex-wrap md:justify-center md:gap-3 md:px-6">
          {collectionFilters.map((filter) => (
            <FilterLink
              key={filter.value}
              active={collection === filter.value}
              search={{ collection: filter.value }}
              label={filter.label}
            />
          ))}
        </div>
      </section>

      <section className="bg-background py-8 md:py-12">
        <div className="mx-auto max-w-7xl px-3 md:px-6">
          <div className="mb-4 flex items-center justify-between gap-3 text-sm text-muted-foreground">
            <p>
              {filteredProducts.length} résultat{filteredProducts.length > 1 ? "s" : ""}
              {collection !== "all" ? " filtré(s)" : ""}
            </p>
            {collection !== "all" && (
              <Link
                to="/boutique"
                search={{ collection: "all" }}
                className="font-medium text-accent hover:underline"
              >
                Réinitialiser les filtres
              </Link>
            )}
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {visibleProducts.map((product, index) => (
              <CatalogCard
                key={`${product.collection}-${product.name}-${index}`}
                product={product}
                index={index}
              />
            ))}
          </div>
          {visibleProducts.length === 0 && (
            <div className="rounded-lg border border-dashed border-border bg-surface px-6 py-12 text-center text-muted-foreground">
              Aucun produit ne correspond à cette collection.
            </div>
          )}
          {visibleCount < filteredProducts.length && (
            <div className="mt-12 text-center">
              <Button
                variant="outline"
                size="lg"
                onClick={() => setVisibleCount((count) => count + 12)}
              >
                Load More
              </Button>
            </div>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}

function FilterLink({
  active,
  search,
  label,
}: {
  active: boolean;
  search: { collection: Collection; price: PriceRange };
  label: string;
}) {
  return (
    <Link
      to="/boutique"
      search={search}
      className={
        active
          ? "snap-start whitespace-nowrap rounded-full border border-accent bg-accent px-4 py-2 text-[13px] font-semibold text-primary-foreground"
          : "snap-start whitespace-nowrap rounded-full border border-border bg-transparent px-4 py-2 text-[13px] text-muted-foreground hover:border-accent hover:text-foreground"
      }
    >
      {label}
    </Link>
  );
}

function CatalogCard({ product, index }: { product: BoutiqueProduct; index: number }) {
  const label = collectionLabel(product.collection);
  return (
    <article
      data-collection={product.collection}
      className="fade-up group overflow-hidden rounded-lg border border-border bg-card shadow-card transition-all hover:-translate-y-1.5 hover:border-accent"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="image-zoom relative aspect-square overflow-hidden bg-surface">
        <span className="absolute left-3 top-3 z-10 rounded-full bg-surface px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
          {label}
        </span>
        {product.placeholder && (
          <span className="absolute right-3 top-3 z-10 rounded-full bg-accent-muted px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-accent">
            À renseigner
          </span>
        )}
        <Link
          to="/boutique/$productSlug"
          params={{ productSlug: slugifyProduct(product) }}
          search={{ collection: "all", price: "all" }}
          aria-label={`Voir ${product.name}`}
          className="block h-full w-full"
        >
          <img
            src={product.image}
            alt={`${product.name} chez 2M Parfumerie`}
            className="h-full w-full object-contain p-5 transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </Link>
      </div>
      <div className="p-5">
        <p className="mb-1 text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
          {product.ref}
        </p>
        <Link
          to="/boutique/$productSlug"
          params={{ productSlug: slugifyProduct(product) }}
          search={{ collection: "all", price: "all" }}
          className="mb-1 block font-display text-[22px] text-foreground hover:text-accent"
        >
          {product.name}
        </Link>
        <p className="mb-4 text-xs italic text-muted-foreground">{product.notes}</p>
        <p className="mb-4 font-body text-xl font-semibold text-accent">
          {formatPrice(product.price)}
        </p>
        <AddToCartButton
          item={{
            id: slugifyProduct(product),
            name: product.name,
            collection: label,
            price: product.price,
            imageUrl: product.image,
          }}
        />
      </div>
    </article>
  );
}
