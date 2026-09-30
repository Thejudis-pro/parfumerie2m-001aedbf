import { ShoppingBag } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useCart, type CartItem } from "@/hooks/useCart";

export function AddToCartButton({ item }: { item: Omit<CartItem, "quantity"> }) {
  const { addItem } = useCart();

  return (
    <Button
      type="button"
      onClick={() => {
        addItem(item);
        toast(`✓ ${item.name} ajouté au panier`, { duration: 3000 });
      }}
      className="h-auto min-h-11 w-full whitespace-normal rounded-full bg-accent px-3 py-2.5 text-center text-[11px] leading-tight text-primary-foreground hover:bg-accent-hover sm:px-5 sm:py-3 sm:text-sm"
    >
      <ShoppingBag className="size-4" aria-hidden="true" /> Ajouter au panier
    </Button>
  );
}
