import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { PKd_MIN, PKd_MAX } from "../mock/rankingData";

export default function RankingRow({ rank, item, topPKd, index = 0 }) {
  const [hovered, setHovered] = useState(false);

  const pct = Math.max(
    0,
    Math.min(100, ((item.pKd - PKd_MIN) / (PKd_MAX - PKd_MIN)) * 100)
  );

  const delta = topPKd ? (topPKd - item.pKd).toFixed(2) : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        delay: Math.min(index * 0.02, 0.3),
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <Link
        to={`/app/molecules/${item.molecule_id}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="group relative grid grid-cols-[44px_1fr_auto] items-center gap-4 rounded-xl px-4 py-3.5 transition-all duration-200 sm:grid-cols-[44px_1fr_140px_90px_auto]"
        style={{
          background: hovered ? "var(--surface-2)" : "var(--card-bg)",
          border: `1px solid ${
            hovered ? "var(--border-strong)" : "var(--card-border)"
          }`,
          boxShadow: "var(--shadow-sm)",
        }}
      >
        {/* Rank */}
        <span
          className="flex h-8 w-8 items-center justify-center rounded-lg font-mono text-[13px] font-bold tabular-nums leading-none"
          style={{
            color: "var(--text-primary)",
            background: "var(--icon-box-bg)",
            border: "1px solid var(--icon-box-border)",
          }}
        >
          {rank.toString().padStart(2, "0")}
        </span>

        {/* Nombre + SMILES */}
        <div className="min-w-0 flex-1">
          <p
            className="truncate text-[14.5px] font-bold"
            style={{ color: "var(--text-primary)" }}
          >
            {item.molecule_name}
          </p>
          <p
            className="mt-1 truncate font-mono text-[11.5px]"
            style={{ color: "var(--text-secondary)" }}
          >
            {item.smiles}
          </p>
        </div>

        {/* Barra */}
        <div className="hidden sm:block">
          <div
            className="relative h-1.5 w-full overflow-hidden rounded-full"
            style={{ background: "var(--bar-track)" }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{
                background: "linear-gradient(90deg, #9B82FF 0%, #6D4AF2 100%)",
              }}
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{
                duration: 0.7,
                delay: Math.min(index * 0.02 + 0.05, 0.4),
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          </div>
        </div>

        {/* pKd */}
        <div className="hidden flex-col items-end gap-1 sm:flex">
          <span
            className="font-mono text-[16px] font-bold tabular-nums leading-none"
            style={{ color: "var(--text-primary)" }}
          >
            {item.pKd.toFixed(2)}
          </span>
          <span
            className="font-mono text-[10.5px] font-semibold uppercase tracking-wider"
            style={{ color: "var(--text-secondary)" }}
          >
            pKd
          </span>
        </div>

        {/* Delta + flecha */}
        <div className="flex items-center gap-3">
          {delta && (
            <span
              className="hidden font-mono text-[11.5px] font-semibold tabular-nums lg:block"
              style={{ color: "var(--text-secondary)" }}
            >
              −{delta}
            </span>
          )}
          <span
            className="flex h-8 w-8 items-center justify-center rounded-full transition-colors"
            style={{
              background: hovered ? "var(--accent)" : "var(--icon-box-bg)",
              border: "1px solid var(--icon-box-border)",
            }}
          >
            <ArrowUpRight
              size={14}
              strokeWidth={2.4}
              style={{
                color: hovered
                  ? "var(--text-on-accent)"
                  : "var(--text-primary)",
              }}
            />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}