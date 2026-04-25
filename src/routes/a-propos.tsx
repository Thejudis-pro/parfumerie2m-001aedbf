import { createFileRoute } from "@tanstack/react-router";
import { Gem, MapPin, MessageCircle, Users } from "lucide-react";

import aboutHero from "@/assets/perfume-la-capitale-moscow.jpg";
import { Button } from "@/components/ui/button";
import { PerfumePlaceholder } from "@/components/commerce/PerfumePlaceholder";
import { SiteLayout } from "@/components/commerce/SiteLayout";
import { whatsappUrl } from "@/lib/perfume-data";

export const Route = createFileRoute("/a-propos")({
  head: () => ({
    meta: [
      { title: "Notre Histoire — 2M Parfumerie | Parfums Authentiques à Dakar" },
      {
        name: "description",
        content:
          "L'histoire derrière 2M Parfumerie — une mission dakaroise : rendre les parfums authentiques accessibles à tous.",
      },
      { property: "og:title", content: "Notre Histoire — 2M Parfumerie" },
      {
        property: "og:description",
        content: "Une mission dakaroise : rendre les parfums authentiques accessibles à tous.",
      },
    ],
  }),
  component: AboutPage,
});

const values = [
  {
    icon: Gem,
    title: "L'authenticité avant tout",
    body:
      "Chaque flacon est sourcé directement. Nous ne faisons aucun compromis sur la qualité — c'est notre engagement fondateur.",
  },
  {
    icon: Users,
    title: "Le parfum est personnel",
    body:
      "Il n'existe pas un parfum universel. C'est pour ça qu'on prend le temps de vous connaître avant de vous conseiller.",
  },
  {
    icon: MapPin,
    title: "Dakar, au cœur de tout",
    body:
      "Notre marché, c'est ici. Notre livraison, c'est ici. Notre équipe, c'est ici. Nous sommes un business dakarois, fiers de l'être.",
  },
];

function AboutPage() {
  return (
    <SiteLayout>
      <section className="relative overflow-hidden pt-48 pb-24">
        <img
          src={aboutHero}
          alt="Flacon précieux tenu dans une lumière dorée à Dakar"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-background/75" aria-hidden="true" />
        <div className="section-shell relative mx-auto max-w-2xl text-center">
          <p className="caption-luxe text-accent">Notre histoire</p>
          <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.1] text-foreground md:text-[64px]">
            Le parfum pour tous. L'authenticité sans compromis.
          </h1>
        </div>
      </section>

      <section className="bg-background py-24">
        <div className="section-shell grid gap-12 md:grid-cols-[40fr_60fr] md:items-center">
          <div className="fade-up overflow-hidden rounded-xl border border-border bg-surface shadow-card">
            <PerfumePlaceholder className="aspect-[3/4]" />
          </div>
          <div className="fade-up">
            <p className="caption-luxe text-accent">La genèse</p>
            <h2 className="mt-4 font-display text-[40px] font-medium leading-tight text-foreground">
              Né d'une passion, construit pour Dakar.
            </h2>
            <div className="mt-6 space-y-6 text-base leading-[1.9] text-muted-foreground">
              <p>
                À l'origine de 2M Parfumerie, il y a une conviction simple : le parfum de luxe
                ne devrait pas être réservé à une élite. Chaque Dakarois mérite de porter une
                fragrance authentique — celle qui lui ressemble, celle qui laisse une trace dans
                une pièce, celle dont on se souvient.
              </p>
              <p>
                Nous avons commencé par une passion, une sélection rigoureuse, et l'obsession
                d'une seule chose : vous livrer exactement ce que vous attendez. Pas des
                imitations. Pas des approximations. Des parfums vrais.
              </p>
              <p>
                Aujourd'hui, nos collections couvrent six univers olfactifs — du SCENTLAB épuré
                aux Dubai Perfumes orientaux — et notre équipe est disponible 7j/7 sur WhatsApp
                pour vous guider vers votre signature personnelle.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface-alt py-24">
        <div className="section-shell">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-[32px] font-medium text-foreground md:text-5xl">
              Ce en quoi nous croyons
            </h2>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {values.map(({ icon: Icon, title, body }, index) => (
              <article
                key={title}
                className="fade-up rounded-lg border border-border bg-surface p-8 text-center transition-all hover:border-accent"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <Icon className="mx-auto mb-7 size-10 text-accent" aria-hidden="true" />
                <h3 className="font-display text-2xl text-foreground">{title}</h3>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">{body}</p>
              </article>
            ))}
          </div>
          <div className="mt-16 text-center">
            <Button asChild variant="outline" size="lg">
              <a href={whatsappUrl()} target="_blank" rel="noreferrer">
                <MessageCircle aria-hidden="true" /> Discuter avec nous sur WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}