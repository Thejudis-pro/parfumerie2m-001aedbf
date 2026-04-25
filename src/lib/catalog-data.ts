import { products } from "@/lib/perfume-data";

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

export const catalog: BoutiqueProduct[] = [
  {
    name: "Creamy Almond",
    ref: "Hypnotic Poison",
    inspiration: "Dior",
    notes: "Noix de coco · Prune · Abricot",
    headNotes: "Noix de coco · Prune · Abricot",
    heartNotes: "Iris · Jasmin · Fève tonka",
    baseNotes: "Vanille · Patchouli · Musc blanc",
    price: 6000,
    collection: "scentlab",
    image: products[7].image,
    family: "Oriental gourmand",
    concentration: "Eau de parfum",
    volume: "50 ml",
    description:
      "Creamy Almond enveloppe la peau d’une douceur amandée, lactée et sensuelle. Inspiré de Hypnotic Poison, ce parfum associe une ouverture fruitée à un cœur floral crémeux, puis s’installe sur une vanille chaude et un musc blanc confortable. C’est une signature intime, féminine et mémorable, parfaite pour les soirées, les rendez-vous et les moments où votre présence doit rester dans l’air après votre départ.",
  },
  { name: "Fruity Gourmand", ref: "La Vie est Belle", notes: "Iris · Praline · Patchouli", headNotes: "Poire · Cassis · Accord fruité", heartNotes: "Iris · Jasmin · Fleur d’oranger", baseNotes: "Praline · Vanille · Patchouli", price: 8000, collection: "scentlab", image: products[4].image, family: "Floral gourmand", concentration: "Eau de parfum", volume: "50 ml", description: "Une fragrance lumineuse et gourmande, construite pour celles qui aiment les sillages joyeux, féminins et très remarqués." },
  { name: "Vienna", ref: "Delina Parfums de Marly", notes: "Pivoine · Litchi · Musc", headNotes: "Litchi · Rhubarbe · Bergamote", heartNotes: "Pivoine · Rose turque · Vanille", baseNotes: "Musc blanc · Cachemire · Encens doux", price: 12000, collection: "scentlab", image: products[4].image, family: "Floral fruité", concentration: "Eau de parfum", volume: "50 ml", description: "Vienna offre un floral frais et élégant, avec une féminité moderne, propre et très facile à porter à Dakar." },
  { name: "Rosy Hazelnut", ref: "Amouage Guidance", notes: "Rose · Noisette · Ambre", headNotes: "Poire · Noisette · Encens", heartNotes: "Rose · Jasmin · Safran", baseNotes: "Ambre · Vanille · Bois de santal", price: 15000, collection: "scentlab", image: products[6].image, family: "Floral ambré", concentration: "Eau de parfum", volume: "50 ml", description: "Un parfum riche, velouté et enveloppant, idéal pour les amateurs de signatures raffinées et chaleureuses." },
  { name: "Monaco", ref: "Xerjoff 40 Knots", notes: "Bergamote · Iris · Santal", headNotes: "Bergamote · Accord marin · Herbes fraîches", heartNotes: "Iris · Bois sec · Sel minéral", baseNotes: "Santal · Ambre gris · Musc", price: 18000, collection: "scentlab", image: products[3].image, family: "Boisé aromatique", concentration: "Eau de parfum", volume: "50 ml", description: "Monaco évoque une élégance nette, marine et sophistiquée, pensée pour une présence fraîche mais affirmée." },
  ...Array.from({ length: 9 }, (_, index) => ({ name: `SCENTLAB ${index + 6}`, ref: "Nom à renseigner", notes: "Notes à confirmer par le client", headNotes: "Notes à renseigner", heartNotes: "Notes à renseigner", baseNotes: "Notes à renseigner", price: 10000 + (index % 4) * 2500, collection: "scentlab" as const, image: products[index % products.length].image, family: "Famille à renseigner", concentration: "Eau de parfum", volume: "50 ml", description: "Description à compléter par le client pour présenter l’identité, le sillage et le moment idéal de ce parfum.", placeholder: true })),
  ...Array.from({ length: 19 }, (_, index) => ({ name: `TAKEOFF ${index + 1}`, ref: "Fragrance à renseigner", notes: "Notes à confirmer par le client", headNotes: "Notes à renseigner", heartNotes: "Notes à renseigner", baseNotes: "Notes à renseigner", price: 6000 + (index % 8) * 2000, collection: "takeoff" as const, image: products[(index + 1) % products.length].image, family: "Signature & audace", concentration: "Eau de parfum", volume: "50 ml", description: "Description à compléter par le client pour préciser le caractère de cette référence TAKEOFF Fragrance.", placeholder: true })),
  { name: "Dubai Oud Rose", ref: "Dubai Perfumes", notes: "Oud · Rose · Musc", headNotes: "Safran · Épices chaudes", heartNotes: "Rose · Oud · Résines", baseNotes: "Musc · Ambre · Bois précieux", price: 22000, collection: "dubai", image: products[2].image, family: "Oriental boisé", concentration: "Extrait de parfum", volume: "50 ml", description: "Une interprétation orientale profonde, faite pour les amateurs d’oud, de rose et de sillages puissants." },
  { name: "Pocket Amber", ref: "Pocket Perfumes", notes: "Ambre · Vanille · Musc", headNotes: "Bergamote · Accord propre", heartNotes: "Ambre · Vanille douce", baseNotes: "Musc · Bois blond", price: 7000, collection: "pocket", image: products[0].image, family: "Ambré musqué", concentration: "Eau de parfum", volume: "30 ml", description: "Un format nomade chaleureux, pratique à garder avec soi pour raviver son sillage dans la journée." },
  { name: "Authentic Rouge", ref: "Authentic Perfumes", notes: "Safran · Ambre · Bois", headNotes: "Safran · Jasmin", heartNotes: "Ambre · Résine", baseNotes: "Cèdre · Sapin · Musc", price: 25000, collection: "authentic", image: products[1].image, family: "Ambré boisé", concentration: "Eau de parfum", volume: "50 ml", description: "Une signature luxueuse, dense et immédiatement reconnaissable, sélectionnée pour les clients qui veulent un parfum certifié et sans compromis." },
  { name: "Haqqi Signature", ref: "Haqqi", notes: "Bois précieux · Musc · Épices", headNotes: "Poivre rose · Encens", heartNotes: "Bois précieux · Accord sec", baseNotes: "Musc · Ambre · Épices", price: 20000, collection: "haqqi", image: products[5].image, family: "Boisé épicé", concentration: "Eau de parfum", volume: "50 ml", description: "Une sélection premium au caractère vrai, sobre et persistant, conçue pour une élégance calme." },
];

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

export function collectionLabel(value: Collection) {
  return collectionFilters.find((filter) => filter.value === value)?.label ?? "Collection";
}