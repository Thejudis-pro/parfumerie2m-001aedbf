import { Link, createFileRoute } from "@tanstack/react-router";
import { Check, MessageCircle, ShieldCheck, Truck, Wallet, Quote } from "lucide-react";

import { Button } from "@/components/ui/button";
import { AddToCartButton } from "@/components/commerce/AddToCartButton";
import { Ticker } from "@/components/commerce/PageBlocks";
import { SiteLayout } from "@/components/commerce/SiteLayout";
import homeHeroBottle from "@/assets/home-white-bottle.png";
import { catalog, formatPrice, slugifyProduct } from "@/lib/catalog-data";
import { whatsappUrl } from "@/lib/perfume-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "2M Parfumerie — Parfums Authentiques au Sénégal" },
      {
        name: "description",
        content:
          "Découvrez +100 collections de parfums authentiques au Sénégal. SCENTLAB, Dubai Perfumes, TAKEOFF Fragrance. Livraison partout au Sénégal, paiement à la livraison.",
      },
      { property: "og:title", content: "2M Parfumerie — Parfums Authentiques au Sénégal" },
      {
        property: "og:description",
        content:
          "Découvrez +100 collections de parfums authentiques au Sénégal. Livraison partout au Sénégal, paiement à la livraison.",
      },
    ],
  }),
  component: Index,
});

const heroMessage =
  "Bonjour 2M Parfumerie 👋 Je souhaite découvrir vos collections. Pouvez-vous m'aider ?";
const finalMessage = "Bonjour 2M Parfumerie 👋 Je cherche un parfum. Pouvez-vous m'aider ?";
const featuredProducts = catalog.slice(0, 4);

const promises = [
  {
    icon: MessageCircle,
    title: "Réponse en moins d'1h",
    body: "Notre équipe WhatsApp est disponible 7j/7 pour vous aider à trouver votre fragrance.",
  },
  {
    icon: ShieldCheck,
    title: "Authenticité certifiée",
    body: "Chaque flacon est contrôlé avant envoi. Zéro contrefaçon, zéro compromis.",
  },
  {
    icon: Truck,
    title: "Livraison Sénégal",
    body: "Partout au Sénégal. Commandez avant 21h, nous confirmons le meilleur délai selon votre zone.",
  },
  {
    icon: Wallet,
    title: "Paiement à la livraison",
    body: "Pas de carte, pas de risque. Vous payez quand le flacon est dans vos mains.",
  },
];

const testimonials = [
  {
    quote: "Kyoto sent exactement comme Amouage guidance mais sans casser la tirelire. Je l'porte au bureau chaque semaine. On me demande souvent où j'achète.",
    name: "Khalil M.",
    location: "Les Almadies, Sénégal",
    initials: "KM",
  },
  {
    quote: "J'ai essayé Takeoff Paris qui a la même senteur que Baccarat Rouge chez une amie. Je l'ai commandé le lendemain via Whatsapp et le flacon est arrivé le soir même. Franchement impeccable!",
    name: "Rokhaya S.",
    location: "Plateau, Sénégal",
    initials: "RS",
  },
  {
    quote:
      "Je suis très regardant sur l'authenticité. J'ai commandé un Dubai Perfumes et la qualité est sans discussion. Ce sont de vrais parfums, pas des imitations.",
    name: "Ibrahima D.",
    location: "Sacré-Cœur, Sénégal",
    initials: "ID",
  },
];

