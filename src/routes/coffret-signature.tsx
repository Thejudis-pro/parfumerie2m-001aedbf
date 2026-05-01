import { Link, createFileRoute } from "@tanstack/react-router";
import { Check, Sparkles, WandSparkles } from "lucide-react";
import { useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { SiteLayout } from "@/components/commerce/SiteLayout";
import { WhatsAppLogo } from "@/components/commerce/WhatsAppLogo";
import haqqiCollectionImage from "@/assets/haqqi-collection.png";
import scentlabBoxesImage from "@/assets/scentlab-boxes.png";
import scentlabMarineCitrusImage from "@/assets/scentlab-marine-citrus.png";
import pocketHommeImage from "@/assets/pocket-perfumes-homme.png";
import pocketFemmeImage from "@/assets/pocket-perfumes-femme.png";
import { formatPrice } from "@/lib/catalog-data";
import { whatsappUrl } from "@/lib/perfume-data";

type CoffretCollection = "haqqi" | "scentlab" | "pocket";

type CoffretOption = {
  id: string;
  title: string;
  description: string;
};

type CoffretSection = {
  title: string;
  items: CoffretOption[];
};

const coffretOffers: Record<
  CoffretCollection,
  { label: string; price: number; subtitle: string; accent: string; selectionCount: number }
> = {
  haqqi: {
    label: "Pack de 3 Haqqi",
    price: 10000,
    subtitle: "3 parfums à composer dans un esprit plus profond, chaud et élégant.",
    accent: "Ambiance orientale",
    selectionCount: 3,
  },
  scentlab: {
    label: "Pack de 3 SCENTLAB",
    price: 15000,
    subtitle: "3 parfums à composer dans une lecture plus moderne, fraîche ou gourmande.",
    accent: "Esprit contemporain",
    selectionCount: 3,
  },
  pocket: {
    label: "Pack de 5 parfums de poches",
    price: 10000,
    subtitle: "5 parfums de poche au choix dans une sélection iconique de maisons prestigieuses.",
    accent: "Format nomade",
    selectionCount: 5,
  },
};

const haqqiSections: CoffretSection[] = [
  {
    title: "Homme",
    items: [
      { id: "haqqi-homme-lacoste-noir-l12", title: "Lacoste noir L12", description: "Propre, élégant, facile à porter tous les jours." },
      { id: "haqqi-homme-la-nuit-del-homme", title: "La nuit del homme", description: "Plus sombre, plus chic, avec une belle présence." },
      { id: "haqqi-homme-desert-oud", title: "Desert oud", description: "Oud sec et profond avec une signature marquée." },
      { id: "haqqi-homme-oud-noir", title: "Oud noir", description: "Boisé, intense et très enveloppant." },
      { id: "haqqi-homme-scandal-man", title: "Scandal man", description: "Plus charismatique, plus affirmé, très présent." },
      { id: "haqqi-homme-imagination", title: "Imagination", description: "Frais lumineux, net et moderne." },
      { id: "haqqi-homme-terre-d-hermes", title: "Terre d Hermès", description: "Boisé minéral, sec et très raffiné." },
      { id: "haqqi-homme-ck-euphoria", title: "Ck Euphoria", description: "Plus rond, propre et facile à aimer." },
      { id: "haqqi-homme-krouss", title: "Krouss", description: "Un choix direct, expressif et sans détour." },
      { id: "haqqi-homme-burberry-classic", title: "Burberry classic", description: "Classique, doux et élégant." },
      { id: "haqqi-homme-pegasus", title: "Pegasus", description: "Crémeux, élégant et très distinctif." },
      { id: "haqqi-homme-creed-aventus", title: "Creed Aventus", description: "Frais, noble et très signature." },
      { id: "haqqi-homme-african-leather", title: "African Leather", description: "Cuir chaud, sec et racé." },
      { id: "haqqi-homme-encre-noir", title: "Encre noir", description: "Sombre, boisé et très texturé." },
      { id: "haqqi-homme-black-code", title: "Black code", description: "Nocturne, élégant et subtil." },
      { id: "haqqi-homme-man-in-black", title: "Man in black", description: "Ambré et intense avec une belle profondeur." },
      { id: "haqqi-homme-cartier-declaration", title: "Cartier déclaration", description: "Boisé épicé, plus classique et net." },
      { id: "haqqi-homme-dolce-gabbana-the-one", title: "Dolce gabbana the One", description: "Chaud, suave et très séduisant." },
      { id: "haqqi-homme-valentino-uomo", title: "Valentino oumo", description: "Doux, ambré et raffiné." },
    ],
  },
  {
    title: "Unisex",
    items: [
      { id: "haqqi-unisex-baccarat-rouge-540", title: "Baccarat rouge 540", description: "Signature lumineuse, ambrée et ultra reconnaissable." },
      { id: "haqqi-unisex-baccarat-rouge-540-extrait", title: "Baccarat rouge 540 extrait", description: "Version plus profonde, plus dense et plus luxueuse." },
      { id: "haqqi-unisex-oud-satin-mood", title: "Oud satin mood", description: "Velouté, oriental et raffiné." },
      { id: "haqqi-unisex-more-than-words", title: "More than words", description: "Élégant, poétique et légèrement boisé." },
      { id: "haqqi-unisex-kirke", title: "Kirke", description: "Fruité, solaire et très expressif." },
      { id: "haqqi-unisex-duetto", title: "Duetto", description: "Équilibré, net et facile à porter à deux styles." },
      { id: "haqqi-unisex-tom-ford-neroli-portofino", title: "Tom Ford neroli portofino", description: "Agrumes propres, lumineux et très frais." },
      { id: "haqqi-unisex-tom-ford-white-pachouli", title: "Tom Ford White pachouli", description: "Chic, blanc, boisé et très fluide." },
      { id: "haqqi-unisex-tom-ford-soleil-blanc", title: "Tom Ford soleil blanc", description: "Solaire, doux et élégant." },
      { id: "haqqi-unisex-tom-ford-ombre-leather", title: "Tom Ford ombre Leather", description: "Cuir profond, sombre et sophistiqué." },
    ],
  },
  {
    title: "Femme",
    items: [
      { id: "haqqi-femme-la-nuit-tresor", title: "La nuit trésor", description: "Gourmand, velouté et très féminin." },
      { id: "haqqi-femme-supreme-bouquet", title: "Suprême bouquet", description: "Floral riche, lumineux et généreux." },
      { id: "haqqi-femme-guidance", title: "Guidance", description: "Florale, crémeuse et élégante." },
      { id: "haqqi-femme-chanel-chance", title: "Chanel chance", description: "Doux, pétillant et intemporel." },
      { id: "haqqi-femme-euphoria", title: "Euphoria", description: "Fruité, sensuel et facile à aimer." },
      { id: "haqqi-femme-la-vie-est-belle", title: "La vie est belle", description: "Gourmand, lumineux et très réconfortant." },
      { id: "haqqi-femme-ysl-cinema", title: "YSL Cinéma", description: "Chaleureux, glamour et assumé." },
      { id: "haqqi-femme-manifesto", title: "Manifesto", description: "Plus moderne, plus doux, plus affirmé." },
      { id: "haqqi-femme-bright-cristal", title: "Bright cristal", description: "Aérien, propre et lumineux." },
      { id: "haqqi-femme-gucci-bloom", title: "Gucci Bloom", description: "Floral blanc, pur et généreux." },
      { id: "haqqi-femme-lolita-lempicka", title: "Lolita lempicka", description: "Sucré, original et très féminin." },
      { id: "haqqi-femme-dior-addict", title: "Dior addict", description: "Plus profond, plus sensuel, plus marqué." },
      { id: "haqqi-femme-diesel-full-for-life", title: "Diesel full for Life", description: "Audacieux, doux et très présent." },
      { id: "haqqi-femme-si-passione", title: "Si passione", description: "Rouge, fruité et intensément féminin." },
    ],
  },
];

const scentlabSections: CoffretSection[] = [
  {
    title: "Homme",
    items: [
      { id: "scentlab-woody-bergamot", title: "Woody Bergamot", description: "Sauvage" },
      { id: "scentlab-minty-cedar", title: "Minty Cedar", description: "Bleu de Chanel" },
      { id: "scentlab-fresh-grapefruit", title: "Fresh Grapefruit", description: "Invictus" },
      { id: "scentlab-minty-vanilla", title: "Minty Vanilla", description: "Versace Éros" },
      { id: "scentlab-earth-vetiver", title: "Earth Vétiver", description: "Terre d’Hermès" },
      { id: "scentlab-aquatique-jasmine", title: "Aquatique Jasmine", description: "Acqua di Gio" },
      { id: "scentlab-warm-spicy", title: "Warm Spicy", description: "Stronger With You" },
      { id: "scentlab-cool-mint", title: "Cool Mint", description: "Allure" },
      { id: "scentlab-pineapple-bergamote", title: "Pineapple Bergamote", description: "Creed Aventus" },
      { id: "scentlab-minty-lavender", title: "Minty Lavender", description: "JPG Le Mâle" },
      { id: "scentlab-spicy-leather", title: "Spicy Leather", description: "One Million" },
      { id: "scentlab-bright-mandarin", title: "Bright Mandarin", description: "Louis Vuitton Imagination" },
      { id: "scentlab-sweet-tobacco", title: "Sweet Tobacco", description: "Xerjoff Naxos" },
      { id: "scentlab-woody-oud", title: "Woody Oud", description: "Tom Ford Oud Wood" },
      { id: "scentlab-dark-leather", title: "Dark Leather", description: "Tom Ford Ombre Leather" },
      { id: "scentlab-iris-cedar", title: "İris Cedar", description: "Dior Homme Intense" },
      { id: "scentlab-leather-violet", title: "Leather Violet", description: "Dior Fahrenheit" },
      { id: "scentlab-spicy-caramel", title: "Spicy Caramel", description: "Scandal Man" },
      { id: "scentlab-cognac-whisper", title: "Cognac Whisper", description: "Kilian Angels’ Share" },
      { id: "scentlab-oriental-oud", title: "Oriental Oud", description: "Oud for Greatness" },
      { id: "scentlab-spicy-leather-exclusive", title: "Spicy Leather Exclusive", description: "One Million Lucky" },
      { id: "scentlab-oriental-tonka", title: "Oriental Tonka", description: "Arabian Tonka" },
      { id: "scentlab-poetic-amber", title: "Poetic Amber", description: "More Than Words" },
      { id: "scentlab-dreamy-bloom", title: "Dreamy Bloom", description: "Mémo Marfa" },
      { id: "scentlab-galactic-musk", title: "Galactic Musk", description: "Ganymed" },
      { id: "scentlab-savanna-vetiver", title: "Savanna Vétiver", description: "Bal d’Afrique" },
    ],
  },
  {
    title: "Unisex",
    items: [
      { id: "scentlab-sweet-safron", title: "Sweet Safron", description: "MFK Baccarat Rouge" },
      { id: "scentlab-smoky-oud", title: "Smoky Oud", description: "Louis Vuitton Ombre Nomade" },
      { id: "scentlab-fruity-passion", title: "Fruity Passion", description: "Tiziana Terenzi Kirke" },
      { id: "scentlab-fruity-vanille", title: "Fruity Vanille", description: "Xerjoff Erba Pura" },
      { id: "scentlab-addictive-peach", title: "Addictive Peach", description: "Fleur Narcotique" },
      { id: "scentlab-ambery-orchid", title: "Ambery Orchid", description: "Tom Ford Black Orchid" },
      { id: "scentlab-pink-peony", title: "Pink Peony", description: "Parfums de Marly Delina" },
      { id: "scentlab-cherry-almond", title: "Cherry Almond", description: "Tom Ford Lost Cherry" },
      { id: "scentlab-marine-citrus", title: "Marine Citrus", description: "Orto Parisi Megamare" },
      { id: "scentlab-satin-rose", title: "Satin Rose", description: "MFK Oud Satin Mood" },
      { id: "scentlab-jasmine-cedar", title: "Jasmine Cédar", description: "Amouage Reflection" },
      { id: "scentlab-glow-amber", title: "Glow Amber", description: "Grand Soir" },
      { id: "scentlab-sandal-wood-leather", title: "Sandal Wood Leather", description: "Santal 33" },
      { id: "scentlab-sweet-safron-exclusive", title: "Sweet Safron Exclusive", description: "Baccarat Extrait" },
    ],
  },
  {
    title: "Femme",
    items: [
      { id: "scentlab-naughty-rose", title: "Naughty Rose", description: "Good Girl Gone Bad" },
      { id: "scentlab-ambery-vanilla", title: "Ambery Vanilla", description: "Black Opium" },
      { id: "scentlab-floral-musk", title: "Floral Musk", description: "Coco Mademoiselle" },
      { id: "scentlab-golden-floral", title: "Golden Floral", description: "J’adore" },
      { id: "scentlab-fruity-gourmand", title: "Fruity Gourmand", description: "La Vie Est Belle" },
      { id: "scentlab-spicy-citrus", title: "Spicy Citrus", description: "Chanel Chance" },
      { id: "scentlab-orange-blossom", title: "Orange Blossom", description: "Libre" },
      { id: "scentlab-fruity-cyphere", title: "Fruity Cyphere", description: "Si" },
      { id: "scentlab-gardenia-jam", title: "Gardénia Jam", description: "Scandal" },
      { id: "scentlab-lush-gardenia", title: "Lush Gardénia", description: "Gucci Bloom" },
      { id: "scentlab-flirty-caramel", title: "Flirty Caramel", description: "Good Girl" },
      { id: "scentlab-exotic-vanilla", title: "Exotic Vanilla", description: "My Way" },
      { id: "scentlab-mystic-jasmine", title: "Mystic Jasmine", description: "Alien" },
      { id: "scentlab-rosy-hazelnut", title: "Rosy Hazelnut", description: "Amouage Guidance" },
      { id: "scentlab-creamy-almond", title: "Creamy Almond", description: "Hypnotic Poison" },
      { id: "scentlab-rosy-glow", title: "Rosy Glow", description: "Lancôme Idole" },
      { id: "scentlab-vanilla-dream", title: "Vanilla Dream", description: "Burberry Goddess" },
      { id: "scentlab-caramel-citrus", title: "Caramel Citrus", description: "Xerjoff Casamorati Lira" },
      { id: "scentlab-caramel-orange", title: "Caramel Orange", description: "Kilian Love Don’t Be Shy" },
    ],
  },
];

const pocketSections: CoffretSection[] = [
  {
    title: "Homme",
    items: [
      { id: "pocket-le-male", title: "Le Mâle", description: "JPG — frais lavandé sucré." },
      { id: "pocket-one-million", title: "One Million", description: "Paco Rabanne — épicé doré." },
      { id: "pocket-zara-tobacco-collection", title: "Zara Tobacco Collection", description: "Tabac chaleureux." },
      { id: "pocket-ck-eternity", title: "CK Eternity", description: "Frais boisé classique." },
      { id: "pocket-killian-back-to-black", title: "Killian Back to Black", description: "Tabac miel sensuel." },
      { id: "pocket-killian-intoxicated", title: "Killian Intoxicated", description: "Café cardamome envoûtant." },
      { id: "pocket-killian-amber-oud", title: "Killian Amber Oud", description: "Oud ambré profond." },
      { id: "pocket-killian-straight-to-heaven", title: "Killian Straight to Heaven", description: "Rhum boisé enveloppant." },
      { id: "pocket-killian-good-girl-gone-bad-h", title: "Killian Good Girl Gone Bad", description: "Floral fruité magnétique." },
      { id: "pocket-tom-ford-tuscan-leather", title: "Tom Ford Tuscan Leather", description: "Cuir framboise mythique." },
      { id: "pocket-tom-ford-tobacco-oud", title: "Tom Ford Tobacco Oud", description: "Tabac oud épicé." },
      { id: "pocket-tom-ford-noir-extreme", title: "Tom Ford Noir Extrême", description: "Gourmand boisé chaud." },
      { id: "pocket-pegasus", title: "Parfums de Marly Pegasus", description: "Amande vanille élégant." },
      { id: "pocket-creed-aventus", title: "Creed Aventus", description: "Ananas fumé iconique." },
      { id: "pocket-nasomatto-black-afgano", title: "Nasomatto Black Afgano", description: "Boisé résineux intense." },
      { id: "pocket-amouage-interlude", title: "Amouage Interlude", description: "Encens ambre puissant." },
      { id: "pocket-amouage-reflection", title: "Amouage Reflection", description: "Floral vert raffiné." },
      { id: "pocket-amouage-opus", title: "Amouage Opus", description: "Boisé oriental noble." },
      { id: "pocket-mousuf", title: "Mousuf", description: "Oriental signature." },
      { id: "pocket-byredo-mojave-ghost", title: "Byredo Mojave Ghost", description: "Boisé minéral aérien." },
      { id: "pocket-byredo-bal-d-afrique", title: "Byredo Bal d’Afrique", description: "Vétiver agrumes solaire." },
      { id: "pocket-killian-black-phantom", title: "Killian Black Phantom", description: "Café rhum gourmand." },
      { id: "pocket-dsquared2-wood", title: "Dsquared2 Wood", description: "Boisé moderne dynamique." },
      { id: "pocket-zara-oriental", title: "Zara Oriental", description: "Ambre vanille chaleureux." },
      { id: "pocket-zara-orchid", title: "Zara Orchid", description: "Floral oriental vibrant." },
    ],
  },
  {
    title: "Unisex",
    items: [
      { id: "pocket-baccarat-rouge-540", title: "Baccarat Rouge 540", description: "MFK — ambré safrané iconique." },
      { id: "pocket-kirke", title: "Kirke", description: "Tiziana Terenzi — fruité solaire." },
      { id: "pocket-ex-nihilo-fleur-narcotique", title: "Ex Nihilo Fleur Narcotique", description: "Floral fruité poudré." },
      { id: "pocket-nasomatto-narcotique", title: "Nasomatto Narcotique", description: "Floral envoûtant intense." },
    ],
  },
  {
    title: "Femme",
    items: [
      { id: "pocket-la-vie-est-belle", title: "La Vie Est Belle", description: "Lancôme — gourmand iris." },
      { id: "pocket-la-vie-est-belle-floral", title: "La Vie Est Belle Floral", description: "Version florale lumineuse." },
      { id: "pocket-gucci-bloom", title: "Gucci Bloom", description: "Tubéreuse jasmin opulent." },
      { id: "pocket-coco-mademoiselle", title: "Coco Mademoiselle", description: "Patchouli rose chypré." },
      { id: "pocket-chanel-chance", title: "Chanel Chance", description: "Floral pétillant joyeux." },
      { id: "pocket-chanel-chance-eau-tendre", title: "Chanel Chance Eau Tendre", description: "Floral fruité doux." },
      { id: "pocket-armani-si", title: "Armani Si", description: "Cassis ambré sensuel." },
      { id: "pocket-ck-euphoria", title: "CK Euphoria", description: "Orchidée noire envoûtant." },
      { id: "pocket-creed-aventus-for-her", title: "Creed Aventus for Her", description: "Floral fruité chic." },
      { id: "pocket-212-sexy-women", title: "212 Sexy Women", description: "Vanille fleurs piquantes." },
      { id: "pocket-212-vip-women", title: "212 VIP Women", description: "Rhum musc festif." },
      { id: "pocket-hermes-jour", title: "Hermès Jour", description: "Floral lumineux frais." },
      { id: "pocket-dior-jadore", title: "Dior J’adore", description: "Bouquet floral solaire." },
      { id: "pocket-ck-eternity-femme", title: "Calvin Klein Eternity", description: "Floral blanc romantique." },
      { id: "pocket-alien", title: "Alien", description: "Mugler — jasmin ambré hypnotique." },
      { id: "pocket-killian-good-girl-gone-bad-f", title: "Killian Good Girl Gone Bad", description: "Tubéreuse rose magnétique." },
      { id: "pocket-killian-liaisons-dangereuses", title: "Killian Liaisons Dangereuses", description: "Rose prune sensuelle." },
      { id: "pocket-versace-crystal-noir", title: "Versace Crystal Noir", description: "Gardénia ambré mystérieux." },
      { id: "pocket-dkny-be-delicious", title: "DKNY Be Delicious", description: "Pomme verte pétillante." },
      { id: "pocket-bulgari-omnia", title: "Bulgari Omnia", description: "Épices musc raffiné." },
    ],
  },
];

const coffretOptions: Record<CoffretCollection, CoffretOption[]> = {
  haqqi: haqqiSections.flatMap((section) => section.items),
  scentlab: scentlabSections.flatMap((section) => section.items),
  pocket: pocketSections.flatMap((section) => section.items),
};

const collectionOrder: CoffretCollection[] = ["haqqi", "scentlab", "pocket"];

const collectionSections: Record<CoffretCollection, CoffretSection[]> = {
  haqqi: haqqiSections,
  scentlab: scentlabSections,
  pocket: pocketSections,
};

const haqqiSideImages = [
  { src: haqqiCollectionImage, alt: "Sélection de parfums Haqqi" },
];

const scentlabSideImages = [
  { src: scentlabMarineCitrusImage, alt: "Visuel SCENTLAB Marine Citrus" },
  { src: scentlabBoxesImage, alt: "Sélection de packs SCENTLAB" },
];

const pocketSideImages = [
  { src: pocketHommeImage, alt: "Sélection de Parfums de poches Homme" },
  { src: pocketFemmeImage, alt: "Sélection de Parfums de poches Femme" },
];

const collectionSideImages: Record<CoffretCollection, { src: string; alt: string }[]> = {
  haqqi: haqqiSideImages,
  scentlab: scentlabSideImages,
  pocket: pocketSideImages,
};

export const Route = createFileRoute("/coffret-signature")({
  head: () => ({
    meta: [
      { title: "Compose ton Pack — 2M Parfumerie Sénégal" },
      {
        name: "description",
        content:
          "Composez votre Pack Signature chez 2M Parfumerie : 3 parfums Haqqi à 10 000 FCFA, 3 parfums SCENTLAB à 15 000 FCFA ou 5 Parfums de poches à 10 000 FCFA.",
      },
      { property: "og:title", content: "Compose ton Pack — 2M Parfumerie" },
      {
        property: "og:description",
        content:
          "3 parfums Haqqi à 10 000 FCFA, 3 parfums SCENTLAB à 15 000 FCFA ou 5 Parfums de poches à 10 000 FCFA, à composer en quelques clics.",
      },
    ],
  }),
  component: CoffretSignaturePage,
});

function CoffretSignaturePage() {
  const [selectedCollection, setSelectedCollection] = useState<CoffretCollection>("haqqi");
  const [selections, setSelections] = useState<Record<CoffretCollection, string[]>>({
    haqqi: [],
    scentlab: [],
    pocket: [],
  });

  const currentOffer = coffretOffers[selectedCollection];
  const currentOptions = coffretOptions[selectedCollection];
  const selectedIds = selections[selectedCollection];
  const selectedOptions = useMemo(
    () => currentOptions.filter((option) => selectedIds.includes(option.id)),
    [currentOptions, selectedIds],
  );
  const requiredCount = currentOffer.selectionCount;
  const remaining = requiredCount - selectedOptions.length;
  const canSend = selectedOptions.length === requiredCount;
  const whatsappMessage = buildWhatsAppMessage(selectedCollection, selectedOptions);

  const toggleOption = (optionId: string) => {
    setSelections((current) => {
      const activeSelections = current[selectedCollection];
      const alreadySelected = activeSelections.includes(optionId);

      if (alreadySelected) {
        return {
          ...current,
          [selectedCollection]: activeSelections.filter((id) => id !== optionId),
        };
      }

      if (activeSelections.length >= coffretOffers[selectedCollection].selectionCount) {
        return current;
      }

      return {
        ...current,
        [selectedCollection]: [...activeSelections, optionId],
      };
    });
  };

  return (
    <SiteLayout>
      <section className="relative overflow-hidden border-b border-border bg-background pt-24 md:pt-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,211,102,0.12),transparent_36%),radial-gradient(circle_at_left,rgba(22,163,74,0.08),transparent_30%)]" />
        <div className="section-shell relative grid gap-12 py-14 md:grid-cols-[1.1fr_0.9fr] md:py-20">
          <div>
            <Badge variant="outline" className="border-accent/30 bg-accent-muted text-accent">
              Pack Signature
            </Badge>
            <h1 className="mt-6 max-w-2xl font-display text-4xl font-semibold leading-[1.08] text-foreground md:text-[64px]">
              Compose ton pack, coche tes parfums, on s’occupe du reste.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-muted-foreground md:text-lg">
              Une expérience simple et plus personnelle qu’un achat classique: tu choisis ton univers,
              tu coches trois parfums, et ton pack est préparé pour être offert ou porté tout de
              suite.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Badge className="bg-accent text-primary-foreground">3 ou 5 parfums selon le pack</Badge>
              <Badge variant="secondary">Pack prêt à offrir</Badge>
              <Badge variant="secondary">Validation rapide sur WhatsApp</Badge>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="whatsapp" size="lg">
                <a href="#compose">Composer mon pack</a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/boutique" search={{ collection: "all" }}>
                  Voir la boutique
                </Link>
              </Button>
            </div>
          </div>

          <div className="grid gap-4 md:justify-items-end">
            {collectionOrder.map((collection) => {
              const offer = coffretOffers[collection];
              const active = selectedCollection === collection;

              return (
                <button
                  key={collection}
                  type="button"
                  onClick={() => setSelectedCollection(collection)}
                  className={
                    active
                      ? "w-full rounded-2xl border border-accent bg-accent-muted p-6 text-left shadow-card transition-all md:max-w-md"
                      : "w-full rounded-2xl border border-border bg-card p-6 text-left shadow-card transition-all hover:-translate-y-1 hover:border-accent md:max-w-md"
                  }
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="caption-luxe text-accent">{offer.accent}</p>
                      <h2 className="mt-2 font-display text-2xl text-foreground">{offer.label}</h2>
                    </div>
                    <Badge variant={active ? "default" : "secondary"}>
                      {formatPrice(offer.price)}
                    </Badge>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-muted-foreground">{offer.subtitle}</p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section id="compose" className="bg-surface py-16 md:py-24">
        <div className="section-shell grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="border-border bg-card shadow-card">
            <CardHeader>
              <CardTitle className="font-display text-[28px] text-foreground md:text-[34px]">
                Choisis ton univers, puis coche tes parfums
              </CardTitle>
              <CardDescription className="mt-2 text-base text-muted-foreground">
                Tu peux garder tes sélections Haqqi et SCENTLAB séparément. Une fois que tu as 3
                choix dans l’univers actif, tu peux valider directement sur WhatsApp.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid gap-3 sm:grid-cols-2">
                {collectionOrder.map((collection) => {
                  const offer = coffretOffers[collection];
                  const count = selections[collection].length;
                  const active = selectedCollection === collection;

                  return (
                    <button
                      key={collection}
                      type="button"
                      onClick={() => setSelectedCollection(collection)}
                      className={
                        active
                          ? "rounded-xl border border-accent bg-accent-muted px-4 py-4 text-left transition-all"
                          : "rounded-xl border border-border bg-background px-4 py-4 text-left transition-all hover:border-accent"
                      }
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                            {offer.label}
                          </p>
                          <p className="mt-1 font-semibold text-foreground">
                            {count}/{offer.selectionCount} sélectionné{count > 1 ? "s" : ""}
                          </p>
                        </div>
                        <Badge variant={active ? "default" : "secondary"}>
                          {formatPrice(offer.price)}
                        </Badge>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="space-y-6">
                {collectionSideImages[selectedCollection].length > 0 && (
                  <div className="grid gap-3 sm:grid-cols-3">
                    {collectionSideImages[selectedCollection].map((image) => (
                      <img
                        key={image.alt}
                        src={image.src}
                        alt={image.alt}
                        loading="lazy"
                        className="aspect-[4/3] w-full rounded-xl border border-border object-cover shadow-card"
                      />
                    ))}
                  </div>
                )}
                <div className="space-y-6">
                  {collectionSections[selectedCollection].map((section) => (
                    <div key={section.title} className="space-y-3">
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="font-display text-2xl text-foreground">{section.title}</h3>
                        <Badge variant="secondary">{section.items.length} parfums</Badge>
                      </div>
                      <div className="grid gap-4 md:grid-cols-2">
                        {section.items.map((option) => {
                          const checked = selectedIds.includes(option.id);
                          const disabled = !checked && selectedOptions.length >= requiredCount;

                          return (
                            <label
                              key={option.id}
                              htmlFor={option.id}
                              className={
                                checked
                                  ? "group flex cursor-pointer items-start gap-4 rounded-xl border border-accent bg-accent-muted p-4 transition-all"
                                  : "group flex cursor-pointer items-start gap-4 rounded-xl border border-border bg-background p-4 transition-all hover:border-accent"
                              }
                            >
                              <Checkbox
                                id={option.id}
                                checked={checked}
                                disabled={disabled}
                                onCheckedChange={() => toggleOption(option.id)}
                                className="mt-1"
                              />
                              <div className="min-w-0 flex-1">
                                <div className="flex items-start justify-between gap-3">
                                  <div>
                                    <p className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                                      {collectionOffersLabel(selectedCollection)} {section.title}
                                    </p>
                                    <h4 className="mt-1 font-display text-[22px] text-foreground">
                                      {option.title}
                                    </h4>
                                  </div>
                                  {checked && (
                                    <Check className="mt-1 size-5 text-accent" aria-hidden="true" />
                                  )}
                                </div>
                              </div>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-sm text-muted-foreground">
                Tu dois cocher exactement {requiredCount} parfums. Si un choix n’est plus disponible, on te
                propose un remplacement proche avant validation.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border bg-card shadow-card">
            <CardHeader>
              <CardTitle className="font-display text-[28px] text-foreground">
                Ton pack en cours
              </CardTitle>
              <CardDescription>
                Résumé rapide avant l’envoi du message.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-2xl bg-surface p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="caption-luxe text-accent">{currentOffer.label}</p>
                    <p className="mt-2 text-sm text-muted-foreground">{currentOffer.subtitle}</p>
                  </div>
                  <Badge>{formatPrice(currentOffer.price)}</Badge>
                </div>
                <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                  <Sparkles className="size-4 text-accent" aria-hidden="true" />
                  <span>{selectedOptions.length}/{requiredCount} parfums choisis</span>
                </div>
              </div>

              <div className="rounded-2xl border border-border p-5">
                <p className="caption-luxe text-muted-foreground">Mes choix</p>
                {selectedOptions.length ? (
                  <ul className="mt-4 space-y-3">
                    {selectedOptions.map((option) => (
                      <li key={option.id} className="flex items-start gap-3 text-sm text-foreground">
                        <Check className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
                        <span>{option.title}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-4 text-sm text-muted-foreground">
                    Choisis {requiredCount} parfums pour voir ton pack se construire ici.
                  </p>
                )}
              </div>

              <div className="rounded-2xl bg-accent-muted p-5">
                <p className="caption-luxe text-accent">Prix du pack</p>
                <p className="mt-3 font-display text-4xl text-foreground">
                  {formatPrice(currentOffer.price)}
                </p>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">
                  Trois parfums, un seul pack, et un échange humain pour finaliser la sélection.
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-3">
              {canSend ? (
                <Button asChild variant="whatsapp" size="lg" className="w-full">
                  <a href={whatsappUrl(whatsappMessage)} target="_blank" rel="noopener noreferrer">
                    <WhatsAppLogo tone="light" className="size-5" /> Valider mon pack
                  </a>
                </Button>
              ) : (
                <Button type="button" variant="whatsapp" size="lg" className="w-full" disabled>
                  Choisis encore {remaining} parfum{remaining > 1 ? "s" : ""}
                </Button>
              )}
              <Button asChild variant="outline" size="lg" className="w-full">
                <Link to="/contact">Parler à l’équipe</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      <section className="bg-background py-16 md:py-24">
        <div className="section-shell grid gap-4 md:grid-cols-3 md:gap-5">
          {[
            {
              icon: WandSparkles,
              title: "1. Tu choisis l’univers",
              text: "Haqqi & Parfums de poches à 10 000 FCFA ou SCENTLAB à 15 000 FCFA selon le style.",
            },
            {
              icon: Check,
              title: "2. Tu coches tes parfums",
              text: "La sélection se fait en quelques clics, avec un vrai sentiment de composition.",
            },
            {
              icon: Sparkles,
              title: "3. On prépare ton pack",
              text: "Tu valides sur WhatsApp et on finalise la commande avec toi.",
            },
          ].map(({ icon: Icon, title, text }) => (
            <article
              key={title}
              className="rounded-2xl border border-border bg-card p-6 shadow-card"
            >
              <Icon className="mb-6 size-8 text-accent" aria-hidden="true" />
              <h3 className="font-display text-2xl text-foreground">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{text}</p>
            </article>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}

function collectionOffersLabel(collection: CoffretCollection) {
  if (collection === "haqqi") return "Haqqi";
  if (collection === "scentlab") return "SCENTLAB";
  return "Parfums de poches";
}

function buildWhatsAppMessage(collection: CoffretCollection, options: CoffretOption[]) {
  const offer = coffretOffers[collection];
  const choiceLines = options.map((option) => `• ${option.title}`).join("\n");

  return `Bonjour 2M Parfumerie 👋 Je veux un ${offer.label} à ${formatPrice(offer.price)}.\n\nMes ${offer.selectionCount} choix :\n${choiceLines}\n\nMerci de me préparer le pack.`;
}
