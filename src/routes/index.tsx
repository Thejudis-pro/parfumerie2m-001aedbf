import { Link, createFileRoute } from "@tanstack/react-router";
import { Check, MessageCircle, ShieldCheck, Truck, Wallet, Quote, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Ticker } from "@/components/commerce/PageBlocks";
import { SiteLayout } from "@/components/commerce/SiteLayout";
import { products, whatsappUrl } from "@/lib/perfume-data";

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

const collections = [
  { slug: "scentlab", image: products[7].image, label: "SCENTLAB", sub: "14 fragrances · Épuré & contemporain", badge: "14 parfums" },
  { slug: "takeoff", image: products[0].image, label: "TAKEOFF FRAGANCE", sub: "19 fragrances · Signature & audace", badge: "19 parfums" },
  { slug: "dubai", image: products[2].image, label: "DUBAI PERFUMES", sub: "Oud, rose, musc · L'Orient en flacon", badge: "Exclusif" },
  { slug: "pocket", image: products[4].image, label: "POCKET PERFUMES", sub: "Format voyage · Toujours avec vous", badge: "Nomade" },
  { slug: "authentic", image: products[1].image, label: "AUTHENTIC PERFUMES", sub: "Originaux certifiés · Sans compromis", badge: "Certifié" },
  { slug: "haqqi", image: products[5].image, label: "HAQQI", sub: "La vérité en parfum · Sélection exclusive", badge: "Premium" },
];

const bestSellers = [
  { image: products[7].image, name: "Creamy Almond", ref: "Hypnotic Poison · SCENTLAB", notes: "Noix de coco · Prune · Vanille", price: "6 000 FCFA" },
  { image: products[4].image, name: "Vienna", ref: "Delina · Parfums de Marly · SCENTLAB", notes: "Pivoine · Litchi · Musc blanc", price: "12 000 FCFA" },
  { image: products[3].image, name: "Monaco", ref: "Xerjoff 40 Knots · SCENTLAB", notes: "Bergamote · Iris · Bois de santal", price: "18 000 FCFA" },
  { image: products[6].image, name: "Rosy Hazelnut", ref: "Amouage Guidance · SCENTLAB", notes: "Rose · Noisette · Ambre", price: "15 000 FCFA" },
];

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
                  <Link to="/boutique">Explorer la boutique</Link>
                </Button>
              </div>
              <div className="fade-up mt-8 flex flex-wrap gap-x-6 gap-y-2 text-xs text-muted-foreground" style={{ animationDelay: "480ms" }}>
                {["Livraison Dakar même jour", "Authenticité garantie", "Paiement à la livraison"].map((item) => <span key={item} className="inline-flex items-center gap-1"><Check className="size-3 text-accent" aria-hidden="true" /> {item}</span>)}
              </div>
            </div>
          </div>
          <div className="relative order-1 h-[50vh] overflow-hidden md:order-2 md:h-full md:min-h-[calc(100vh-128px)]">
            <img src={products[2].image} alt="Flacon de parfum oriental doré disponible chez 2M Parfumerie" className="h-full w-full object-cover md:translate-y-[-10px]" />
            <div className="hero-image-overlay absolute inset-0" aria-hidden="true" />
          </div>
        </div>
      </section>

      <Ticker />

      <section className="bg-background py-24">
        <div className="section-shell">
          <HomeHeader title="Nos Collections" subtitle="Six univers olfactifs, un seul endroit." />
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {collections.map((collection, index) => (
              <Link key={collection.slug} to="/boutique" search={{ collection: collection.slug }} className="fade-up group overflow-hidden rounded-lg border border-border bg-surface transition-all duration-300 hover:-translate-y-1.5 hover:border-accent" style={{ animationDelay: `${index * 80}ms` }}>
                <div className="image-zoom aspect-[4/3] overflow-hidden"><img src={collection.image} alt={`Collection ${collection.label} chez 2M Parfumerie`} className="h-full w-full object-cover" loading="lazy" /></div>
                <div className="p-6 pb-4"><span className="rounded-full bg-accent-muted px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-accent">{collection.badge}</span><h3 className="mt-3 font-display text-2xl text-foreground">{collection.label}</h3><p className="mt-2 text-[13px] text-muted-foreground">{collection.sub}</p></div>
                <div className="px-6 pb-6"><span className="text-xs font-semibold uppercase tracking-[0.12em] text-accent">Explorer →</span></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface-alt py-24">
        <div className="section-shell">
          <HomeHeader title="Meilleures Ventes" subtitle="Les parfums que Dakar s'arrache." />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {bestSellers.map((product, index) => (
              <article key={product.name} className="fade-up group overflow-hidden rounded-lg border border-border bg-card shadow-card transition-all hover:-translate-y-1.5 hover:border-accent" style={{ animationDelay: `${index * 80}ms` }}>
                <div className="image-zoom relative aspect-square overflow-hidden bg-surface"><span className="absolute left-3 top-3 z-10 rounded-full bg-accent px-2 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-primary-foreground">Bestseller</span><img src={product.image} alt={`${product.name} chez 2M Parfumerie`} className="h-full w-full object-cover" loading="lazy" /></div>
                <div className="p-5"><p className="mb-1 text-[11px] uppercase tracking-[0.1em] text-muted-foreground">{product.ref}</p><h3 className="mb-1 font-display text-[22px] text-foreground">{product.name}</h3><p className="mb-4 text-xs italic text-muted-foreground">{product.notes}</p><div className="flex items-center justify-between gap-3"><p className="font-body text-xl font-semibold text-accent">{product.price}</p><Button asChild size="sm"><a href={whatsappUrl(`Bonjour 2M Parfumerie, je souhaite commander ${product.name} à ${product.price}.`)} target="_blank" rel="noreferrer">Commander</a></Button></div></div>
              </article>
            ))}
          </div>
          <div className="mt-12 text-center"><Link to="/boutique" className="text-[13px] font-semibold uppercase tracking-[0.12em] text-accent underline-offset-4 hover:underline">Voir toutes les collections →</Link></div>
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