import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Star, ArrowRight, Atom } from "lucide-react";
import { PKd_MIN, PKd_MAX } from "../mock/rankingData";

// Colores del podio: 1.º lima, 2.º lavanda, 3.º ámbar
const PODIUM = {
  1: {
    chip: "var(--chip-lime-bg)",
    border: "var(--accent-success-border)",
  },
  2: {
    chip: "var(--chip-lilac-bg)",
    border: "var(--accent-cyan-border)",
  },
  3: {
    chip: "var(--chip-amber-bg)",
    border: "var(--accent-warning-border)",
  },
};

export default function TopCandidate({ rank, item, featured = false }) {
  const c = PODIUM[rank] ?? PODIUM[3];

  const pct = Math.max(
    0,
    Math.min(100, ((item.pKd - PKd_MIN) / (PKd_MAX - PKd_MIN)) * 100)
  );

  const cardContent = (
    <div className={`relative ${featured ? "p-7" : "p-6"}`}>
      {/* Rank + ícono */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2.5">
          <span
            className="rounded-md px-2 py-1 font-mono text-[11px] font-bold uppercase tracking-wider"
            style={{ background: c.chip, color: "var(--chip-text)" }}
          >
            Rank {rank.toString().padStart(2, "0")}
          </span>
        </div>

        <div
          className="flex h-8 w-8 items-center justify-center rounded-lg"
          style={{
            background: "var(--icon-box-bg)",
            border: "1px solid var(--icon-box-border)",
          }}
        >
          <Atom
            size={15}
            strokeWidth={2.2}
            style={{ color: "var(--text-primary)" }}
          />
        </div>
      </div>

      {/* pKd */}
      <div className={featured ? "mt-5" : "mt-4"}>
        <p
          className={`font-mono font-bold tabular-nums leading-none tracking-[-0.03em] ${
            featured ? "text-[56px]" : "text-[42px]"
          }`}
          style={{ color: "var(--text-primary)" }}
        >
          {item.pKd.toFixed(2)}
        </p>
        <p
          className="mt-2.5 text-[11.5px] font-bold uppercase tracking-[0.14em]"
          style={{ color: "var(--text-secondary)" }}
        >
          pKd predicho
        </p>
      </div>

      {/* Barra de afinidad */}
      <div className="mt-4">
        <div
          className="relative h-2 w-full overflow-hidden rounded-full"
          style={{ background: "var(--bar-track)" }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{ background: c.chip }}
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{
              duration: 1,
              delay: featured ? 0.5 : 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        </div>
      </div>

      {/* Nombre + SMILES */}
      <div className="mt-5">
        <h3
          className={`font-bold tracking-[-0.01em] ${
            featured ? "text-[21px]" : "text-[17px]"
          }`}
          style={{ color: "var(--text-primary)" }}
        >
          {item.molecule_name}
        </h3>
        <p
          className="mt-2 line-clamp-2 rounded-md px-2.5 py-1.5 font-mono text-[11.5px] leading-relaxed"
          style={{
            color: "var(--text-primary)",
            background: "var(--icon-box-bg)",
            border: "1px solid var(--row-border)",
          }}
        >
          {item.smiles}
        </p>
      </div>

      {/* Fórmula + Ver detalle */}
      <div
        className="mt-5 flex items-center justify-between border-t pt-4"
        style={{ borderColor: "var(--row-border)" }}
      >
        <span
          className="font-mono text-[12px] font-semibold"
          style={{ color: "var(--text-secondary)" }}
        >
          {item.formula}
        </span>
        <span
          className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12.5px] font-semibold transition-colors group-hover:bg-(--hover-overlay)"
          style={{
            color: "var(--link)",
            border: "1px solid var(--icon-box-border)",
            background: "var(--icon-box-bg)",
          }}
        >
          Ver detalle
          <ArrowRight
            size={13}
            strokeWidth={2.4}
            className="transition-transform group-hover:translate-x-0.5"
          />
        </span>
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: featured ? 16 : 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: featured ? 0.15 : 0.05,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`relative ${featured ? "lg:-mt-4 lg:mb-0" : ""}`}
    >
      {/* Badge "MEJOR CANDIDATO": chip sólido, sin brillo */}
      {featured && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="absolute -top-3 left-1/2 z-20 -translate-x-1/2"
        >
          <div
            className="flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[10.5px] font-bold uppercase tracking-[0.12em]"
            style={{
              background: c.chip,
              color: "var(--chip-text)",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <Star size={11} strokeWidth={2.5} fill="currentColor" />
            Mejor candidato
          </div>
        </motion.div>
      )}

      {featured ? (
        /* Borde fino con degradado lima → lavanda (estático) */
        <div
          className="rounded-2xl p-px"
          style={{
            background:
              "linear-gradient(135deg, var(--chip-lime-bg) 0%, var(--chip-lilac-bg) 100%)",
            boxShadow: "var(--shadow-md)",
          }}
        >
          <Link
            to={`/app/molecules/${item.molecule_id}`}
            className="group relative block overflow-hidden rounded-[15px]"
            style={{ background: "var(--card-bg)" }}
          >
            {cardContent}
          </Link>
        </div>
      ) : (
        <Link
          to={`/app/molecules/${item.molecule_id}`}
          className="group relative block overflow-hidden rounded-2xl transition-all duration-200"
          style={{
            background: "var(--card-bg)",
            border: `1px solid ${c.border}`,
            boxShadow: "var(--shadow-md)",
          }}
        >
          {cardContent}
        </Link>
      )}
    </motion.div>
  );
}