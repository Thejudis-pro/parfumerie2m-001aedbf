import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/collections/parfums-de-poches")({
  beforeLoad: () => {
    throw redirect({ to: "/coffret-signature" });
  },
});
