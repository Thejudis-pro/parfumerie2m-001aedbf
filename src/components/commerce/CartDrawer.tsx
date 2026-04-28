import { Link } from "@tanstack/react-router";
import { CreditCard, Loader2, Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { WhatsAppLogo } from "@/components/commerce/WhatsAppLogo";
import { Button } from "@/components/ui/button";
import { PerfumePlaceholder } from "@/components/commerce/PerfumePlaceholder";
import { useCart } from "@/hooks/useCart";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

function formatCartPrice(price: number) {
  return new Intl.NumberFormat("fr-FR").format(price);
}

function buildOrderMessage(items: ReturnType<typeof useCart>["items"], total: number) {
  const lines = items.map(
    (item) =>
      `• ${item.name} × ${item.quantity} — ${formatCartPrice(item.price * item.quantity)} FCFA`,
  );
  return `Bonjour 2M Parfumerie 👋 Je souhaite passer la commande suivante :\n\n${lines.join("\n")}\n\n💰 TOTAL : ${formatCartPrice(total)} FCFA\n\n📍 Livraison à : ___________\n\n📞 Mon numéro : ___________\n\nMerci !`;
}

export function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { items, removeItem, updateQuantity, clearCart, total, itemCount } = useCart();
  const [paymentLoading, setPaymentLoading] = useState(false);

  const checkout = () => {
    if (!items.length) return;
    window.open(
      `https://wa.me/221761923441?text=${encodeURIComponent(buildOrderMessage(items, total))}`,
      "_blank",
      "noreferrer",
    );
    clearCart();
    onClose();
  };

  const payWithPayDunya = async () => {
    if (!items.length || paymentLoading) return;
    setPaymentLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("paydunya-create-invoice", {
        body: { items },
      });

      if (data?.fallback) {
        throw new Error(data.message ?? "Le paiement PayDunya est momentanément indisponible.");
      }

      if (error || !data?.invoiceUrl) {
        throw new Error(data?.message ?? data?.error ?? "Le paiement n'a pas pu être démarré.");
      }

      window.location.href = data.invoiceUrl;
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Le paiement n'a pas pu être démarré.");
      setPaymentLoading(false);
    }
  };

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-[59] bg-foreground/25 transition-opacity duration-300",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        className={cn(
          "fixed right-0 top-0 z-[60] flex h-dvh w-full max-w-[420px] flex-col border-l border-accent/15 bg-placeholder transition-transform duration-300 ease-out",
          open ? "translate-x-0" : "translate-x-full",
        )}
        aria-label="Panier"
      >
        <header className="flex items-start justify-between border-b border-accent/15 p-4 md:p-6">
          <div>
            <h2 className="font-display text-2xl text-foreground">Mon Panier</h2>
            <p className="mt-1 text-xs text-muted-foreground">
              {itemCount} article{itemCount > 1 ? "s" : ""}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex size-11 items-center justify-center text-muted-foreground hover:text-accent"
            aria-label="Fermer le panier"
          >
            <X aria-hidden="true" />
          </button>
        </header>
        {!items.length ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <ShoppingBag className="size-12 text-muted-foreground" aria-hidden="true" />
            <p className="mt-6 font-display text-2xl text-foreground">Votre panier est vide.</p>
            <Button asChild variant="outline" className="mt-8" onClick={onClose}>
              <Link to="/boutique" search={{ collection: "all" }}>
                Explorer la boutique
              </Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-5 overflow-y-auto p-4 md:p-6">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-[56px_1fr_auto] gap-3 border-b border-accent/15 pb-5 md:grid-cols-[64px_1fr_auto] md:gap-4"
                >
                  <div className="size-14 overflow-hidden rounded-md bg-background md:size-16">
                    <PerfumePlaceholder />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">{item.name}</h3>
                    <p className="mt-1 text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                      {item.collection}
                    </p>
                    <p className="mt-1 text-[13px] text-accent">
                      {formatCartPrice(item.price)} FCFA
                    </p>
                    <div className="mt-3 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="flex size-7 items-center justify-center rounded-full border border-muted-foreground text-muted-foreground hover:border-accent hover:text-accent"
                        aria-label="Réduire"
                      >
                        <Minus className="size-3" />
                      </button>
                      <span className="w-6 text-center text-sm text-foreground">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="flex size-7 items-center justify-center rounded-full border border-muted-foreground text-muted-foreground hover:border-accent hover:text-accent"
                        aria-label="Augmenter"
                      >
                        <Plus className="size-3" />
                      </button>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="mt-auto flex size-9 items-center justify-center text-muted-foreground hover:text-destructive"
                    aria-label="Retirer"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              ))}
            </div>
            <footer className="sticky bottom-0 border-t border-accent/15 bg-placeholder p-4 md:p-6">
              <div className="mb-5 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Sous-total</span>
                <strong className="text-lg text-accent">{formatCartPrice(total)} FCFA</strong>
              </div>
              <Button
                type="button"
                onClick={payWithPayDunya}
                disabled={paymentLoading}
                className="w-full py-4"
              >
                {paymentLoading ? (
                  <Loader2 className="size-5 animate-spin" aria-hidden="true" />
                ) : (
                  <CreditCard className="size-5" aria-hidden="true" />
                )}
                Payer avec PayDunya
              </Button>
              <Button
                type="button"
                onClick={checkout}
                className="mt-3 w-full bg-whatsapp py-4 text-primary-foreground hover:bg-whatsapp-hover"
              >
                <WhatsAppLogo tone="light" className="size-5" /> Commander sur WhatsApp
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="mt-3 w-full py-3"
              >
                Continuer mes achats
              </Button>
            </footer>
          </>
        )}
      </aside>
    </>
  );
}
