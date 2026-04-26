import { createFileRoute } from "@tanstack/react-router";
import { Clock, MapPinned, MessageCircle } from "lucide-react";

import { SectionHeader, WhatsAppBand } from "@/components/commerce/PageBlocks";
import { SiteLayout } from "@/components/commerce/SiteLayout";

export const Route = createFileRoute("/livraison")({
  head: () => ({ meta: [{ title: "Livraison | 2M Parfumerie Sénégal" }, { name: "description", content: "Informations de livraison et confirmation WhatsApp pour vos commandes 2M Parfumerie partout au Sénégal." }] }),
  component: DeliveryPage,
});

function DeliveryPage() {
  const steps = [
    { icon: MessageCircle, title: "Commande", text: "Envoyez votre choix sur WhatsApp avec le parfum, l’édition et vos coordonnées." },
    { icon: Clock, title: "Confirmation", text: "Nous confirmons disponibilité, prix, délai et zone avant toute validation." },
    { icon: MapPinned, title: "Réception", text: "La remise est organisée selon votre localisation au Sénégal et votre disponibilité." },
  ];
  return (
    <SiteLayout>
      <section className="pt-24 pb-16 md:pt-40 md:pb-20">
        <div className="section-shell space-y-10 md:space-y-12">
          <SectionHeader eyebrow="Livraison" title="Une commande simple, suivie et humaine." text="Chaque détail est confirmé sur WhatsApp pour éviter les surprises et garder l’expérience fluide." />
          <div className="grid gap-4 md:grid-cols-3 md:gap-5">
            {steps.map(({ icon: Icon, title, text }, index) => (
              <article key={title} className="fade-up rounded-lg border border-border bg-card p-6 shadow-card" style={{ animationDelay: `${index * 80}ms` }}>
                <Icon className="mb-8 text-accent" aria-hidden="true" />
                <h3 className="text-2xl text-foreground">{title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <WhatsAppBand />
    </SiteLayout>
  );
}