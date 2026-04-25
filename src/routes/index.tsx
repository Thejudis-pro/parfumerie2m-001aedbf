import { createFileRoute } from "@tanstack/react-router";
import { MessageCircle, ShieldCheck, Sparkles, Truck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { BoutiqueLink, ProductGrid, SectionHeader, Ticker, WhatsAppBand } from "@/components/commerce/PageBlocks";
import { SiteLayout } from "@/components/commerce/SiteLayout";
import { products, whatsappUrl } from "@/lib/perfume-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "2M Parfumerie Dakar | Parfums authentiques" },
      { name: "description", content: "Découvrez des parfums authentiques à Dakar et commandez rapidement sur WhatsApp avec 2M Parfumerie." },
    ],
  }),
  component: Index,
});

function Index() {
  const hero = products[1];
  return (
    <SiteLayout>
      <section className="relative min-h-[92vh] overflow-hidden pt-24 md:min-h-[88vh]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_62%_38%,var(--accent-muted),transparent_34%)]" aria-hidden="true" />
        <div className="section-shell relative grid min-h-[calc(92vh-96px)] items-center gap-10 pb-14 md:grid-cols-[1fr_0.85fr]">
          <div className="fade-up max-w-3xl">
            <p className="caption-luxe text-accent">Dakar · Parfums authentiques</p>
            <h1 className="mt-5 font-display text-[40px] font-semibold leading-[1.1] text-foreground md:text-7xl">
              2M Parfumerie, le sillage qui parle avant vous.
            </h1>
            <p className="mt-6 max-w-xl text-base text-muted-foreground md:text-lg">
              Des fragrances désirables, accessibles et choisies avec soin pour celles et ceux qui veulent signer leur présence à Dakar.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="whatsapp" size="lg">
                <a href={whatsappUrl()} target="_blank" rel="noreferrer"><MessageCircle aria-hidden="true" /> Commander sur WhatsApp</a>
              </Button>
              <BoutiqueLink />
            </div>
          </div>
          <div className="fade-up image-zoom mx-auto w-full max-w-md overflow-hidden rounded-lg border border-border bg-surface shadow-card md:max-w-none">
            <img src={hero.image} alt="Baccarat Rouge disponible chez 2M Parfumerie Dakar" className="aspect-square w-full object-cover" />
          </div>
        </div>
      </section>
      <Ticker />
      <section className="py-20 md:py-28">
        <div className="section-shell space-y-12">
          <SectionHeader eyebrow="Sélection signature" title="Les parfums que Dakar remarque." text="Chaque flacon est présenté avec son caractère, son humeur et son prix clair. Vous choisissez, nous finalisons sur WhatsApp." />
          <ProductGrid limit={4} />
        </div>
      </section>
      <section className="bg-surface py-20 md:py-28">
        <div className="section-shell grid gap-6 md:grid-cols-3">
          {[
            { icon: ShieldCheck, title: "Authenticité recherchée", text: "Une sélection rigoureuse pour proposer des parfums crédibles, beaux et portables au quotidien." },
            { icon: Sparkles, title: "Conseil personnel", text: "Vous hésitez entre deux sillages ? Écrivez-nous, nous orientons selon votre style et l’occasion." },
            { icon: Truck, title: "Commande fluide", text: "Le prix, la disponibilité et la livraison sont confirmés directement sur WhatsApp, sans friction." },
          ].map(({ icon: Icon, title, text }, index) => (
            <article key={title} className="fade-up rounded-lg border border-border bg-card p-6 shadow-card" style={{ animationDelay: `${index * 80}ms` }}>
              <Icon className="mb-8 text-accent" aria-hidden="true" />
              <h3 className="text-2xl text-foreground">{title}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{text}</p>
            </article>
          ))}
        </div>
      </section>
      <WhatsAppBand />
    </SiteLayout>
  );
}