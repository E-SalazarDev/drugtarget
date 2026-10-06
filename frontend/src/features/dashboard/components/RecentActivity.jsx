import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Atom, Dna, ArrowRight } from "lucide-react";
import { useTheme } from "../../../providers/ThemeProvider";

const SOFT_EASE = [0.22, 1, 0.36, 1];

export default function RecentActivity({
  molecules = [],
  proteins = [],
  loading = false,
}) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

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

  // Colores más saturados
  const accentStyles = {
    cyan: {
      color: isDark ? "#22D3E6" : "#0A7C85",
      soft: isDark
        ? "rgba(34, 211, 230, 0.12)"
        : "rgba(10, 124, 133, 0.10)",
      border: isDark
        ? "rgba(34, 211, 230, 0.25)"
        : "rgba(10, 124, 133, 0.25)",
    },
    violet: {
      color: isDark ? "#A78BFA" : "#7C3AED",
      soft: isDark
        ? "rgba(167, 139, 250, 0.12)"
        : "rgba(124, 58, 237, 0.10)",
      border: isDark
        ? "rgba(167, 139, 250, 0.25)"
        : "rgba(124, 58, 237, 0.25)",
    },
  };

  const nameColor = isDark ? "#FFFFFF" : "#0A0F24";
  const monoColor = isDark ? "#B8BFCE" : "#2E3550";
  const labelColor = isDark ? "#9CA3B4" : "#4A5170";

  const cardBg = isDark ? "#14171C" : "#FFFFFF";
  const cardBorder = isDark
    ? "rgba(255, 255, 255, 0.08)"
    : "rgba(14, 19, 48, 0.08)";
  const rowBorder = isDark
    ? "rgba(255, 255, 255, 0.06)"
    : "rgba(14, 19, 48, 0.06)";
  const rowHover = isDark ? "rgba(255, 255, 255, 0.03)" : "#FAFBFC";

  return (
    <div
      className="overflow-hidden rounded-2xl"
      style={{ background: cardBg, border: `1px solid ${cardBorder}` }}
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
              style={{ background: isDark ? "#22D3E6" : "#0A7C85" }}
              animate={{ opacity: [0.4, 0, 0.4], scale: [1, 2.5, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            <span
              className="relative inline-flex h-1.5 w-1.5 rounded-full"
              style={{ background: isDark ? "#22D3E6" : "#0A7C85" }}
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
          className="group flex items-center gap-1.5 text-[12.5px] font-semibold transition-opacity hover:opacity-80"
          style={{ color: "var(--accent)" }}
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
          <p
            className="text-[13px]"
            style={{ color: labelColor }}
          >
            Cargando…
          </p>
        </div>
      ) : items.length === 0 ? (
        <div className="p-6 text-center">
          <p
            className="text-[13px]"
            style={{ color: labelColor }}
          >
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
                      background: style.color,
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
                                ? style.color
                                : isDark
                                ? "rgba(255, 255, 255, 0.10)"
                                : "rgba(14, 19, 48, 0.10)",
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
                    style={{ color: style.color }}
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