import { Link } from "@tanstack/react-router";
import { ArrowRight, Instagram, Mail, MapPin, MessageCircle, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { displayPhone, email, instagram, products, secondPhone, whatsappUrl } from "@/lib/perfume-data";
import { ProductCard } from "./ProductCard";

export function SectionHeader({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <div className="fade-up mx-auto max-w-3xl text-center">
      <p className="caption-luxe text-accent">{eyebrow}</p>
      <h2 className="mt-3 font-display text-[32px] font-medium leading-[1.2] text-foreground md:text-5xl">{title}</h2>
      {text && <p className="mt-5 text-muted-foreground">{text}</p>}
    </div>
  );
}

export function ProductGrid({ limit }: { limit?: number }) {
  const shown = limit ? products.slice(0, limit) : products;
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {shown.map((product, index) => <ProductCard key={product.id} product={product} index={index} />)}
    </div>
  );
}

export function Ticker() {
  const items = ["Authenticité", "Dakar", "Sillage", "WhatsApp", "25.000f", "Élégance", "Livraison", "Conseil"];
  return (
    <div className="overflow-hidden border-y border-border bg-surface py-4" aria-hidden="true">
      <div className="ticker-track flex w-max gap-10">
        {[...items, ...items, ...items, ...items].map((item, index) => (
          <span key={`${item}-${index}`} className="caption-luxe text-muted-foreground">{item}</span>
        ))}
      </div>
    </div>
  );
}

export function WhatsAppBand() {
  return (
    <section className="bg-accent-muted py-16">
      <div className="section-shell flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
        <div className="max-w-2xl">
          <p className="caption-luxe text-accent">Commande directe</p>
          <h2 className="mt-3 font-display text-[32px] leading-tight md:text-5xl">Un parfum choisi, un message envoyé, une réponse humaine.</h2>
        </div>
        <Button asChild variant="whatsapp" size="lg">
          <a href={whatsappUrl()} target="_blank" rel="noreferrer"><MessageCircle aria-hidden="true" /> Commander sur WhatsApp</a>
        </Button>
      </div>
    </section>
  );
}

export function ContactCards() {
  const cards = [
    { icon: MessageCircle, label: "WhatsApp", value: displayPhone, href: whatsappUrl() },
    { icon: Phone, label: "Téléphone", value: secondPhone, href: "tel:+221781441766" },
    { icon: Instagram, label: "Instagram", value: instagram, href: "https://instagram.com/2mparfumeriesn" },
    { icon: Mail, label: "Email", value: email, href: `mailto:${email}` },
  ];
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map(({ icon: Icon, label, value, href }) => (
        <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="min-h-32 rounded-lg border border-border bg-card p-5 shadow-card transition-all hover:-translate-y-1 hover:border-accent">
          <Icon className="mb-5 text-accent" aria-hidden="true" />
          <p className="caption-luxe text-muted-foreground">{label}</p>
          <p className="mt-2 font-medium text-foreground">{value}</p>
        </a>
      ))}
      <div className="rounded-lg border border-border bg-card p-5 shadow-card sm:col-span-2 lg:col-span-4">
        <MapPin className="mb-5 text-accent" aria-hidden="true" />
        <p className="caption-luxe text-muted-foreground">Zone</p>
        <p className="mt-2 font-display text-2xl text-foreground">Dakar, Sénégal — commandes et livraisons coordonnées sur WhatsApp.</p>
      </div>
    </div>
  );
}

export function BoutiqueLink() {
  return (
    <Button asChild variant="outline" size="lg">
      <Link to="/boutique">Voir la boutique <ArrowRight aria-hidden="true" /></Link>
    </Button>
  );
}