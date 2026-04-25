import kirkeCapri from "@/assets/perfume-kirke-capri.jpg";
import baccaratParis from "@/assets/perfume-baccarat-paris.jpg";
import arabianTonkaDubai from "@/assets/perfume-arabian-tonka-dubai.jpg";
import sauvageNewYork from "@/assets/perfume-sauvage-new-york.jpg";
import erbaPuraLisbon from "@/assets/perfume-erba-pura-lisbon.jpg";
import accentoRome from "@/assets/perfume-accento-rome.jpg";
import laCapitaleMoscow from "@/assets/perfume-la-capitale-moscow.jpg";
import naxosBerlin from "@/assets/perfume-naxos-berlin.jpg";

export const whatsappNumber = "221761923441";
export const displayPhone = "+221 76 192 34 41";
export const secondPhone = "+221 78 144 17 66";
export const instagram = "@2mparfumeriesn";
export const email = "commande@2mparfumerie.com";

export type Product = {
  id: string;
  name: string;
  edition: string;
  family: string;
  mood: string;
  price: string;
  image: string;
  notes: string[];
  description: string;
};

export const products: Product[] = [
  {
    id: "kirke-capri",
    name: "Tiziani Terenzi Kirke",
    edition: "Capri",
    family: "Fruité musqué",
    mood: "Magnétique, solaire, inoubliable",
    price: "25.000f",
    image: kirkeCapri,
    notes: ["Fruit de la passion", "Pêche", "Musc blanc"],
    description: "Une signature lumineuse pour celles et ceux qui veulent laisser une trace douce, propre et addictive.",
  },
  {
    id: "baccarat-rouge",
    name: "Baccarat Rouge",
    edition: "Paris",
    family: "Ambré boisé",
    mood: "Chic, dense, sophistiqué",
    price: "25.000f",
    image: baccaratParis,
    notes: ["Safran", "Ambre", "Bois précieux"],
    description: "Un parfum de présence, pensé pour les soirées élégantes et les rendez-vous où tout se joue en silence.",
  },
  {
    id: "arabian-tonka",
    name: "Montale Arabian Tonka",
    edition: "Dubai",
    family: "Oriental gourmand",
    mood: "Intense, chaud, royal",
    price: "25.000f",
    image: arabianTonkaDubai,
    notes: ["Tonka", "Oud", "Rose"],
    description: "Une chaleur orientale puissante, idéale pour affirmer une identité forte dès les premières secondes.",
  },
  {
    id: "sauvage-elixir",
    name: "Dior Sauvage Élixir",
    edition: "New York",
    family: "Aromatique épicé",
    mood: "Net, viril, maîtrisé",
    price: "25.000f",
    image: sauvageNewYork,
    notes: ["Lavande", "Épices", "Bois ambrés"],
    description: "Une allure fraîche et profonde pour l’homme qui avance avec calme, précision et confiance.",
  },
  {
    id: "erba-pura",
    name: "Xerjoff Sospiro Erba Pura",
    edition: "Lisbon",
    family: "Fruité ambré",
    mood: "Joyaux, propre, solaire",
    price: "25.000f",
    image: erbaPuraLisbon,
    notes: ["Agrumes", "Vanille", "Ambre"],
    description: "Une explosion fruitée luxueuse, parfaite pour les journées dakaroises où le parfum doit rayonner longtemps.",
  },
  {
    id: "accento",
    name: "Xerjoff Accento",
    edition: "Rome",
    family: "Floral chypré",
    mood: "Velours, mystère, élégance",
    price: "25.000f",
    image: accentoRome,
    notes: ["Ananas", "Jasmin", "Patchouli"],
    description: "Un sillage travaillé, doux et affirmé, pour transformer une entrée discrète en souvenir durable.",
  },
  {
    id: "la-capitale",
    name: "Xerjoff La Capitale",
    edition: "Moscow",
    family: "Cuir gourmand",
    mood: "Opulent, velouté, rare",
    price: "25.000f",
    image: laCapitaleMoscow,
    notes: ["Fraise", "Cuir", "Vanille"],
    description: "Une composition généreuse, luxueuse et tactile, faite pour les amateurs de parfums qui signent une pièce.",
  },
  {
    id: "naxos",
    name: "Xerjoff Naxos 1861",
    edition: "Berlin",
    family: "Tabac miellé",
    mood: "Noble, doux, profond",
    price: "25.000f",
    image: naxosBerlin,
    notes: ["Miel", "Tabac", "Lavande"],
    description: "Un parfum enveloppant et distingué, entre fraîcheur aromatique et chaleur raffinée.",
  },
];

export function whatsappUrl(message = "Bonjour 2M Parfumerie, je souhaite commander un parfum.") {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function productWhatsappUrl(product: Product) {
  return whatsappUrl(`Bonjour 2M Parfumerie 👋 Je souhaite commander *${product.name}* — ${product.price.replace(/f$/i, "")} FCFA. Est-il disponible ?`);
}