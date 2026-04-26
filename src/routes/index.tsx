import { Link, createFileRoute } from "@tanstack/react-router";
import { Check, MessageCircle, ShieldCheck, Truck, Wallet, Quote } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Ticker } from "@/components/commerce/PageBlocks";
import { SiteLayout } from "@/components/commerce/SiteLayout";
import { whatsappUrl } from "@/lib/perfume-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "2M Parfumerie — Parfums Authentiques à Dakar | Livraison Rapide" },
      {
        name: "description",
        content: "Découvrez +33 collections de parfums authentiques à Dakar. SCENTLAB, Dubai Perfumes, TAKEOFF Fragrance. Livraison le jour même, paiement à la livraison.",
      },
      { property: "og:title", content: "2M Parfumerie — Parfums Authentiques à Dakar" },
      {
        property: "og:description",
        content: "Découvrez +33 collections de parfums authentiques à Dakar. Livraison le jour même, paiement à la livraison.",
      },
    ],
  }),
  component: Index,
});

const heroMessage = "Bonjour 2M Parfumerie 👋 Je souhaite découvrir vos collections. Pouvez-vous m'aider ?";
const finalMessage = "Bonjour 2M Parfumerie 👋 Je cherche un parfum. Pouvez-vous m'aider ?";

const promises = [
  { icon: MessageCircle, title: "Réponse en moins d'1h", body: "Notre équipe WhatsApp est disponible 7j/7 pour vous aider à trouver votre fragrance." },
  { icon: ShieldCheck, title: "Authenticité certifiée", body: "Chaque flacon est contrôlé avant envoi. Zéro contrefaçon, zéro compromis." },
  { icon: Truck, title: "Livraison Dakar même jour", body: "Dakar et banlieue proches. Commandez avant 16h, recevez le soir même." },
  { icon: Wallet, title: "Paiement à la livraison", body: "Pas de carte, pas de risque. Vous payez quand le flacon est dans vos mains." },
];

const testimonials = [
  { quote: "J'avais essayé Monaco chez une amie aux Almadies et j'ai commandé le lendemain via WhatsApp. Le flacon est arrivé le soir même. Franchement impeccable.", name: "Khalil M.", location: "Les Almadies, Dakar", initials: "KM" },
  { quote: "Vienna sent exactement comme Delina mais sans casser la tirelire. Je l'porte au bureau chaque semaine. On me demande souvent où j'achète.", name: "Rokhaya S.", location: "Plateau, Dakar", initials: "RS" },
  { quote: "Je suis très regardant sur l'authenticité. J'ai commandé un Dubai Perfumes et la qualité est sans discussion. Ce sont de vrais parfums, pas des imitations.", name: "Ibrahima D.", location: "Sacré-Cœur, Dakar", initials: "ID" },
];

