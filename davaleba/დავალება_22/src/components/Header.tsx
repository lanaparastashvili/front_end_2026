import { useState } from "react";
import Logo from "./Logo";
import person from "../assets/person.svg";
import searchicon from "../assets/searchicon.svg"; 
import { navLinks } from "../data/siteData";
import { SearchIcon, UserIcon, MenuIcon, CloseIcon } from "./icons";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line/60 bg-ink/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-[72px] sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <a href="#top" aria-label="Página inicial">
            <Logo />
          </a>
          <nav className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-display text-sm font-medium uppercase tracking-wide text-white/70 transition-colors hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <a
            href="#launcher"
            className="hidden rounded-sm bg-r-gold px-4 py-2 font-display text-xs font-semibold uppercase tracking-wide text-ink transition-colors hover:bg-r-gold-dark sm:inline-block"
          >
            Baixe o Launcher
          </a>
<button
  type="button"
  aria-label="Pesquisar"
  className="hidden h-9 w-9 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-panel-light hover:text-white sm:flex"
>
  <img src={person} alt="Search" className="h-5 w-5" />
</button>
          <button
            type="button"
            aria-label="Conta"
            className="hidden h-9 w-9 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-panel-light hover:text-white sm:flex"
          >
            <img src={searchicon} alt="Conta" className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((open) => !open)}
            className="flex h-9 w-9 items-center justify-center rounded-full text-white transition-colors hover:bg-panel-light md:hidden"
          >
            {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="border-t border-line/60 bg-ink px-4 pb-6 pt-4 md:hidden">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="rounded-sm px-3 py-3 font-display text-sm font-medium uppercase tracking-wide text-white/80 transition-colors hover:bg-panel-light hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="mt-4 flex items-center gap-3">
            <a
              href="#launcher"
              onClick={() => setIsMenuOpen(false)}
              className="flex-1 rounded-sm bg-r-gold px-4 py-3 text-center font-display text-xs font-semibold uppercase tracking-wide text-ink"
            >
              Baixe o Launcher
            </a>
            <button
              type="button"
              aria-label="Pesquisar"
              className="flex h-11 w-11 items-center justify-center rounded-sm border border-line text-white/80"
            >
              <SearchIcon />
            </button>
            <button
              type="button"
              aria-label="Conta"
              className="flex h-11 w-11 items-center justify-center rounded-sm border border-line text-white/80"
            >
              <UserIcon />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
