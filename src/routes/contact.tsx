import { createFileRoute } from "@tanstack/react-router";
import { Instagram, Mail, MapPin, MessageCircle, Phone } from "lucide-react";

import { SiteLayout } from "@/components/commerce/SiteLayout";
import { displayPhone, email, instagram, secondPhone, whatsappUrl } from "@/lib/perfume-data";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — 2M Parfumerie Dakar | WhatsApp & Téléphone" },
      {
        name: "description",
        content:
          "Contactez 2M Parfumerie à Dakar. WhatsApp disponible 7j/7. Livraison Dakar et banlieue. commande@2mparfumerie.com",
      },
      { property: "og:title", content: "Contact — 2M Parfumerie Dakar" },
      {
        property: "og:description",
        content: "WhatsApp disponible 7j/7. Livraison Dakar et banlieue proche.",
      },
    ],
  }),
  component: ContactPage,
});

const schedules = [
  ["Lundi – Vendredi", "08h – 20h"],
  ["Samedi", "09h – 20h"],
  ["Dimanche", "10h – 18h"],
];

function ContactPage() {
  return (
    <SiteLayout>
      <section className="bg-surface pt-32 pb-16">
        <div className="section-shell text-center">
          <p className="caption-luxe text-accent">Nous sommes là</p>
          <h1 className="mt-4 font-display text-4xl font-semibold text-foreground md:text-[56px]">
            Parlons parfums.
          </h1>
        </div>
      </section>

      <section className="bg-background py-20">
        <div className="section-shell grid gap-12 md:grid-cols-2 md:gap-16">
          <div className="fade-up">
            <h2 className="mb-8 font-display text-[32px] text-foreground">Comment nous joindre</h2>
            <div className="space-y-8">
              <ContactItem icon={<MessageCircle className="size-7 text-whatsapp" aria-hidden="true" />} label="WhatsApp — Disponible 7j/7">
                <a href={whatsappUrl()} target="_blank" rel="noreferrer" className="text-lg font-semibold text-foreground hover:text-accent">
                  {displayPhone}
                </a>
                <p className="mt-1 text-sm text-muted-foreground">Réponse en moins d'1h · Lun–Dim</p>
                <a href={whatsappUrl()} target="_blank" rel="noreferrer" className="mt-3 inline-flex min-h-11 items-center rounded-full bg-whatsapp px-6 py-3 text-[13px] font-semibold text-primary-foreground hover:bg-whatsapp-hover">
                  Écrire sur WhatsApp →
                </a>
              </ContactItem>

              <ContactItem icon={<Phone className="size-6 text-accent" aria-hidden="true" />} label="Téléphone">
                <div className="flex flex-wrap gap-x-3 gap-y-1 text-foreground">
                  <a href="tel:+221761923441" className="hover:text-accent">{displayPhone}</a>
                  <span className="text-muted-foreground">·</span>
                  <a href="tel:+221781441766" className="hover:text-accent">{secondPhone}</a>
                </div>
              </ContactItem>

              <ContactItem icon={<Mail className="size-6 text-accent" aria-hidden="true" />} label="Email">
                <a href={`mailto:${email}`} className="text-foreground hover:text-accent">{email}</a>
              </ContactItem>

              <ContactItem icon={<Instagram className="size-6 text-accent" aria-hidden="true" />} label="Instagram">
                <a href="https://instagram.com/2mparfumeriesn" target="_blank" rel="noreferrer" className="text-foreground hover:text-accent">{instagram}</a>
              </ContactItem>

              <ContactItem icon={<MapPin className="size-6 text-accent" aria-hidden="true" />} label="Zone de livraison">
                <p className="text-foreground">Dakar et banlieue proche</p>
                <p className="mt-1 text-sm text-muted-foreground">Livraison le jour même pour commandes avant 16h</p>
              </ContactItem>
            </div>
          </div>

          <aside className="fade-up rounded-lg border border-border bg-surface p-8 shadow-card md:self-start">
            <h2 className="mb-6 font-display text-2xl text-foreground">Horaires de disponibilité</h2>
            <div>
              {schedules.map(([day, time]) => (
                <div key={day} className="flex justify-between gap-6 border-b border-border py-3 text-sm">
                  <span className="text-muted-foreground">{day}</span>
                  <span className="font-medium text-foreground">{time}</span>
                </div>
              ))}
            </div>
            <div className="my-6 h-px bg-border" />
            <h3 className="mb-4 font-display text-xl text-foreground">Zone de livraison</h3>
            <p className="text-[13px] leading-[1.8] text-muted-foreground">
              Dakar centre · Plateau · Almadies · Sacré-Cœur · Mermoz Point E · Ouakam · Yoff · Parcelles Assainies et environs
            </p>
            <span className="caption-luxe mt-4 block text-accent">Livraison possible au-delà — nous contacter</span>
          </aside>
        </div>
      </section>
    </SiteLayout>
  );
}

function ContactItem({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-5">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent-muted">{icon}</div>
      <div>
        <p className="caption-luxe mb-2 text-accent">{label}</p>
        {children}
      </div>
    </div>
  );
}