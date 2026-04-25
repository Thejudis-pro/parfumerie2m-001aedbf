import { createFileRoute } from "@tanstack/react-router";

import { SectionHeader, WhatsAppBand } from "@/components/commerce/PageBlocks";
import { SiteLayout } from "@/components/commerce/SiteLayout";

export const Route = createFileRoute("/faq")({
  head: () => ({ meta: [{ title: "FAQ | 2M Parfumerie Dakar" }, { name: "description", content: "Questions fréquentes sur les commandes, prix, disponibilité et livraison chez 2M Parfumerie." }] }),
  component: FaqPage,
});

const faqs = [
  ["Comment commander ?", "Cliquez sur Commander sur WhatsApp, envoyez le message pré-rempli, puis nous confirmons disponibilité, livraison et paiement."],
  ["Les prix sont-ils fixes ?", "Les parfums affichés sont à 25.000f. Toute précision de disponibilité est confirmée avant validation de la commande."],
  ["Livrez-vous à Dakar ?", "Oui, les détails de livraison sont organisés directement sur WhatsApp selon votre zone et votre disponibilité."],
  ["Puis-je demander conseil ?", "Oui. Décrivez votre style, l’occasion ou un parfum que vous aimez déjà, et nous vous orientons vers le bon sillage."],
];

function FaqPage() {
  return (
    <SiteLayout>
      <section className="pt-32 pb-20 md:pt-40">
        <div className="section-shell space-y-12">
          <SectionHeader eyebrow="FAQ" title="Des réponses claires avant de commander." />
          <div className="grid gap-4 md:grid-cols-2">
            {faqs.map(([question, answer], index) => (
              <article key={question} className="fade-up rounded-lg border border-border bg-card p-6 shadow-card" style={{ animationDelay: `${index * 80}ms` }}>
                <h3 className="text-2xl text-foreground">{question}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <WhatsAppBand />
    </SiteLayout>
  );
}