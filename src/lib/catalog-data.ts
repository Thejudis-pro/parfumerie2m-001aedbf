export const collectionValues = ["all", "scentlab", "takeoff", "dubai", "pocket", "authentic", "haqqi"] as const;
export const priceValues = ["all", "under-10000", "10000-20000", "over-20000"] as const;

export type Collection = (typeof collectionValues)[number];
export type PriceRange = (typeof priceValues)[number];

export type BoutiqueProduct = {
  name: string;
  ref: string;
  inspiration?: string;
  notes: string;
  headNotes: string;
  heartNotes: string;
  baseNotes: string;
  price: number;
  collection: Collection;
  image: string;
  family: string;
  concentration: string;
  volume: string;
  description: string;
  placeholder?: boolean;
};

export const collectionFilters: { label: string; value: Collection }[] = [
  { label: "Toutes", value: "all" },
  { label: "SCENTLAB", value: "scentlab" },
  { label: "TAKEOFF FRAGANCE", value: "takeoff" },
  { label: "Dubai Perfumes", value: "dubai" },
  { label: "Pocket Perfumes", value: "pocket" },
  { label: "Authentic Perfumes", value: "authentic" },
  { label: "Haqqi", value: "haqqi" },
];

export const priceFilters: { label: string; value: PriceRange }[] = [
  { label: "< 10 000 FCFA", value: "under-10000" },
  { label: "10 000 – 20 000 FCFA", value: "10000-20000" },
  { label: "> 20 000 FCFA", value: "over-20000" },
];

export const catalog: BoutiqueProduct[] = [];

export function slugifyProduct(product: BoutiqueProduct) {
  return `${product.name}-${product.ref}`
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function findProductBySlug(slug: string) {
  return catalog.find((product) => slugifyProduct(product) === slug);
}

export function formatPrice(price: number) {
  return `${new Intl.NumberFormat("fr-FR").format(price)} FCFA`;
}

export function productOrderUrl(product: BoutiqueProduct) {
  const price = new Intl.NumberFormat("fr-FR").format(product.price);
  const message = `Bonjour 2M Parfumerie 👋 Je souhaite commander *${product.name}* — ${price} FCFA. Est-il disponible ?`;
  return `https://wa.me/221761923441?text=${encodeURIComponent(message)}`;
}

export function collectionLabel(value: Collection) {
  return collectionFilters.find((filter) => filter.value === value)?.label ?? "Collection";
}
