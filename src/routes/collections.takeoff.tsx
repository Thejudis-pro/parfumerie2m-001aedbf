import { createFileRoute } from "@tanstack/react-router";

import takeoffPoster from "@/assets/poster takeoff.jpeg";
import takeoffLineup from "@/assets/image des tdifferents produits.jpeg";
import { CollectionPage } from "@/components/commerce/CollectionPage";
import { WhatsAppLogo } from "@/components/commerce/WhatsAppLogo";
import { Button } from "@/components/ui/button";
import { whatsappUrl } from "@/lib/perfume-data";

const URL = "https://www.2mparfumeriedk.com/collections/takeoff";
const TITLE = "Takeoff Fragrance dakar — Scent of Journey | 2M Parfumerie";
const DESC =
  "Découvrez Takeoff, la collection voyage de 2M Parfumerie : 18 parfums inspirés des grandes villes du monde, à 40 000 FCFA l'unité (les 2 à 75 000 FCFA). Livraison partout au dakar, commande en gros disponible.";

export const Route = createFileRoute("/collections/takeoff")({
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
            { "@type": "ListItem", position: 3, name: "Takeoff", item: URL },
          ],
        }),
      },
    ],
  }),
  component: () => (
    <CollectionPage
      collection="takeoff"
      eyebrow="Collection Takeoff — Scent of Journey"
      h1="Takeoff — Scent of Journey, la collection voyage de 2M Parfumerie"
      intro="Takeoff est la collection signature de 2M Parfumerie : 18 parfums inspirés des grandes villes du monde — Los Angeles, Amsterdam, Dubai, Paris, Rome, Istanbul et bien d'autres. Chaque flacon (Eau de Parfum, 100 ml) est vendu à 40 000 FCFA l'unité — les 2 à 75 000 FCFA — et livré partout au dakar. Commandez sur WhatsApp et recevez votre Takeoff le jour même."
      heroImage={takeoffLineup}
      heroImageAlt="Sélection de parfums Takeoff Fragrance — collection 2M Parfumerie"
    >
      <section className="border-t border-border bg-surface-alt py-14 md:py-20">
        <div className="section-shell grid gap-10 md:grid-cols-[45fr_55fr] md:items-center md:gap-12">
          <div className="fade-up mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-xl border border-border bg-card shadow-card md:order-2 md:max-w-none">
            <img
              src={takeoffPoster}
              alt="2M Parfumerie, distributeur officiel Takeoff Fragrance au Sénégal"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="fade-up text-center md:order-1 md:text-left">
            <p className="caption-luxe text-accent">Pour les professionnels</p>
            <h2 className="mt-4 font-display text-[32px] font-medium text-foreground md:text-4xl">
              Commander en gros
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-[1.9] text-muted-foreground md:mx-0">
              Vous revendez ou souhaitez équiper votre commerce en parfums Takeoff ? À partir de 6
              unités, bénéficiez de tarifs de gros — communiqués directement sur demande via
              WhatsApp.
            </p>
            <Button asChild variant="whatsapp" size="lg" className="mt-8">
              <a
                href={whatsappUrl(
                  "Bonjour 2M Parfumerie, je souhaite commander des parfums Takeoff en gros (à partir de 6 unités). Merci de me communiquer vos tarifs.",
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsAppLogo tone="light" className="size-5" /> Commander en gros sur WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </section>
    </CollectionPage>
  ),
});
