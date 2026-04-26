import losAngelesImage from "@/assets/takeoff-los-angeles.png";
import amsterdamImage from "@/assets/takeoff-amsterdam.png";
import zurichImage from "@/assets/takeoff-zurich.png";
import berlinImage from "@/assets/takeoff-berlin.png";
import dubaiImage from "@/assets/takeoff-dubai.png";
import riyadhImage from "@/assets/takeoff-riyadh.png";
import viennaImage from "@/assets/takeoff-vienna.png";
import lisbonImage from "@/assets/takeoff-lisbon.png";
import capriImage from "@/assets/takeoff-capri.png";
import seoulImage from "@/assets/takeoff-seoul.png";
import romeImage from "@/assets/takeoff-rome.png";
import istanbulImage from "@/assets/takeoff-istanbul.png";
import monacoImage from "@/assets/takeoff-monaco.png";
import newYorkImage from "@/assets/takeoff-new-york.png";
import moscowImage from "@/assets/takeoff-moscow.png";
import milanImage from "@/assets/takeoff-milan.png";
import budapestImage from "@/assets/takeoff-budapest.png";
import parisImage from "@/assets/takeoff-paris.png";
import creamyAlmondImage from "@/assets/scentlab-creamy-almond-upload.png";
import brightMandarinImage from "@/assets/scentlab-bright-mandarin.png";
import caramelCitrusImage from "@/assets/scentlab-caramel-citrus.png";
import fruityGourmandImage from "@/assets/scentlab-fruity-gourmand-upload.png";
import fruityVanillaImage from "@/assets/scentlab-fruity-vanilla.png";
import leatherVioletImage from "@/assets/scentlab-leather-violet.png";
import spicyCaramelImage from "@/assets/scentlab-spicy-caramel-upload.png";
import spicyLeatherImage from "@/assets/scentlab-spicy-leather-upload.png";
import rosyHazelnutImage from "@/assets/scentlab-rosy-hazelnut-upload.png";
import orientalOudImage from "@/assets/scentlab-oriental-oud-upload.png";
import vanillaDreamImage from "@/assets/scentlab-vanilla-dream-upload.png";
import savannaVetiverImage from "@/assets/scentlab-savanna-vetiver-upload.png";
import cognacWhisperImage from "@/assets/scentlab-cognac-whisper-upload.png";
import rosyGlowImage from "@/assets/scentlab-rosy-glow-upload.png";

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

const takeoffProducts = [
  { name: "Los Angeles", image: losAngelesImage, notes: "Ambre · Fruits rouges · Musc", family: "Ambré fruité" },
  { name: "Amsterdam", image: amsterdamImage, notes: "Violette · Bois doux · Musc", family: "Floral boisé" },
  { name: "Zurich", image: zurichImage, notes: "Bois frais · Ambre · Épices", family: "Boisé ambré" },
  { name: "Berlin", image: berlinImage, notes: "Vanille · Musc · Fleurs blanches", family: "Musqué doux" },
  { name: "Dubai", image: dubaiImage, notes: "Oud · Ambre · Épices", family: "Oriental boisé" },
  { name: "Riyadh", image: riyadhImage, notes: "Résines · Safran · Bois chauds", family: "Oriental ambré" },
  { name: "Vienna", image: viennaImage, notes: "Rose · Musc · Fruits tendres", family: "Floral musqué" },
  { name: "Lisbon", image: lisbonImage, notes: "Agrumes · Musc propre · Bois clair", family: "Frais musqué" },
  { name: "Capri", image: capriImage, notes: "Marine · Agrumes · Ambre gris", family: "Frais aromatique" },
  { name: "Seoul", image: seoulImage, notes: "Musc bleu · Agrumes · Bois propres", family: "Frais boisé" },
  { name: "Rome", image: romeImage, notes: "Violette · Ambre doux · Musc", family: "Floral ambré" },
  { name: "Istanbul", image: istanbulImage, notes: "Musc blanc · Fleurs propres · Bois doux", family: "Musqué floral" },
  { name: "Monaco", image: monacoImage, notes: "Accord marin · Agrumes · Ambre clair", family: "Aromatique frais" },
  { name: "New York", image: newYorkImage, notes: "Bois urbains · Ambre · Épices fraîches", family: "Boisé épicé" },
  { name: "Moscow", image: moscowImage, notes: "Vanille claire · Ambre · Musc", family: "Ambré doux" },
  { name: "Milan", image: milanImage, notes: "Bergamote · Musc · Bois élégants", family: "Chypré frais" },
  { name: "Budapest", image: budapestImage, notes: "Ambre doré · Musc · Bois blonds", family: "Ambré musqué" },
  { name: "Paris", image: parisImage, notes: "Rose rouge · Ambre · Musc", family: "Floral ambré" },
] as const;

