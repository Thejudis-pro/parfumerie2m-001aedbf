import { products } from "@/lib/perfume-data";
import creamyAlmondImage from "@/assets/scentlab-creamy-almond.png";
import fruityGourmandImage from "@/assets/scentlab-fruity-gourmand.png";
import spicyCaramelImage from "@/assets/scentlab-spicy-caramel.png";
import spicyLeatherImage from "@/assets/scentlab-spicy-leather.png";
import rosyHazelnutImage from "@/assets/scentlab-rosy-hazelnut.png";
import orientalOudImage from "@/assets/scentlab-oriental-oud.png";
import vanillaDreamImage from "@/assets/scentlab-vanilla-dream.png";
import savannaVetiverImage from "@/assets/scentlab-savanna-vetiver.png";
import cognacWhisperImage from "@/assets/scentlab-cognac-whisper.png";
import rosyGlowImage from "@/assets/scentlab-rosy-glow.png";

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
    image: creamyAlmondImage,
    family: "Oriental gourmand",
    concentration: "Eau de parfum",
    volume: "50 ml",
    description:
      "Creamy Almond enveloppe la peau d’une douceur amandée, lactée et sensuelle. Inspiré de Hypnotic Poison, ce parfum associe une ouverture fruitée à un cœur floral crémeux, puis s’installe sur une vanille chaude et un musc blanc confortable. C’est une signature intime, féminine et mémorable, parfaite pour les soirées, les rendez-vous et les moments où votre présence doit rester dans l’air après votre départ.",
  },
  { name: "Fruity Gourmand", ref: "La Vie est Belle", notes: "Iris · Praline · Patchouli", headNotes: "Poire · Cassis · Accord fruité", heartNotes: "Iris · Jasmin · Fleur d’oranger", baseNotes: "Praline · Vanille · Patchouli", price: 8000, collection: "scentlab", image: fruityGourmandImage, family: "Floral gourmand", concentration: "Eau de parfum", volume: "50 ml", description: "Une fragrance lumineuse et gourmande, construite pour celles qui aiment les sillages joyeux, féminins et très remarqués." },
  { name: "Vienna", ref: "Delina Parfums de Marly", notes: "Pivoine · Litchi · Musc", headNotes: "Litchi · Rhubarbe · Bergamote", heartNotes: "Pivoine · Rose turque · Vanille", baseNotes: "Musc blanc · Cachemire · Encens doux", price: 12000, collection: "scentlab", image: products[4].image, family: "Floral fruité", concentration: "Eau de parfum", volume: "50 ml", description: "Vienna offre un floral frais et élégant, avec une féminité moderne, propre et très facile à porter à Dakar." },
  { name: "Rosy Hazelnut", ref: "Amouage Guidance", notes: "Rose · Noisette · Ambre", headNotes: "Poire · Noisette · Encens", heartNotes: "Rose · Jasmin · Safran", baseNotes: "Ambre · Vanille · Bois de santal", price: 15000, collection: "scentlab", image: rosyHazelnutImage, family: "Floral ambré", concentration: "Eau de parfum", volume: "50 ml", description: "Un parfum riche, velouté et enveloppant, idéal pour les amateurs de signatures raffinées et chaleureuses." },
  { name: "Monaco", ref: "Xerjoff 40 Knots", notes: "Bergamote · Iris · Santal", headNotes: "Bergamote · Accord marin · Herbes fraîches", heartNotes: "Iris · Bois sec · Sel minéral", baseNotes: "Santal · Ambre gris · Musc", price: 18000, collection: "scentlab", image: products[3].image, family: "Boisé aromatique", concentration: "Eau de parfum", volume: "50 ml", description: "Monaco évoque une élégance nette, marine et sophistiquée, pensée pour une présence fraîche mais affirmée." },
  { name: "Spicy Caramel", ref: "SCENTLAB", notes: "Caramel · Épices · Bois ambrés", headNotes: "Poivre rose · Bergamote · Cannelle", heartNotes: "Caramel · Fève tonka · Accord gourmand", baseNotes: "Ambre · Bois secs · Musc", price: 10000, collection: "scentlab", image: spicyCaramelImage, family: "Gourmand épicé", concentration: "Eau de parfum", volume: "50 ml", description: "Spicy Caramel associe une douceur caramélisée à des épices chaudes pour une signature profonde, moderne et addictive." },
  { name: "Spicy Leather", ref: "SCENTLAB", notes: "Cuir · Épices · Ambre", headNotes: "Safran · Poivre noir · Bergamote", heartNotes: "Cuir · Encens · Résines", baseNotes: "Ambre · Patchouli · Bois fumés", price: 10000, collection: "scentlab", image: spicyLeatherImage, family: "Cuir épicé", concentration: "Eau de parfum", volume: "50 ml", description: "Une fragrance cuirée et affirmée, pensée pour les amateurs de sillages chauds, élégants et puissants." },
  { name: "Oriental Oud", ref: "SCENTLAB", notes: "Oud · Résines · Ambre", headNotes: "Safran · Épices orientales", heartNotes: "Oud · Rose sombre · Encens", baseNotes: "Ambre · Bois précieux · Musc", price: 12000, collection: "scentlab", image: orientalOudImage, family: "Oriental boisé", concentration: "Eau de parfum", volume: "50 ml", description: "Oriental Oud livre une présence noble et enveloppante, entre bois précieux, ambre chaud et profondeur orientale." },
  { name: "Vanilla Dream", ref: "SCENTLAB", notes: "Vanille · Ambre · Musc", headNotes: "Bergamote · Sucre blond", heartNotes: "Vanille crémeuse · Fleurs blanches", baseNotes: "Ambre · Musc · Bois doux", price: 10000, collection: "scentlab", image: vanillaDreamImage, family: "Vanillé ambré", concentration: "Eau de parfum", volume: "50 ml", description: "Une vanille douce, propre et confortable, parfaite pour un sillage chaleureux au quotidien." },
  { name: "Savanna Vetiver", ref: "SCENTLAB", notes: "Vétiver · Agrumes · Bois secs", headNotes: "Citron · Bergamote · Poivre", heartNotes: "Vétiver · Herbes fraîches", baseNotes: "Bois secs · Ambre clair · Musc", price: 10000, collection: "scentlab", image: savannaVetiverImage, family: "Boisé frais", concentration: "Eau de parfum", volume: "50 ml", description: "Savanna Vetiver propose une fraîcheur boisée, nette et élégante, idéale sous le climat dakarois." },
  { name: "Cognac Whisper", ref: "SCENTLAB", notes: "Cognac · Bois · Épices", headNotes: "Cannelle · Poivre rose · Accord liqueur", heartNotes: "Cognac · Tabac blond · Résines", baseNotes: "Bois ambrés · Vanille sèche · Musc", price: 12000, collection: "scentlab", image: cognacWhisperImage, family: "Ambré boisé", concentration: "Eau de parfum", volume: "50 ml", description: "Une signature chaleureuse et sophistiquée, entre accord cognac, bois ambrés et sensualité discrète." },
  { name: "Rosy Glow", ref: "SCENTLAB", notes: "Rose · Musc · Fruits doux", headNotes: "Poire · Baies roses · Bergamote", heartNotes: "Rose · Pivoine · Accord poudré", baseNotes: "Musc blanc · Bois doux · Ambre clair", price: 10000, collection: "scentlab", image: rosyGlowImage, family: "Floral musqué", concentration: "Eau de parfum", volume: "50 ml", description: "Rosy Glow habille la peau d’une rose moderne, lumineuse et propre, facile à porter du matin au soir." },
  ...Array.from({ length: 2 }, (_, index) => ({ name: `SCENTLAB ${index + 13}`, ref: "Nom à renseigner", notes: "Notes à confirmer par le client", headNotes: "Notes à renseigner", heartNotes: "Notes à renseigner", baseNotes: "Notes à renseigner", price: 10000 + (index % 4) * 2500, collection: "scentlab" as const, image: products[index % products.length].image, family: "Famille à renseigner", concentration: "Eau de parfum", volume: "50 ml", description: "Description à compléter par le client pour présenter l’identité, le sillage et le moment idéal de ce parfum.", placeholder: true })),
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

export function productOrderUrl(product: BoutiqueProduct) {
  const price = new Intl.NumberFormat("fr-FR").format(product.price);
  const message = `Bonjour 2M Parfumerie 👋 Je souhaite commander *${product.name}* — ${price} FCFA. Est-il disponible ?`;
  return `https://wa.me/221761923441?text=${encodeURIComponent(message)}`;
}

export function collectionLabel(value: Collection) {
  return collectionFilters.find((filter) => filter.value === value)?.label ?? "Collection";
}