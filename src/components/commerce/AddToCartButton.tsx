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
      className="min-h-11 w-full rounded-full bg-accent text-primary-foreground hover:bg-accent-hover"
    >
      <ShoppingBag className="size-4" aria-hidden="true" /> Ajouter au panier
    </Button>
  );
}
