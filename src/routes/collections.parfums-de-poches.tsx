import { createFileRoute } from "@tanstack/react-router";

import { CollectionPage } from "@/components/commerce/CollectionPage";

const URL = "https://www.2mparfumeriedk.com/collections/parfums-de-poches";
const TITLE = "Parfums de Poches Sénégal | Mini parfums livrés à Dakar — 2M Parfumerie";
const DESC =
  "Achetez des parfums de poches au Sénégal dès 2 000 FCFA. Livraison à Dakar. Composez votre pack de 5 parfums de poches pour 10 000 FCFA chez 2M Parfumerie.";

export const Route = createFileRoute("/collections/parfums-de-poches")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: URL },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "fr_FR" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Accueil", item: "https://www.2mparfumeriedk.com/" },
            { "@type": "ListItem", position: 2, name: "Collections", item: "https://www.2mparfumeriedk.com/boutique" },
            { "@type": "ListItem", position: 3, name: "Parfums de Poches", item: URL },
          ],
        }),
      },
    ],
  }),
  component: () => (
    <CollectionPage
      collection="pocket"
      eyebrow="Collection Parfums de Poches"
      h1="Parfums de Poches au Sénégal — Petits formats, grand sillage"
      intro="Les parfums de poches de 2M Parfumerie sont le moyen idéal d'avoir toujours votre fragrance préférée avec vous. Petit format, grand sillage : nos parfums de poche sont parfaits pour voyager, recharger en journée ou découvrir de nouvelles senteurs sans se ruiner. À partir de seulement 2 000 FCFA, les parfums de poches 2M sont livrés partout au Sénégal. Composez votre pack de 5 parfums de poches pour seulement 10 000 FCFA."
      ctaLabel="Pack Parfums de poches (5 parfums) — 10 000 FCFA"
      ctaHref="/coffret-signature"
    />
  ),
});
