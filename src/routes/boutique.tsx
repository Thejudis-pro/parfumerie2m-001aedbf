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
import pocketHommeImage from "@/assets/pocket-perfumes-homme.png";
import pocketFemmeImage from "@/assets/pocket-perfumes-femme.png";

function validateBoutiqueSearch(search: Record<string, unknown>) {
  const collection =
    typeof search.collection === "string" && search.collection.trim()
      ? normalizeCollectionValue(search.collection)
      : "all";

  return { collection };
}

const mixedCollectionOrder: Collection[] = [
  "takeoff",
  "scentlab",
  "dubai",
  "pocket",
  "authentic",
  "haqqi",
];

function mixProductsByCollection(products: BoutiqueProduct[]) {
  const groupedProducts = mixedCollectionOrder.map((collection) =>
    products.filter((product) => product.collection === collection),
  );
  const maxGroupLength = Math.max(0, ...groupedProducts.map((group) => group.length));

  return Array.from({ length: maxGroupLength }).flatMap((_, index) =>
    groupedProducts.flatMap((group) => (group[index] ? [group[index]] : [])),
  );
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

  const mixedProducts = useMemo(() => mixProductsByCollection(products), [products]);

  const filteredProducts = useMemo(() => {
    return mixedProducts.filter((product) => {
      const collectionMatch = collection === "all" || product.collection === collection;
      return collectionMatch;
    });
  }, [mixedProducts, collection]);

  const visibleProducts = filteredProducts.slice(0, visibleCount);

  const isPocketShowcase = collection === "pocket";

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
        <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-2 px-3 pb-1 md:gap-3 md:px-6">
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
          {isPocketShowcase ? (
            <PocketShowcase />
          ) : (
            <>
          {collection === "haqqi" && (
            <div className="mb-8 overflow-hidden rounded-lg border border-border bg-card shadow-card">
              <video
                src="/videos/haqqi.mp4"
                autoPlay
                loop
                muted
                playsInline
                controls
                className="h-full w-full object-cover"
              />
            </div>
          )}
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
            </>
          )}
        </div>
      </section>

      {(collection === "haqqi" || collection === "scentlab") && (
      <section className="border-t border-border bg-surface-alt py-10 md:py-14">
        <div className="mx-auto max-w-7xl px-3 text-center md:px-6">
          <p className="caption-luxe text-accent">Compose ton pack</p>
          <h2 className="mt-2 font-display text-2xl text-foreground md:text-3xl">
            {collection === "haqqi"
              ? "Crée ton pack Haqqi ici"
              : "Crée ton pack SCENTLAB ici"}
          </h2>
          <div className="mt-5 flex flex-col flex-wrap items-center justify-center gap-3 sm:flex-row">
            {collection === "haqqi" && (
              <Button
                asChild
                size="lg"
                className="bg-accent text-primary-foreground shadow-elegant ring-2 ring-accent/40 ring-offset-2 ring-offset-surface-alt animate-pulse hover:bg-accent/90"
              >
                <Link to="/coffret-signature">Pack Haqqi (3 parfums) — 10 000 FCFA</Link>
              </Button>
            )}
            {collection === "scentlab" && (
              <Button
                asChild
                size="lg"
                className="bg-accent text-primary-foreground shadow-elegant ring-2 ring-accent/40 ring-offset-2 ring-offset-surface-alt animate-pulse hover:bg-accent/90"
              >
                <Link to="/coffret-signature">Pack SCENTLAB (3 parfums) — 15 000 FCFA</Link>
              </Button>
            )}
          </div>
        </div>
      </section>
      )}
    </SiteLayout>
  );
}

function FilterLink({
  active,
  search,
  label,
}: {
  active: boolean;
  search: { collection: Collection };
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
          search={{ collection: "all" }}
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
        {product.collection !== "dubai" && product.collection !== "authentic" && product.ref && (
          <p className="mb-1 text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
            {product.ref}
          </p>
        )}
        <Link
          to="/boutique/$productSlug"
          params={{ productSlug: slugifyProduct(product) }}
          search={{ collection: "all" }}
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

function PocketShowcase() {
  return (
    <div className="space-y-8">
      <div className="overflow-hidden rounded-lg border border-border bg-card shadow-card">
        <video
          src="/videos/pocket-perfumes.mp4"
          autoPlay
          loop
          muted
          playsInline
          controls
          className="h-full w-full object-cover"
        />
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="overflow-hidden rounded-lg border border-border bg-surface shadow-card">
          <img
            src={pocketHommeImage}
            alt="Parfums de poches Homme — 2M Parfumerie"
            className="h-full w-full object-contain p-6"
            loading="lazy"
          />
        </div>
        <div className="overflow-hidden rounded-lg border border-border bg-surface shadow-card">
          <img
            src={pocketFemmeImage}
            alt="Parfums de poches Femme — 2M Parfumerie"
            className="h-full w-full object-contain p-6"
            loading="lazy"
          />
        </div>
      </div>
      <div className="rounded-lg border border-border bg-surface-alt px-6 py-10 text-center">
        <p className="caption-luxe text-accent">Compose ton pack</p>
        <h2 className="mt-2 font-display text-2xl text-foreground md:text-3xl">
          Crée ton pack Parfums de poches ici
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
          Sélectionne 5 parfums de poches et compose ton pack signature.
        </p>
        <div className="mt-6 flex justify-center">
          <Button
            asChild
            size="lg"
            className="bg-accent text-primary-foreground shadow-elegant ring-2 ring-accent/40 ring-offset-2 ring-offset-surface-alt animate-pulse hover:bg-accent/90"
          >
            <Link to="/coffret-signature">Pack Parfums de poches (5 parfums) — 10 000 FCFA</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
