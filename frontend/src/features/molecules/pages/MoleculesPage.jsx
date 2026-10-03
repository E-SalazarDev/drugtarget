import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Plus, Search, ArrowUpRight, X } from "lucide-react";
import { useTheme } from "../../../providers/ThemeProvider";

const SOFT_EASE = [0.22, 1, 0.36, 1];

const MOCK_MOLECULES = [
  { id: 1, name: "Aspirina", smiles: "CC(=O)Oc1ccccc1C(=O)O", formula: "C9H8O4", weight: "180.16", created_at: "2025-06-12" },
  { id: 2, name: "Ibuprofeno", smiles: "CC(C)Cc1ccc(cc1)C(C)C(=O)O", formula: "C13H18O2", weight: "206.28", created_at: "2025-06-10" },
  { id: 3, name: "Cafeína", smiles: "CN1C=NC2=C1C(=O)N(C(=O)N2C)C", formula: "C8H10N4O2", weight: "194.19", created_at: "2025-06-08" },
  { id: 4, name: "Paracetamol", smiles: "CC(=O)Nc1ccc(O)cc1", formula: "C8H9NO2", weight: "151.16", created_at: "2025-06-05" },
  { id: 5, name: "Metformina", smiles: "CN(C)C(=N)NC(=N)N", formula: "C4H11N5", weight: "129.16", created_at: "2025-06-03" },
  { id: 6, name: "Etanol", smiles: "CCO", formula: "C2H6O", weight: "46.07", created_at: "2025-06-01" },
  { id: 7, name: "Glucosa", smiles: "OC[C@H]1OC(O)[C@H](O)[C@@H](O)[C@@H]1O", formula: "C6H12O6", weight: "180.16", created_at: "2025-05-28" },
  { id: 8, name: "Penicilina G", smiles: "CC1(C)S[C@@H]2[C@H](NC(=O)Cc3ccccc3)C(=O)N2[C@H]1C(=O)O", formula: "C16H18N2O4S", weight: "334.39", created_at: "2025-05-25" },
];

