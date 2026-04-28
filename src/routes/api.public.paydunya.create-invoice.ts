import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const cartItemSchema = z.object({
  id: z.string().min(1).max(160),
  name: z.string().min(1).max(160),
  collection: z.string().min(1).max(80),
  price: z.number().int().positive().max(10_000_000),
  quantity: z.number().int().min(1).max(10),
});

const createInvoiceSchema = z.object({
  items: z.array(cartItemSchema).min(1).max(50),
});

export const Route = createFileRoute("/api/public/paydunya/create-invoice")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const masterKey = process.env.PAYDUNYA_MASTER_KEY;
        const privateKey = process.env.PAYDUNYA_PRIVATE_KEY;
        const token = process.env.PAYDUNYA_TOKEN;

        if (!masterKey || !privateKey || !token) {
          return Response.json({ error: "Paiement indisponible pour le moment." }, { status: 500 });
        }

        const parsed = createInvoiceSchema.safeParse(await request.json().catch(() => null));
        if (!parsed.success) {
          return Response.json({ error: "Panier invalide." }, { status: 400 });
        }

        const { items } = parsed.data;
        const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const origin = new URL(request.url).origin;

        const invoiceItems = Object.fromEntries(
          items.map((item, index) => [
            `item_${index}`,
            {
              name: item.name,
              quantity: item.quantity,
              unit_price: item.price,
              total_price: item.price * item.quantity,
              description: item.collection,
            },
          ]),
        );

        const response = await fetch(
          `${process.env.PAYDUNYA_API_BASE_URL ?? "https://app.paydunya.com/api/v1"}/checkout-invoice/create`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "PAYDUNYA-MASTER-KEY": masterKey,
              "PAYDUNYA-PRIVATE-KEY": privateKey,
              "PAYDUNYA-TOKEN": token,
            },
            body: JSON.stringify({
              invoice: {
                items: invoiceItems,
                total_amount: total,
                description: `Commande 2M Parfumerie — ${items.length} article${items.length > 1 ? "s" : ""}`,
              },
              store: {
                name: "2M Parfumerie",
                tagline: "L'authenticité en flacon",
                postal_address: "Sénégal",
                phone: "+221761923441",
                website_url: origin,
              },
              actions: {
                cancel_url: `${origin}/boutique?collection=all`,
                return_url: `${origin}/boutique?collection=all`,
              },
            }),
          },
        );

        const data = await response.json().catch(() => null);
        if (!response.ok || data?.response_code !== "00" || !data?.response_text) {
          return Response.json(
            { error: data?.response_text ?? data?.message ?? "Impossible de créer le paiement." },
            { status: 502 },
          );
        }

        return Response.json({ invoiceUrl: data.response_text });
      },
    },
  },
});