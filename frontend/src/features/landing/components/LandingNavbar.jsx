import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ArrowUpRight } from "lucide-react";

const links = [
  { label: "Plataforma", href: "#plataforma" },
  { label: "Cómo funciona", href: "#como-funciona" },
  { label: "Tecnología", href: "#tecnologia" },
];

const SOFT_EASE = [0.22, 1, 0.36, 1];

export default function LandingNavbar() {
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: SOFT_EASE }}
      className="relative z-50 px-2.5 pb-2 pt-5"
    >
      <nav className="relative flex items-center justify-between gap-6 rounded-2xl border border-white/10 bg-[#0A0A10]/80 px-5 py-3.5 backdrop-blur-xl">
        {/* Logo */}
        <motion.a
          href="/"
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: SOFT_EASE }}
          className="group relative z-10 flex items-center gap-3 pl-1"
        >
          <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-[#A48BFF] to-[#6D4AF2]">
            <svg
              viewBox="0 0 24 24"
              className="h-4.5 w-4.5 text-white transition-transform duration-500 group-hover:rotate-90"
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
          <span className="text-[16px] font-semibold tracking-tight text-[#F6F6FB]">
            DrugTarget
          </span>
        </motion.a>

        {/* Enlaces desktop */}
        <ul className="absolute left-1/2 z-10 hidden -translate-x-1/2 items-center gap-1 md:flex">
          {links.map((link, i) => (
            <motion.li
              key={link.label}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.2 + i * 0.08,
                ease: SOFT_EASE,
              }}
            >
              <a
                href={link.href}
                className="group relative inline-flex items-center justify-center rounded-full px-5 py-2 text-[14px] font-medium text-[#D0CFE0] transition-colors duration-300 hover:text-white"
              >
                <span className="relative z-10">{link.label}</span>
                <span className="pointer-events-none absolute bottom-1 left-5 right-5 h-px origin-left scale-x-0 bg-[#CABEFF] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
              </a>
            </motion.li>
          ))}
        </ul>

        {/* Acciones */}
        <motion.div
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: SOFT_EASE }}
          className="relative z-10 flex items-center gap-3"
        >
          <motion.a
            href="/app"
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 24 }}
            className="group hidden items-center gap-2 rounded-full bg-[#F2F1FA] px-5 py-2.5 text-[14px] font-semibold text-[#12101F] transition-colors duration-300 hover:bg-white sm:inline-flex"
          >
            Explorar plataforma
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              strokeWidth={2.4}
            />
          </motion.a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-[#F6F6FB] md:hidden"
            aria-label="Menú"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </motion.div>
      </nav>

      {/* Menú Mobile */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: SOFT_EASE }}
            className="absolute left-2.5 right-2.5 top-full z-50 mt-2 rounded-2xl border border-white/10 bg-[#0A0A10]/95 p-4 backdrop-blur-xl md:hidden"
          >
            <ul className="flex flex-col gap-1">
              {links.map((link, i) => (
                <motion.li
                  key={link.label}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.35,
                    delay: i * 0.06,
                    ease: SOFT_EASE,
                  }}
                >
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-4 py-3 text-[15px] font-medium text-[#D0CFE0] transition-colors hover:bg-white/5 hover:text-white"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.35,
                  delay: links.length * 0.06,
                  ease: SOFT_EASE,
                }}
              >
                <a
                  href="/app"
                  onClick={() => setOpen(false)}
                  className="mt-2 flex items-center justify-center gap-2 rounded-full bg-[#F2F1FA] px-5 py-3 text-[14px] font-semibold text-[#12101F]"
                >
                  Explorar plataforma
                  <ArrowUpRight className="h-4 w-4" strokeWidth={2.4} />
                </a>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}