function Index() {
  return (
    <SiteLayout>
      <section className="relative overflow-hidden bg-background pt-24 md:min-h-screen md:pt-32">
        <div className="grid items-center md:min-h-[calc(100vh-96px)] md:grid-cols-[55fr_45fr]">
          <div className="section-shell z-10 order-1 py-8 md:w-auto md:py-10 md:pl-[max(2rem,calc((100vw-1180px)/2))] md:pr-10">
            <div className="max-w-2xl">
              <p className="caption-luxe mb-6 text-accent fade-up">
                Sénégal · Parfumerie Authentique
              </p>
              <h1
                className="fade-up font-display text-4xl font-semibold leading-[1.1] text-foreground md:text-7xl"
                style={{ animationDelay: "120ms" }}
              >
                Votre signature olfactive, livrée au Sénégal.
              </h1>
              <p
                className="fade-up mt-6 max-w-lg text-base text-muted-foreground md:text-lg"
                style={{ animationDelay: "240ms" }}
              >
                Le parfum n'est pas un luxe — c'est votre identité. +100 collections authentiques,
                disponibles maintenant.
              </p>
              <div
                className="fade-up mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
                style={{ animationDelay: "360ms" }}
              >
                <Button asChild variant="whatsapp" size="lg">
                  <a href={whatsappUrl(heroMessage)} target="_blank" rel="noreferrer">
                    <MessageCircle className="size-5" aria-hidden="true" /> Commander sur WhatsApp
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/boutique" search={{ collection: "all", price: "all" }}>
                    Explorer la boutique
                  </Link>
                </Button>
              </div>
              <div
                className="fade-up mt-8 flex flex-wrap gap-x-6 gap-y-2 text-xs text-muted-foreground"
                style={{ animationDelay: "480ms" }}
              >
                {["Livraison Sénégal", "Authenticité garantie", "Paiement à la livraison"].map(
                  (item) => (
                    <span key={item} className="inline-flex items-center gap-1">
                      <Check className="size-3 text-accent" aria-hidden="true" /> {item}
                    </span>
                  ),
                )}
              </div>
            </div>
          </div>
          <div className="relative order-2 h-[42vh] min-h-[300px] overflow-hidden bg-surface-alt md:h-full md:min-h-[calc(100vh-128px)]">
            <img
              src={homeHeroBottle}
              alt="Flacon blanc SCENTLAB chez 2M Parfumerie"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <Ticker />

      <section className="bg-background py-16 md:py-24">
        <div className="section-shell text-center">
          <HomeHeader
            title="TAKEOFF Fragrance"
            subtitle="La nouvelle sélection Scent of Journey est disponible."
          />
          <div className="grid gap-6 text-left sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product, index) => (
              <article
                key={product.name}
                className="fade-up group overflow-hidden rounded-lg border border-border bg-card shadow-card transition-all hover:-translate-y-1.5 hover:border-accent"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <div className="image-zoom relative aspect-square overflow-hidden bg-surface">
                  <img
                    src={product.image}
                    alt={`${product.name} TAKEOFF Fragrance chez 2M Parfumerie`}
                    className="h-full w-full object-contain p-5 transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-5">
                  <p className="mb-1 text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
                    {product.ref}
                  </p>
                  <h3 className="mb-1 font-display text-[22px] text-foreground">{product.name}</h3>
                  <p className="mb-4 text-xs italic text-muted-foreground">{product.notes}</p>
                  <p className="mb-4 font-body text-xl font-semibold text-accent">
                    {formatPrice(product.price)}
                  </p>
                  <AddToCartButton
                    item={{
                      id: slugifyProduct(product),
                      name: product.name,
                      collection: "TAKEOFF FRAGANCE",
                      price: product.price,
                      imageUrl: product.image,
                    }}
                  />
                </div>
              </article>
            ))}
          </div>
          <Button asChild variant="outline" size="lg" className="mt-12">
            <Link to="/boutique" search={{ collection: "takeoff", price: "all" }}>
              Voir toute la sélection
            </Link>
          </Button>
        </div>
      </section>

      <section className="bg-background py-16 md:py-24">
        <div className="section-shell grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-12">
          <div className="fade-up">
            <h2 className="font-display text-[32px] font-medium text-foreground md:text-5xl">
              Notre Promesse
            </h2>
            <p className="mt-6 max-w-sm text-muted-foreground">
              Chez 2M Parfumerie, chaque commande est une rencontre entre votre identité et le
              parfum parfait. Nous ne vendons pas des flacons — nous livrons des émotions.
            </p>
            <Button asChild variant="outline" size="lg" className="mt-8">
              <Link to="/contact">Nous contacter</Link>
            </Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {promises.map(({ icon: Icon, title, body }, index) => (
              <article
                key={title}
                className="fade-up rounded-lg border border-border bg-surface p-6 transition-all hover:border-accent"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <Icon className="mb-6 text-accent" aria-hidden="true" />
                <h3 className="font-display text-2xl text-foreground">{title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface-alt py-16 md:py-24">
        <div className="section-shell">
          <HomeHeader
            title="Ce que le Sénégal dit de nous"
            subtitle="Des vraies personnes, de vraies fragrances."
          />
          <div className="flex snap-x gap-5 overflow-x-auto pb-4 md:grid md:grid-cols-3 md:overflow-visible">
            {testimonials.map((item, index) => (
              <article
                key={item.name}
                className="fade-up min-w-[86%] snap-center rounded-lg border border-border bg-surface p-8 transition-all hover:border-accent-hover md:min-w-0"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <div className="mb-4 text-xl text-accent">★★★★★</div>
                <Quote className="mb-4 text-accent" aria-hidden="true" />
                <p className="text-sm text-muted-foreground">“{item.quote}”</p>
                <div className="mt-6 flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-full bg-accent-muted text-sm font-semibold text-accent">
                    {item.initials}
                  </span>
                  <span>
                    <strong className="block text-sm text-foreground">{item.name}</strong>
                    <small className="text-muted-foreground">{item.location}</small>
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="final-cta-bg border-t border-border py-16 md:py-20">
        <div className="section-shell mx-auto max-w-2xl text-center">
          <p className="caption-luxe mb-4 text-accent">Trouvez votre signature</p>
          <h2 className="font-display text-[32px] leading-[1.2] text-foreground md:text-5xl">
            Votre parfum parfait est à un message WhatsApp.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Décrivez-nous votre style, votre occasion, votre budget — on s'occupe du reste.
          </p>
          <Button
            asChild
            variant="whatsapp"
            size="lg"
            className="mt-8 min-h-14 px-10 py-5 text-[15px]"
          >
            <a href={whatsappUrl(finalMessage)} target="_blank" rel="noreferrer">
              <MessageCircle className="size-5" aria-hidden="true" /> Démarrer sur WhatsApp
            </a>
          </Button>
        </div>
      </section>
    </SiteLayout>
  );
}

function HomeHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-16 text-center">
      <h2 className="font-display text-[32px] font-medium text-foreground md:text-5xl">{title}</h2>
      <p className="mt-4 text-muted-foreground">{subtitle}</p>
    </div>
  );
}
