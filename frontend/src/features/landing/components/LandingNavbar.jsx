import { useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";

const links = [
  { label: "Plataforma", href: "#plataforma" },
  { label: "Cómo funciona", href: "#como-funciona" },
  { label: "Tecnología", href: "#tecnologia" },
];

export default function LandingNavbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="relative z-50 pt-6 pb-2">
      <nav className="flex items-center justify-between gap-8">
        <a href="/" className="group flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-400/25 bg-cyan-400/[0.08]">
            <svg
              viewBox="0 0 24 24"
              className="h-[18px] w-[18px] text-cyan-300"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.9"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="3" />
              <path d="M12 2v3M12 19v3M2 12h3M19 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
            </svg>
          </div>
          <span className="text-[15.5px] font-semibold tracking-tight text-white">
            DrugTarget
          </span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="text-[14px] font-medium text-white/75 transition-colors hover:text-white"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href="#plataforma"
            className="group hidden items-center gap-1.5 rounded-full border border-cyan-400/30 bg-cyan-400/[0.08] px-4 py-2 text-[13px] font-medium text-cyan-100 backdrop-blur-md transition-all hover:border-cyan-400/50 hover:bg-cyan-400/[0.14] sm:inline-flex"
          >
            Explorar plataforma
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/20 bg-white/[0.05] text-white md:hidden"
            aria-label="Menú"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 rounded-2xl border border-white/12 bg-[#0a0f1c]/95 p-4 backdrop-blur-xl md:hidden">
          <ul className="flex flex-col gap-1">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-sm font-medium text-white/85 hover:bg-white/5 hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}