import { createFileRoute } from "@tanstack/react-router";

import { ContactCards, SectionHeader } from "@/components/commerce/PageBlocks";
import { SiteLayout } from "@/components/commerce/SiteLayout";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "Contact | 2M Parfumerie Dakar" }, { name: "description", content: "Contactez 2M Parfumerie à Dakar par WhatsApp, téléphone, Instagram ou email pour commander votre parfum." }] }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <SiteLayout>
      <section className="pt-32 pb-20 md:pt-40">
        <div className="section-shell space-y-12">
          <SectionHeader eyebrow="Contact" title="Le parfum commence par un message." text="WhatsApp reste le chemin le plus rapide pour réserver, confirmer et recevoir votre fragrance." />
          <ContactCards />
        </div>
      </section>
    </SiteLayout>
  );
}