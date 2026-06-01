import { createFileRoute } from "@tanstack/react-router";
import { Phone, Plus } from "lucide-react";
import { useState } from "react";

import { WhatsAppLogo } from "@/components/commerce/WhatsAppLogo";
import { Button } from "@/components/ui/button";
import { SiteLayout } from "@/components/commerce/SiteLayout";
import { displayPhone, secondPhone, whatsappUrl } from "@/lib/perfume-data";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Questions Fréquentes | 2M Parfumerie dakar" },
      {
        name: "description",
        content:
          "Toutes vos questions sur la livraison partout au dakar, l'authenticité, les paiements et les retours chez 2M Parfumerie.",
      },
      { property: "og:title", content: "FAQ — Questions Fréquentes | 2M Parfumerie dakar" },
      {
        property: "og:description",
        content:
          "Livraison partout au dakar, authenticité, paiements, retours et conseils parfum chez 2M Parfumerie.",
      },
    ],
    scripts: [{ type: "application/ld+json", children: faqJsonLd }],
  }),
  component: FaqPage,
});

const faqs = [
  {
    question: "Les parfums sont-ils 100% authentiques ?",
    answer:
      "Absolument. Tous nos parfums sont sourcés directement auprès de distributeurs certifiés. Nous ne vendons aucune imitation ou contrefaçon. Si vous avez le moindre doute après réception, contactez-nous immédiatement sur WhatsApp.",
  },
  {
    question: "Comment se passe la livraison au dakar ?",
    answer:
      "Nous livrons partout au dakar. Pour toute commande passée avant 21h, nous faisons le maximum pour livrer le jour même selon votre zone. Passé 21h, livraison garantie le lendemain ou selon les délais de transport vers votre région. Contactez-nous sur WhatsApp ou par appel pour confirmer votre localité.",
  },
  {
    question: "Quels sont les modes de paiement acceptés ?",
    answer:
      "Nous acceptons le paiement à la livraison (espèces), Orange Money et Wave. Nous n’acceptons pas Free Money. Vous payez uniquement quand le parfum est entre vos mains — aucun risque de votre côté.",
  },
  {
    question: "Puis-je retourner un produit si je ne suis pas satisfait(e) ?",
    answer:
      "Nous sommes fiers de la qualité de nos produits. Si un article arrive endommagé ou ne correspond pas à ce que vous avez commandé, contactez-nous dans les 24h sur WhatsApp avec une photo. Nous trouverons une solution.",
  },
  {
    question: "Comment savoir quel parfum me correspond ?",
    answer:
      "C'est notre spécialité. Écrivez-nous sur WhatsApp en décrivant votre style, l'occasion pour laquelle vous cherchez un parfum, et votre budget — nous vous conseillerons personnellement sur 2-3 options parfaites pour vous.",
  },
  {
    question: "Livrez-vous dans les régions du dakar ?",
    answer:
      "Oui, nous livrons partout dans les régions du dakar. Nous avons déjà des clients satisfaits de nos produits dans plusieurs régions ; contactez-nous sur WhatsApp ou par appel pour confirmer le délai et le mode de livraison adaptés à votre localité.",
  },
  {
    question: "Quelle est la différence entre vos collections ?",
    answer:
      "Chaque collection a son univers :\n· SCENTLAB — fragrances contemporaines et épurées\n· TAKEOFF FRAGANCE — signatures audacieuses et marquées\n· Dubai Perfumes — oud, rose, musc — l'Orient en flacon\n· Pocket Perfumes — formats voyage compacts\n· Authentic Perfumes — grandes maisons, originaux certifiés\n· Haqqi — sélection exclusive, qualité premium",
  },
  {
    question: "Comment passer une commande ?",
    answer:
      "C'est simple : trouvez votre parfum dans la boutique, cliquez sur 'Commander', et vous serez redirigé(e) vers WhatsApp avec le produit déjà mentionné dans le message. Vous pouvez aussi nous appeler directement via nos deux numéros pour commander ou poser vos questions.",
  },
];

// Add FAQ structured data for rich results
const faqJsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
});

function FaqPage() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <SiteLayout>
      <section className="bg-surface pt-24 pb-12 md:pt-32 md:pb-16">
        <div className="section-shell text-center">
          <p className="caption-luxe text-accent">On a les réponses</p>
          <h1 className="mt-4 font-display text-4xl font-semibold text-foreground md:text-[56px]">
            Questions fréquentes
          </h1>
        </div>
      </section>

      <section className="bg-background py-14 md:py-20">
        <div className="section-shell mx-auto max-w-3xl">
          <div className="divide-y divide-border border-y border-border">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={faq.question} className="py-5">
                  <button
                    type="button"
                    className="flex min-h-11 w-full items-center justify-between gap-6 text-left text-[15px] font-semibold text-foreground hover:text-accent"
                    aria-expanded={isOpen ? "true" : "false"}
                    aria-controls={`faq-answer-${index}`}
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  >
                    <span>{faq.question}</span>
                    <Plus
                      className={
                        isOpen
                          ? "size-5 shrink-0 rotate-45 text-accent transition-transform duration-300"
                          : "size-5 shrink-0 text-accent transition-transform duration-300"
                      }
                      aria-hidden="true"
                    />
                  </button>
                  <div
                    id={`faq-answer-${index}`}
                    className={
                      isOpen
                        ? "grid grid-rows-[1fr] opacity-100 transition-all duration-300"
                        : "grid grid-rows-[0fr] opacity-0 transition-all duration-300"
                    }
                  >
                    <div className="overflow-hidden">
                      <p className="whitespace-pre-line pb-2 pt-4 text-sm leading-[1.8] text-muted-foreground">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-16 text-center">
            <p className="caption-luxe text-accent">Autre question ?</p>
            <h2 className="mt-3 font-display text-[32px] text-foreground">
              On est sur WhatsApp et par téléphone.
            </h2>
            <Button asChild variant="whatsapp" size="lg" className="mt-6">
              <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
                <WhatsAppLogo tone="light" className="size-5" /> Nous écrire sur WhatsApp →
              </a>
            </Button>
            <div className="mt-5 flex flex-col items-center justify-center gap-3 text-sm text-muted-foreground sm:flex-row">
              <a
                href="tel:+221761923441"
                className="inline-flex min-h-11 items-center gap-2 hover:text-accent"
              >
                <Phone className="size-4" aria-hidden="true" /> {displayPhone}
              </a>
              <a
                href="tel:+221781441766"
                className="inline-flex min-h-11 items-center gap-2 hover:text-accent"
              >
                <Phone className="size-4" aria-hidden="true" /> {secondPhone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
