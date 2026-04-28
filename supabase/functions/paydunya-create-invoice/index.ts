import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Content-Type": "application/json",
};

function fallbackResponse(error: string, message: string) {
  return Response.json({ error, message, fallback: true }, { status: 200, headers: corsHeaders });
}

type CartItem = {
  id: string;
  name: string;
  collection: string;
  price: number;
  quantity: number;
};

function isValidItem(item: unknown): item is CartItem {
  if (!item || typeof item !== "object") return false;
  const value = item as Record<string, unknown>;
  return (
    typeof value.id === "string" &&
    typeof value.name === "string" &&
    typeof value.collection === "string" &&
    Number.isInteger(value.price) &&
    Number(value.price) > 0 &&
    Number(value.price) <= 10_000_000 &&
    Number.isInteger(value.quantity) &&
    Number(value.quantity) >= 1 &&
    Number(value.quantity) <= 10
  );
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const masterKey = Deno.env.get("PAYDUNYA_MASTER_KEY");
    const privateKey = Deno.env.get("PAYDUNYA_PRIVATE_KEY");
    const token = Deno.env.get("PAYDUNYA_TOKEN");

    if (!masterKey || !privateKey || !token) {
      return fallbackResponse("PAYMENT_NOT_CONFIGURED", "Paiement indisponible pour le moment.");
    }

    const body = await req.json().catch(() => null);
    const items = Array.isArray(body?.items) ? body.items : [];

    if (!items.length || items.length > 50 || !items.every(isValidItem)) {
      return Response.json({ error: "Panier invalide." }, { status: 400, headers: corsHeaders });
    }

    const total = items.reduce((sum: number, item: CartItem) => sum + item.price * item.quantity, 0);
    const origin = req.headers.get("origin") ?? "https://parfumerie2m.lovable.app";
    const invoiceItems = Object.fromEntries(
      items.map((item: CartItem, index: number) => [
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

    const paydunyaResponse = await fetch(
      `${Deno.env.get("PAYDUNYA_API_BASE_URL") ?? "https://app.paydunya.com/api/v1"}/checkout-invoice/create`,
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

    const data = await paydunyaResponse.json().catch(() => null);
    if (!paydunyaResponse.ok || data?.response_code !== "00" || !data?.response_text) {
      const providerMessage =
        data?.response_text ?? data?.message ?? data?.error ?? "Impossible de créer le paiement.";
      const isKycError = providerMessage.toLowerCase().includes("kyc");
      const message = isKycError
        ? "PayDunya demande la validation KYC du compte marchand avant d'activer les paiements. Vous pouvez finaliser la commande sur WhatsApp en attendant."
        : providerMessage;

      console.error("PayDunya API error", paydunyaResponse.status, data);
      return fallbackResponse(isKycError ? "KYC_VERIFICATION_REQUIRED" : "PAYMENT_SERVICE_UNAVAILABLE", message);
    }

    return Response.json({ invoiceUrl: data.response_text }, { headers: corsHeaders });
  } catch (error) {
    console.error("paydunya-create-invoice", error);
    return fallbackResponse("INTERNAL_SERVER_ERROR", "Le paiement n'a pas pu être démarré.");
  }
});