import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Atom, Dna, ArrowRight, ArrowUpRight } from "lucide-react";
import { useTheme } from "../../../providers/ThemeProvider";

const RECENT_MOLECULES = [
  { id: 1, name: "Aspirina", smiles: "CC(=O)Oc1ccccc1C(=O)O" },
  { id: 2, name: "Ibuprofeno", smiles: "CC(C)Cc1ccc(cc1)C(C)C(=O)O" },
  { id: 3, name: "Cafeína", smiles: "CN1C=NC2=C1C(=O)N(C(=O)N2C)C" },
];

const RECENT_PROTEINS = [
  { id: 1, name: "Hemoglobina", uniprot_id: "P69905" },
  { id: 2, name: "Lisozima", uniprot_id: "P00698" },
  { id: 3, name: "Quimotripsina", uniprot_id: "P00766" },
];

export default function DatasetExplorer() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const nameColor = isDark ? "#FFFFFF" : "#0A0F24";
  const labelColor = isDark ? "#9CA3B4" : "#4A5170";
  const monoColor = isDark ? "#B8BFCE" : "#2E3550";

  const cardBg = isDark ? "#14171C" : "#FFFFFF";
  const cardBorder = isDark
    ? "rgba(255, 255, 255, 0.08)"
    : "rgba(14, 19, 48, 0.08)";
  const rowBorder = isDark
    ? "rgba(255, 255, 255, 0.06)"
    : "rgba(14, 19, 48, 0.06)";
  const rowHover = isDark ? "rgba(255, 255, 255, 0.03)" : "#FAFBFC";

  const accentCyan = isDark ? "#22D3E6" : "#0A7C85";
  const accentViolet = isDark ? "#A78BFA" : "#7C3AED";

  const moleculeStyle = {
    color: accentCyan,
    soft: isDark ? "rgba(34, 211, 230, 0.10)" : "rgba(10, 124, 133, 0.08)",
    border: isDark
      ? "rgba(34, 211, 230, 0.20)"
      : "rgba(10, 124, 133, 0.18)",
  };

  const proteinStyle = {
    color: accentViolet,
    soft: isDark ? "rgba(167, 139, 250, 0.10)" : "rgba(124, 58, 237, 0.08)",
    border: isDark
      ? "rgba(167, 139, 250, 0.20)"
      : "rgba(124, 58, 237, 0.18)",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
    >
      <h2
        className="mb-3 text-[11px] font-bold uppercase tracking-[0.14em]"
        style={{ color: labelColor }}
      >
        Explorar el dataset
      </h2>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Moléculas */}
        <div
          className="overflow-hidden rounded-2xl"
          style={{ background: cardBg, border: `1px solid ${cardBorder}` }}
        >
          <div
            className="flex items-center justify-between px-5 py-3.5"
            style={{ borderBottom: `1px solid ${rowBorder}` }}
          >
            <div className="flex items-center gap-2.5">
              <div
                className="flex h-7 w-7 items-center justify-center rounded-lg"
                style={{
                  background: moleculeStyle.soft,
                  border: `1px solid ${moleculeStyle.border}`,
                }}
              >
                <Atom
                  size={13}
                  strokeWidth={2.2}
                  style={{ color: moleculeStyle.color }}
                />
              </div>
              <span
                className="text-[12.5px] font-bold"
                style={{ color: nameColor }}
              >
                Moléculas recientes
              </span>
            </div>

            <Link
              to="/app/molecules"
              className="group flex items-center gap-1 text-[11.5px] font-semibold transition-opacity hover:opacity-80"
              style={{ color: moleculeStyle.color }}
            >
              Ver todas
              <ArrowRight
                size={11}
                strokeWidth={2.4}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          </div>

          <ul>
            {RECENT_MOLECULES.map((m, i) => (
              <li key={m.id}>
                <Link
                  to={`/app/molecules/${m.id}`}
                  className="group flex items-center gap-3 px-5 py-3 transition-colors"
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
                  <div className="min-w-0 flex-1">
                    <p
                      className="truncate text-[13px] font-semibold"
                      style={{ color: nameColor }}
                    >
                      {m.name}
                    </p>
                    <p
                      className="mt-0.5 truncate font-mono text-[10.5px]"
                      style={{ color: monoColor }}
                    >
                      {m.smiles}
                    </p>
                  </div>

                  <ArrowUpRight
                    size={13}
                    strokeWidth={2.2}
                    className="shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
                    style={{ color: moleculeStyle.color }}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Proteínas */}
        <div
          className="overflow-hidden rounded-2xl"
          style={{ background: cardBg, border: `1px solid ${cardBorder}` }}
        >
          <div
            className="flex items-center justify-between px-5 py-3.5"
            style={{ borderBottom: `1px solid ${rowBorder}` }}
          >
            <div className="flex items-center gap-2.5">
              <div
                className="flex h-7 w-7 items-center justify-center rounded-lg"
                style={{
                  background: proteinStyle.soft,
                  border: `1px solid ${proteinStyle.border}`,
                }}
              >
                <Dna
                  size={13}
                  strokeWidth={2.2}
                  style={{ color: proteinStyle.color }}
                />
              </div>
              <span
                className="text-[12.5px] font-bold"
                style={{ color: nameColor }}
              >
                Proteínas recientes
              </span>
            </div>

            <Link
              to="/app/proteins"
              className="group flex items-center gap-1 text-[11.5px] font-semibold transition-opacity hover:opacity-80"
              style={{ color: proteinStyle.color }}
            >
              Ver todas
              <ArrowRight
                size={11}
                strokeWidth={2.4}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          </div>

          <ul>
            {RECENT_PROTEINS.map((p, i) => (
              <li key={p.id}>
                <Link
                  to={`/app/proteins/${p.id}`}
                  className="group flex items-center gap-3 px-5 py-3 transition-colors"
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
                  <div className="min-w-0 flex-1">
                    <p
                      className="truncate text-[13px] font-semibold"
                      style={{ color: nameColor }}
                    >
                      {p.name}
                    </p>
                    <p
                      className="mt-0.5 truncate font-mono text-[10.5px]"
                      style={{ color: monoColor }}
                    >
                      UniProt {p.uniprot_id}
                    </p>
                  </div>

                  <ArrowUpRight
                    size={13}
                    strokeWidth={2.2}
                    className="shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
                    style={{ color: proteinStyle.color }}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}