const scentlabProducts = [
  { name: "Creamy Almond", image: creamyAlmondImage, notes: "Amande crémeuse · Vanille · Musc", family: "Gourmand crémeux" },
  { name: "Bright Mandarin", image: brightMandarinImage, notes: "Mandarine · Agrumes · Musc propre", family: "Hespéridé frais" },
  { name: "Caramel Citrus", image: caramelCitrusImage, notes: "Caramel · Agrumes · Ambre", family: "Gourmand hespéridé" },
  { name: "Fruity Gourmand", image: fruityGourmandImage, notes: "Fruits doux · Praline · Musc", family: "Fruité gourmand" },
  { name: "Fruity Vanilla", image: fruityVanillaImage, notes: "Fruits rouges · Vanille · Musc", family: "Vanillé fruité" },
  { name: "Leather Violet", image: leatherVioletImage, notes: "Cuir · Violette · Ambre", family: "Cuir floral" },
  { name: "Spicy Caramel", image: spicyCaramelImage, notes: "Caramel · Épices · Bois ambrés", family: "Gourmand épicé" },
  { name: "Spicy Leather", image: spicyLeatherImage, notes: "Cuir · Épices · Résines", family: "Cuir épicé" },
  { name: "Rosy Hazelnut", image: rosyHazelnutImage, notes: "Rose · Noisette · Ambre", family: "Floral ambré" },
  { name: "Oriental Oud", image: orientalOudImage, notes: "Oud · Résines · Ambre", family: "Oriental boisé" },
  { name: "Vanilla Dream", image: vanillaDreamImage, notes: "Vanille · Ambre · Musc", family: "Vanillé ambré" },
  { name: "Savanna Vetiver", image: savannaVetiverImage, notes: "Vétiver · Agrumes · Bois secs", family: "Boisé frais" },
  { name: "Cognac Whisper", image: cognacWhisperImage, notes: "Cognac · Bois · Épices", family: "Ambré boisé" },
  { name: "Rosy Glow", image: rosyGlowImage, notes: "Rose · Musc · Fruits doux", family: "Floral musqué" },
] as const;

const takeoffCatalog: BoutiqueProduct[] = takeoffProducts.map((product) => ({
  name: product.name,
  ref: "TAKEOFF Fragrance",
  notes: product.notes,
  headNotes: product.notes,
  heartNotes: "Notes à préciser",
  baseNotes: "Notes à préciser",
  price: 25000,
  collection: "takeoff",
  image: product.image,
  family: product.family,
  concentration: "Eau de parfum",
  volume: "100 ml",
  description: `${product.name} par TAKEOFF Fragrance est une eau de parfum 100 ml de la collection Scent of Journey, disponible chez 2M Parfumerie à Dakar.`,
}));

const scentlabCatalog: BoutiqueProduct[] = scentlabProducts.map((product) => ({
  name: product.name,
  ref: "SCENTLAB",
  notes: product.notes,
  headNotes: product.notes,
  heartNotes: "Notes à préciser",
  baseNotes: "Notes à préciser",
  price: 10000,
  collection: "scentlab",
  image: product.image,
  family: product.family,
  concentration: "Eau de parfum",
  volume: "50 ml",
  description: `${product.name} par SCENTLAB est une eau de parfum sélectionnée par 2M Parfumerie pour un sillage moderne et facile à porter à Dakar.`,
}));

export const catalog: BoutiqueProduct[] = [...takeoffCatalog, ...scentlabCatalog];

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
