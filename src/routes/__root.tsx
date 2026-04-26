import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import { Toaster } from "@/components/ui/sonner";
import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "2M Parfumerie Sénégal | Parfums authentiques" },
      {
        name: "description",
        content:
          "Parfumerie de luxe au Sénégal. Commandez des parfums authentiques et accessibles directement sur WhatsApp.",
      },
      { name: "author", content: "2M Parfumerie" },
      { property: "og:title", content: "2M Parfumerie Sénégal | Parfums authentiques" },
      {
        property: "og:description",
        content:
          "Parfumerie de luxe au Sénégal. Commandez des parfums authentiques et accessibles directement sur WhatsApp.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@2mparfumeriesn" },
      { name: "twitter:title", content: "2M Parfumerie Sénégal | Parfums authentiques" },
      {
        name: "twitter:description",
        content:
          "Parfumerie de luxe au Sénégal. Commandez des parfums authentiques et accessibles directement sur WhatsApp.",
      },
      {
        property: "og:image",
        content:
          "https://storage.googleapis.com/gpt-engineer-file-uploads/2Rdk3SIsNBY8XQlqCNXGgzrYeON2/social-images/social-1777204414467-Screenshot_2026-04-26_115316.webp",
      },
      {
        name: "twitter:image",
        content:
          "https://storage.googleapis.com/gpt-engineer-file-uploads/2Rdk3SIsNBY8XQlqCNXGgzrYeON2/social-images/social-1777204414467-Screenshot_2026-04-26_115316.webp",
      },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
    scripts: [{ children: "<!-- ANALYTICS: paste GA4 or Vercel Analytics snippet here -->" }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Toaster position="top-right" richColors={false} closeButton />
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return <Outlet />;
}
