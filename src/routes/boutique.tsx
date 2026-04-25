import { createFileRoute } from "@tanstack/react-router";

import { ProductGrid, SectionHeader, WhatsAppBand } from "@/components/commerce/PageBlocks";
import { SiteLayout } from "@/components/commerce/SiteLayout";

export const Route = createFileRoute("/boutique")({
  head: () => ({ meta: [{ title: "Boutique | 2M Parfumerie Dakar" }, { name: "description", content: "Parcourez la boutique 2M Parfumerie et commandez vos parfums authentiques à Dakar sur WhatsApp." }] }),
  component: BoutiquePage,
});

function BoutiquePage() {
  return (
    <SiteLayout>
      <section className="pt-32 pb-16 md:pt-40">
        <div className="section-shell space-y-12">
          <SectionHeader eyebrow="Boutique" title="Tous les sillages disponibles." text="Une sélection courte, lisible et pensée pour commander vite depuis mobile." />
          <ProductGrid />
        </div>
      </section>
      <WhatsAppBand />
    </SiteLayout>
  );
}