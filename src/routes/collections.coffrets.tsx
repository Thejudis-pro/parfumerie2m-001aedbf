import { createFileRoute } from "@tanstack/react-router";

import { CollectionPage } from "@/components/commerce/CollectionPage";

const URL = "https://www.2mparfumeriedk.com/collections/coffrets";
const TITLE = "Coffrets parfums dakar | 2M Parfumerie";
const DESC =
  "Découvrez les coffrets de 2M Parfumerie : des ensembles de parfums prêts à offrir, livrés partout au dakar. Commandez sur WhatsApp.";

export const Route = createFileRoute("/collections/coffrets")({
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
            { "@type": "ListItem", position: 3, name: "Coffrets", item: URL },
          ],
        }),
      },
    ],
  }),
  component: () => (
    <CollectionPage
      collection="coffrets"
      eyebrow="Coffrets"
      h1="Coffrets — Des ensembles de parfums prêts à offrir"
      intro="Les Coffrets 2M Parfumerie rassemblent plusieurs parfums dans un même ensemble, parfaits pour offrir ou pour se faire plaisir. Livraison partout au dakar, avec confirmation directe avec le gérant."
      ctaLabel="Composer mon pack"
      ctaHref="/coffret-signature"
    />
  ),
});
