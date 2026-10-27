import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Atom, Dna, ArrowRight } from "lucide-react";

const SOFT_EASE = [0.22, 1, 0.36, 1];

const accentStyles = {
  cyan: {
    color: "var(--chip-text)",
    soft: "var(--chip-lilac-bg)",
    border: "transparent",
  },
  violet: {
    color: "var(--chip-text)",
    soft: "var(--chip-pink-bg)",
    border: "transparent",
  },
};

const nameColor = "var(--text-primary)";
const monoColor = "var(--text-mono)";
const labelColor = "var(--text-secondary)";

const cardBg = "var(--card-bg)";
const cardBorder = "var(--card-border)";
const rowBorder = "var(--row-border)";
const rowHover = "var(--row-hover)";

export default function RecentActivity({
  molecules = [],
  proteins = [],
  loading = false,
}) {
  const items = [
    ...molecules.slice(0, 3).map((m, i) => ({
      id: `mol-${m.id}`,
      type: "molecule",
      typeLabel: "Molécula",
      name: m.name || "Sin nombre",
      detail: m.smiles,
      href: `/app/molecules/${m.id}`,
      icon: Atom,
      accent: "cyan",
      time: ["hace 2 min", "hace 15 min", "hace 1 h"][i] || "reciente",
      urgency: 3 - i,
    })),
    ...proteins.slice(0, 2).map((p, i) => ({
      id: `prot-${p.id}`,
      type: "protein",
      typeLabel: "Proteína",
      name: p.name || p.uniprot_id || "Sin nombre",
      detail: p.uniprot_id ? `UniProt ${p.uniprot_id}` : "Sin ID",
      href: `/app/proteins/${p.id}`,
      icon: Dna,
      accent: "violet",
      time: ["hace 3 h", "ayer"][i] || "reciente",
      urgency: 2 - i,
    })),
  ].slice(0, 5);

  return (
    <div
      className="overflow-hidden rounded-2xl"
      style={{
        background: cardBg,
        border: `1px solid ${cardBorder}`,
        boxShadow: "var(--shadow-sm)",
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-5 py-4"
        style={{ borderBottom: `1px solid ${rowBorder}` }}
      >
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-1.5 w-1.5">
            <motion.span
              className="absolute inline-flex h-full w-full rounded-full"
              style={{ background: "var(--accent-cyan)" }}
              animate={{ opacity: [0.4, 0, 0.4], scale: [1, 2.5, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            <span
              className="relative inline-flex h-1.5 w-1.5 rounded-full"
              style={{ background: "var(--accent-cyan)" }}
            />
          </span>
          <h2
            className="text-[13.5px] font-bold tracking-tight"
            style={{ color: nameColor }}
          >
            Actividad reciente
          </h2>
        </div>

        <Link
          to="/app/molecules"
          className="group flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12.5px] font-semibold transition-colors hover:bg-[var(--hover-overlay)]"
          style={{
            color: "var(--link)",
            border: "1px solid var(--icon-box-border)",
            background: "var(--icon-box-bg)",
          }}
        >
          Ver todo
          <ArrowRight
            size={12}
            strokeWidth={2.4}
            className="transition-transform group-hover:translate-x-0.5"
          />
        </Link>
      </div>

      {loading ? (
        <div className="p-6">
          <p className="text-[13px]" style={{ color: labelColor }}>
            Cargando…
          </p>
        </div>
      ) : items.length === 0 ? (
        <div className="p-6 text-center">
          <p className="text-[13px]" style={{ color: labelColor }}>
            Todavía no hay actividad registrada.
          </p>
        </div>
      ) : (
        <ul className="relative">
          {items.map((item, i) => {
            const Icon = item.icon;
            const style = accentStyles[item.accent];

            return (
              <motion.li
                key={item.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: i * 0.05,
                  ease: SOFT_EASE,
                }}
              >
                <Link
                  to={item.href}
                  className="group relative flex items-center gap-3.5 px-5 py-3.5 transition-colors"
                  style={{
                    borderTop: i === 0 ? "none" : `1px solid ${rowBorder}`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = rowHover;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  {/* Barra lateral al hover */}
                  <motion.span
                    className="absolute left-0 top-1/2 -translate-y-1/2 rounded-r-full"
                    style={{
                      width: 2.5,
                      height: "55%",
                      background: style.soft,
                    }}
                    initial={false}
                    animate={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  />

                  {/* Ícono con caja y color */}
                  <div
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                    style={{
                      background: style.soft,
                      border: `1px solid ${style.border}`,
                    }}
                  >
                    <Icon
                      size={15}
                      strokeWidth={2.2}
                      style={{ color: style.color }}
                    />
                  </div>

                  {/* Nombre + badge + detalle */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p
                        className="truncate text-[13.5px] font-semibold"
                        style={{ color: nameColor }}
                      >
                        {item.name}
                      </p>
                      <span
                        className="shrink-0 rounded-md px-1.5 py-0.5 text-[9.5px] font-bold uppercase tracking-wider"
                        style={{
                          background: style.soft,
                          color: style.color,
                          border: `1px solid ${style.border}`,
                        }}
                      >
                        {item.typeLabel}
                      </span>
                    </div>
                    <p
                      className="mt-1 truncate font-mono text-[10.5px] tracking-tight"
                      style={{ color: monoColor }}
                    >
                      {item.detail}
                    </p>
                  </div>

                  {/* Tiempo + urgencia */}
                  <div className="hidden shrink-0 flex-col items-end gap-1.5 sm:flex">
                    <span
                      className="text-[11px] font-medium tabular-nums"
                      style={{ color: labelColor }}
                    >
                      {item.time}
                    </span>
                    <div className="flex gap-1">
                      {[0, 1, 2].map((dot) => (
                        <span
                          key={dot}
                          className="h-1 w-1 rounded-full"
                          style={{
                            background:
                              dot < item.urgency
                                ? style.soft
                                : "var(--border-medium)",
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Flecha */}
                  <ArrowRight
                    size={13}
                    strokeWidth={2.2}
                    className="shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
                    style={{ color: "var(--text-primary)" }}
                  />
                </Link>
              </motion.li>
            );
          })}
        </ul>
      )}
    </div>
  );
}