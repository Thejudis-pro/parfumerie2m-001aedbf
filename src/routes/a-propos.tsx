import { createFileRoute } from "@tanstack/react-router";
import logo from "@/assets/logo-2m-parfumerie.jpg";

import { SectionHeader, WhatsAppBand } from "@/components/commerce/PageBlocks";
import { SiteLayout } from "@/components/commerce/SiteLayout";

export const Route = createFileRoute("/a-propos")({
  head: () => ({ meta: [{ title: "À Propos | 2M Parfumerie Dakar" }, { name: "description", content: "Découvrez 2M Parfumerie, une adresse dakaroise dédiée aux parfums authentiques et accessibles." }] }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <SiteLayout>
      <section className="pt-32 pb-20 md:pt-40">
        <div className="section-shell grid items-center gap-10 md:grid-cols-[0.75fr_1fr]">
          <div className="overflow-hidden rounded-lg border border-border bg-card p-6 shadow-card">
            <img src={logo} alt="Logo 2M Parfumerie Dakar" className="w-full rounded-md" />
          </div>
          <div className="fade-up">
            <SectionHeader eyebrow="Notre maison" title="Une parfumerie dakaroise, intime et exigeante." />
            <div className="mt-8 space-y-5 text-muted-foreground">
              <p>2M Parfumerie accompagne les amoureux du parfum qui veulent une signature personnelle sans renoncer à l’accessibilité.</p>
              <p>Notre rôle est simple : proposer des fragrances désirables, guider chaque choix avec sincérité, puis rendre la commande rapide par WhatsApp.</p>
              <p>À Dakar, le parfum est une présence. Nous aidons chaque client à choisir celle qui lui ressemble.</p>
            </div>
          </div>
        </div>
      </section>
      <WhatsAppBand />
    </SiteLayout>
  );
}