export default function MoleculesPage() {
  const [query, setQuery] = useState("");
  const [hoveredId, setHoveredId] = useState(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const molecules = MOCK_MOLECULES;

  const filtered = molecules.filter((m) => {
    const q = query.toLowerCase();
    return (
      (m.name || "").toLowerCase().includes(q) ||
      m.smiles.toLowerCase().includes(q) ||
      (m.formula || "").toLowerCase().includes(q)
    );
  });

  // =========================================================
  // COLORES — CONTRASTE MÁXIMO
  // Modo claro: todo en tonos oscuros. Nada de grises claros.
  // Modo oscuro: todo en tonos claros. Nada de grises apagados.
  // =========================================================

  const nameColor = isDark ? "#FFFFFF" : "#0A0F24";
  const valueColor = isDark ? "#FFFFFF" : "#0A0F24";
  const monoColor = isDark ? "#B8BFCE" : "#2E3550";
  const labelColor = isDark ? "#9CA3B4" : "#4A5170";

  const cardBg = isDark ? "#14171C" : "#FFFFFF";
  const cardBorder = isDark
    ? "rgba(255, 255, 255, 0.08)"
    : "rgba(14, 19, 48, 0.10)";
  const cardHoverBg = isDark ? "#1A1E24" : "#FAFBFC";
  const cardHoverBorder = isDark
    ? "rgba(34, 211, 230, 0.30)"
    : "rgba(10, 124, 133, 0.35)";

  const accentCyan = isDark ? "#22D3E6" : "#0A7C85";
  const accentColor = "var(--accent)";

  const badgeBg = isDark
    ? "rgba(34, 211, 230, 0.15)"
    : "rgba(10, 124, 133, 0.15)";
  const badgeColor = isDark ? "#4DE1FF" : "#0A5D66";
  const badgeBorder = isDark
    ? "rgba(34, 211, 230, 0.30)"
    : "rgba(10, 124, 133, 0.30)";

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: SOFT_EASE }}
        className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
      >
        <div>
          <h1
            className="text-[32px] font-bold leading-none tracking-[-0.03em]"
            style={{ color: "var(--text-primary)" }}
          >
            Moléculas
          </h1>
          <p
            className="mt-2 text-[14px]"
            style={{ color: "var(--text-secondary)" }}
          >
            Explora y administra las moléculas registradas.
          </p>
        </div>

        <Link
          to="/app/molecules/new"
          className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-[13.5px] font-medium transition-all hover:opacity-95"
          style={{
            background: "var(--accent)",
            color: "var(--text-on-accent)",
          }}
        >
          <Plus size={15} strokeWidth={2.4} />
          Nueva molécula
        </Link>
      </motion.div>

      {/* Search + contador */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05, ease: SOFT_EASE }}
        className="flex flex-col gap-3 sm:flex-row sm:items-center"
      >
        <div className="relative flex-1">
          <Search
            size={15}
            strokeWidth={2.2}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2"
            style={{ color: labelColor }}
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por nombre, SMILES o fórmula…"
            className="w-full rounded-lg py-2.5 pl-10 pr-10 text-[13.5px] outline-none transition-colors"
            style={{
              background: cardBg,
              border: `1px solid ${cardBorder}`,
              color: nameColor,
            }}
            onFocus={(e) => {
              e.target.style.borderColor = accentCyan;
              e.target.style.boxShadow = `0 0 0 3px ${
                isDark ? "rgba(34, 211, 230, 0.12)" : "rgba(10, 124, 133, 0.10)"
              }`;
            }}
            onBlur={(e) => {
              e.target.style.borderColor = cardBorder;
              e.target.style.boxShadow = "none";
            }}
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 transition-colors"
              style={{ color: labelColor }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = nameColor;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = labelColor;
              }}
            >
              <X size={13} strokeWidth={2.2} />
            </button>
          )}
        </div>

        <span
          className="shrink-0 font-mono text-[12px] tabular-nums tracking-wider"
          style={{ color: valueColor, fontWeight: 600 }}
        >
          {filtered.length.toString().padStart(2, "0")} /{" "}
          {molecules.length.toString().padStart(2, "0")}
        </span>
      </motion.div>

      {/* Lista de cards */}
      {filtered.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1, ease: SOFT_EASE }}
          className="rounded-2xl px-6 py-16 text-center"
          style={{
            background: cardBg,
            border: `1px solid ${cardBorder}`,
          }}
        >
          <p
            className="text-[14px] font-medium"
            style={{ color: nameColor }}
          >
            {query
              ? "Sin resultados para esa búsqueda"
              : "Todavía no hay moléculas registradas"}
          </p>
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="mt-3 text-[12.5px] font-medium transition-opacity hover:opacity-80"
              style={{ color: accentColor }}
            >
              Limpiar búsqueda
            </button>
          )}
        </motion.div>
      ) : (
        <div className="space-y-2">
          {filtered.map((m, i) => {
            const isHovered = hoveredId === m.id;

            return (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: Math.min(i * 0.03, 0.25),
                  ease: SOFT_EASE,
                }}
              >
                <Link
                  to={`/app/molecules/${m.id}`}
                  onMouseEnter={() => setHoveredId(m.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className="group relative flex items-center gap-5 rounded-xl px-5 py-4 transition-all duration-200"
                  style={{
                    background: isHovered ? cardHoverBg : cardBg,
                    border: `1px solid ${
                      isHovered ? cardHoverBorder : cardBorder
                    }`,
                  }}
                >
                  {/* Barra lateral cian al hover */}
                  <motion.span
                    className="absolute left-0 top-1/2 -translate-y-1/2 rounded-r-full"
                    style={{
                      width: 3,
                      height: "60%",
                      background: accentCyan,
                    }}
                    initial={false}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.15 }}
                  />

                  {/* Nombre + fórmula + SMILES */}
                  <div className="flex min-w-0 flex-1 flex-col gap-2">
                    <div className="flex items-center gap-2.5">
                      <span
                        className="truncate text-[15px] font-bold"
                        style={{ color: nameColor, letterSpacing: "-0.01em" }}
                      >
                        {m.name || "Sin nombre"}
                      </span>
                      <span
                        className="shrink-0 rounded-md px-2 py-0.5 font-mono text-[10.5px] font-bold tracking-wide"
                        style={{
                          background: badgeBg,
                          color: badgeColor,
                          border: `1px solid ${badgeBorder}`,
                        }}
                      >
                        {m.formula}
                      </span>
                    </div>
                    <span
                      className="truncate font-mono text-[11.5px] tracking-tight"
                      style={{ color: monoColor, fontWeight: 500 }}
                    >
                      {m.smiles}
                    </span>
                  </div>

                  {/* Masa */}
                  <div className="hidden shrink-0 flex-col items-end gap-1 sm:flex">
                    <span
                      className="font-mono text-[15px] tabular-nums"
                      style={{
                        color: valueColor,
                        fontWeight: 700,
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {m.weight}
                    </span>
                    <span
                      className="text-[10px] font-bold uppercase tracking-[0.12em]"
                      style={{ color: labelColor }}
                    >
                      g/mol
                    </span>
                  </div>

                  {/* Fecha */}
                  <div className="hidden shrink-0 flex-col items-end gap-1 md:flex">
                    <span
                      className="font-mono text-[13px] tabular-nums"
                      style={{ color: valueColor, fontWeight: 600 }}
                    >
                      {m.created_at}
                    </span>
                    <span
                      className="text-[10px] font-bold uppercase tracking-[0.12em]"
                      style={{ color: labelColor }}
                    >
                      Registrada
                    </span>
                  </div>

                  {/* Flecha */}
                  <motion.div
                    className="shrink-0"
                    animate={{
                      x: isHovered ? 2 : 0,
                      opacity: isHovered ? 1 : 0.6,
                    }}
                    transition={{ duration: 0.15 }}
                  >
                    <ArrowUpRight
                      size={16}
                      strokeWidth={2.4}
                      style={{
                        color: isHovered ? accentCyan : labelColor,
                      }}
                    />
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}