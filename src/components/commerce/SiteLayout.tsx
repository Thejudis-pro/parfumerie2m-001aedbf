import { Link, useLocation } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { whatsappUrl } from "@/lib/perfume-data";

const navItems = [
  { label: "Accueil", to: "/" },
  { label: "Boutique", to: "/boutique" },
  { label: "À Propos", to: "/a-propos" },
  { label: "FAQ", to: "/faq" },
  { label: "Contact", to: "/contact" },
] as const;

export function SiteLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className={cn("fixed inset-x-0 top-0 z-50 border-b border-transparent transition-all duration-300", scrolled && "glass-nav border-border")}>
        <nav className="section-shell flex h-20 items-center justify-between">
          <Link to="/" className="font-display text-[22px] font-semibold text-accent" aria-label="2M Parfumerie accueil">
            2M Parfumerie
          </Link>
          <div className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                className="group nav-luxe relative min-h-11 content-center text-muted-foreground hover:text-foreground"
                activeProps={{ className: "text-accent" }}
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full group-data-[status=active]:w-full" />
              </Link>
            ))}
          </div>
          <Button asChild variant="outline" size="sm" className="hidden md:inline-flex">
            <a href={whatsappUrl()} target="_blank" rel="noreferrer">Commander</a>
          </Button>
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center text-foreground md:hidden"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </nav>
      </header>

      <div className={cn("fixed inset-0 z-40 flex flex-col items-center justify-center bg-background px-6 transition-all duration-300 md:hidden", open ? "visible opacity-100" : "invisible opacity-0")}>
        <div className="flex flex-col items-center gap-7">
          {navItems.map((item, index) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              className="font-display text-[28px] text-foreground transition-all"
              activeProps={{ className: "text-accent underline underline-offset-8" }}
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              {item.label}
            </Link>
          ))}
        </div>
        <Button asChild size="lg" className="absolute bottom-8 left-6 right-6 h-[52px]">
          <a href={whatsappUrl()} target="_blank" rel="noreferrer">Commander sur WhatsApp</a>
        </Button>
      </div>

      <main>{children}</main>
    </div>
  );
}