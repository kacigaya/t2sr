import { Dialog } from "@base-ui/react/dialog";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { NAVIGATION, SITE } from "@/data/site";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-ink/92 text-white shadow-2xl shadow-ink/10 backdrop-blur-xl">
      <Container className="flex h-20 items-center justify-between gap-5">
        <Link to="/" className="font-display text-2xl font-black tracking-tight" aria-label="Accueil T2SR">
          T<span className="text-terracotta">2</span>SR
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-bold lg:flex" aria-label="Navigation principale">
          {NAVIGATION.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              activeOptions={{ exact: item.href === "/" }}
              activeProps={{ className: "text-terracotta" }}
              className="transition hover:text-terracotta"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden lg:block">
          <ButtonLink to="/contact" className="min-h-10 px-4">
            Devis gratuit
          </ButtonLink>
        </div>
        <MobileMenu />
      </Container>
    </header>
  );
}

function MobileMenu() {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="grid size-11 place-items-center rounded-full border border-white/15 bg-white/10 lg:hidden">
        <Menu className="size-5" aria-hidden="true" />
        <span className="sr-only">Ouvrir le menu</span>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-ink/55 backdrop-blur-sm transition-opacity duration-200 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0" />
        <Dialog.Popup className="fixed inset-x-4 top-4 z-50 rounded-xl bg-white p-5 text-ink shadow-premium transition duration-200 data-[ending-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:scale-95 data-[starting-style]:opacity-0 lg:hidden">
          <div className="flex items-center justify-between">
            <Dialog.Title className="font-display text-2xl font-black">{SITE.name}</Dialog.Title>
            <Dialog.Close className="grid size-10 place-items-center rounded-full bg-soft">
              <X className="size-5" aria-hidden="true" />
              <span className="sr-only">Fermer le menu</span>
            </Dialog.Close>
          </div>
          <nav className="mt-6 grid gap-2" aria-label="Navigation mobile">
            {NAVIGATION.map((item) => (
              <Dialog.Close
                key={item.href}
                render={(props) => (
                  <Link
                    {...props}
                    to={item.href}
                    className="rounded-xl px-4 py-3 text-base font-extrabold transition hover:bg-soft hover:text-terracotta"
                  >
                    {item.label}
                  </Link>
                )}
              />
            ))}
          </nav>
          <ButtonLink to="/contact" className="mt-6 w-full">
            Devis gratuit
          </ButtonLink>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