function Index() {
  return (
    <SiteLayout>
      <section className="relative min-h-screen overflow-hidden bg-background pt-24 md:pt-32">
        <div className="grid min-h-[calc(100vh-96px)] items-center md:grid-cols-[55fr_45fr]">
          <div className="section-shell z-10 order-2 py-10 md:order-1 md:w-auto md:pl-[max(2rem,calc((100vw-1180px)/2))] md:pr-10">
            <div className="max-w-2xl">
              <p className="caption-luxe mb-6 text-accent fade-up">Dakar · Parfumerie Authentique</p>
              <h1 className="fade-up font-display text-[40px] font-semibold leading-[1.1] text-foreground md:text-7xl" style={{ animationDelay: "120ms" }}>Votre signature olfactive, livrée à Dakar.</h1>
              <p className="fade-up mt-6 max-w-lg text-base text-muted-foreground md:text-lg" style={{ animationDelay: "240ms" }}>Le parfum n'est pas un luxe — c'est votre identité. +33 collections authentiques, disponibles maintenant.</p>
              <div className="fade-up mt-8 flex flex-col gap-3 sm:flex-row sm:items-center" style={{ animationDelay: "360ms" }}>
                <Button asChild size="lg">
                  <a href={whatsappUrl(heroMessage)} target="_blank" rel="noreferrer"><MessageCircle aria-hidden="true" /> Commander sur WhatsApp</a>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/boutique" search={{ collection: "all", price: "all" }}>Explorer la boutique</Link>
                </Button>
              </div>
              <div className="fade-up mt-8 flex flex-wrap gap-x-6 gap-y-2 text-xs text-muted-foreground" style={{ animationDelay: "480ms" }}>
                {["Livraison Dakar même jour", "Authenticité garantie", "Paiement à la livraison"].map((item) => <span key={item} className="inline-flex items-center gap-1"><Check className="size-3 text-accent" aria-hidden="true" /> {item}</span>)}
              </div>
            </div>
          </div>
          <div className="relative order-1 flex h-[50vh] items-center justify-center overflow-hidden bg-surface-alt md:order-2 md:h-full md:min-h-[calc(100vh-128px)]">
            <p className="max-w-xs text-center font-display text-4xl text-muted-foreground">Nouvelle sélection bientôt disponible</p>
          </div>
        </div>
      </section>

      <Ticker />

      <section className="bg-background py-24">
        <div className="section-shell text-center">
          <HomeHeader title="Nouvelle boutique en préparation" subtitle="Les produits seront ajoutés dès réception des nouvelles images." />
          <Button asChild variant="outline" size="lg"><Link to="/boutique" search={{ collection: "all", price: "all" }}>Voir la boutique</Link></Button>
        </div>
      </section>

      <section className="bg-background py-24">
        <div className="section-shell grid gap-12 md:grid-cols-[0.8fr_1.2fr]">
          <div className="fade-up"><h2 className="font-display text-[32px] font-medium text-foreground md:text-5xl">Notre Promesse</h2><p className="mt-6 max-w-sm text-muted-foreground">Chez 2M Parfumerie, chaque commande est une rencontre entre votre identité et le parfum parfait. Nous ne vendons pas des flacons — nous livrons des émotions.</p><Button asChild variant="outline" size="lg" className="mt-8"><Link to="/contact">Nous contacter</Link></Button></div>
          <div className="grid gap-4 sm:grid-cols-2">
            {promises.map(({ icon: Icon, title, body }, index) => <article key={title} className="fade-up rounded-lg border border-border bg-surface p-6 transition-all hover:border-accent" style={{ animationDelay: `${index * 80}ms` }}><Icon className="mb-6 text-accent" aria-hidden="true" /><h3 className="font-display text-2xl text-foreground">{title}</h3><p className="mt-3 text-sm text-muted-foreground">{body}</p></article>)}
          </div>
        </div>
      </section>

      <section className="bg-surface-alt py-24">
        <div className="section-shell">
          <HomeHeader title="Ce que Dakar dit de nous" subtitle="Des vraies personnes, de vraies fragrances." />
          <div className="flex snap-x gap-5 overflow-x-auto pb-4 md:grid md:grid-cols-3 md:overflow-visible">
            {testimonials.map((item, index) => <article key={item.name} className="fade-up min-w-[86%] snap-center rounded-lg border border-border bg-surface p-8 transition-all hover:border-accent-hover md:min-w-0" style={{ animationDelay: `${index * 80}ms` }}><div className="mb-4 text-xl text-accent">★★★★★</div><Quote className="mb-4 text-accent" aria-hidden="true" /><p className="text-sm text-muted-foreground">“{item.quote}”</p><div className="mt-6 flex items-center gap-3"><span className="flex size-10 items-center justify-center rounded-full bg-accent-muted text-sm font-semibold text-accent">{item.initials}</span><span><strong className="block text-sm text-foreground">{item.name}</strong><small className="text-muted-foreground">{item.location}</small></span></div></article>)}
          </div>
        </div>
      </section>

      <section className="final-cta-bg border-t border-border py-20">
        <div className="section-shell mx-auto max-w-2xl text-center"><p className="caption-luxe mb-4 text-accent">Trouvez votre signature</p><h2 className="font-display text-[32px] leading-[1.2] text-foreground md:text-5xl">Votre parfum parfait est à un message WhatsApp.</h2><p className="mt-4 text-muted-foreground">Décrivez-nous votre style, votre occasion, votre budget — on s'occupe du reste.</p><Button asChild size="lg" className="mt-8 min-h-14 px-10 py-5 text-[15px]"><a href={whatsappUrl(finalMessage)} target="_blank" rel="noreferrer"><MessageCircle className="mr-1 size-5" aria-hidden="true" /> Démarrer sur WhatsApp</a></Button></div>
      </section>
    </SiteLayout>
  );
}

function HomeHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return <div className="mb-16 text-center"><h2 className="font-display text-[32px] font-medium text-foreground md:text-5xl">{title}</h2><p className="mt-4 text-muted-foreground">{subtitle}</p></div>;
}