import { Link, useParams } from "react-router-dom";
import { motion } from "motion/react";
import {
  ArrowLeft,
  Calendar,
  Hash,
  Trash2,
  FlaskConical,
  ArrowRight,
  Atom,
  Weight,
  AlertCircle,
} from "lucide-react";
import Card from "../../../components/ui/Card";
import MoleculeViewer from "../components/MoleculeViewer";
import { useTheme } from "../../../providers/ThemeProvider";

const SOFT_EASE = [0.22, 1, 0.36, 1];

const MOCK_MOLECULES = {
  1: { id: 1, name: "Aspirina", smiles: "CC(=O)Oc1ccccc1C(=O)O", created_at: "2025-06-12", formula: "C9H8O4", atoms: 21, weight: "180.16" },
  2: { id: 2, name: "Ibuprofeno", smiles: "CC(C)Cc1ccc(cc1)C(C)C(=O)O", created_at: "2025-06-10", formula: "C13H18O2", atoms: 33, weight: "206.28" },
  3: { id: 3, name: "Cafeína", smiles: "CN1C=NC2=C1C(=O)N(C(=O)N2C)C", created_at: "2025-06-08", formula: "C8H10N4O2", atoms: 24, weight: "194.19" },
  4: { id: 4, name: "Paracetamol", smiles: "CC(=O)Nc1ccc(O)cc1", created_at: "2025-06-05", formula: "C8H9NO2", atoms: 20, weight: "151.16" },
  5: { id: 5, name: "Metformina", smiles: "CN(C)C(=N)NC(=N)N", created_at: "2025-06-03", formula: "C4H11N5", atoms: 20, weight: "129.16" },
  6: { id: 6, name: "Etanol", smiles: "CCO", created_at: "2025-06-01", formula: "C2H6O", atoms: 9, weight: "46.07" },
};

function shortIdFromSmiles(smiles) {
  if (!smiles) return "—";
  const clean = smiles.replace(/[^A-Za-z0-9]/g, "");
  return `MOL-${clean.slice(0, 6).toUpperCase()}`;
}

function MetaPill({ icon: Icon, label, value, mono = false, isDark }) {
  const displayValue =
    value === null || value === undefined || value === "" ? "—" : String(value);

  const pillBg = isDark ? "#14171C" : "#E8EAEE";
  const pillBorder = isDark
    ? "rgba(255, 255, 255, 0.10)"
    : "rgba(14, 19, 48, 0.08)";
  const labelColor = isDark ? "#9CA3B4" : "#525A70";
  const valueColor = isDark ? "#F5F7FA" : "#0E1330";

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "12px",
        padding: "12px 14px",
        background: pillBg,
        border: `1px solid ${pillBorder}`,
        borderRadius: "8px",
        minHeight: "44px",
      }}
    >
      <span
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          fontSize: "13px",
          fontWeight: 400,
          color: labelColor,
          flexShrink: 0,
        }}
      >
        {Icon && <Icon size={12} strokeWidth={2} />}
        {label}
      </span>
      <span
        style={{
          fontSize: "13.5px",
          fontWeight: 500,
          color: valueColor,
          fontFamily: mono ? "var(--font-mono)" : "inherit",
          textAlign: "right",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {displayValue}
      </span>
    </div>
  );
}

export default function MoleculeDetailPage() {
  const { id } = useParams();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const molecule = MOCK_MOLECULES[id];

  // Si la molécula no existe (por ejemplo id="new" o id="999")
  // mostramos una página de "no encontrada" en lugar de datos placeholder
  if (!molecule) {
    return (
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: SOFT_EASE }}
        >
          <Link
            to="/app/molecules"
            className="group inline-flex items-center gap-1.5 text-[12.5px] font-medium transition-opacity hover:opacity-80"
            style={{ color: "var(--accent)" }}
          >
            <ArrowLeft
              size={14}
              strokeWidth={2.2}
              className="transition-transform group-hover:-translate-x-0.5"
            />
            Volver a moléculas
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05, ease: SOFT_EASE }}
        >
          <Card className="p-12 text-center">
            <div
              className="mx-auto flex h-14 w-14 items-center justify-center rounded-full"
              style={{
                background: isDark
                  ? "rgba(248, 113, 113, 0.10)"
                  : "rgba(192, 57, 43, 0.08)",
                border: isDark
                  ? "1px solid rgba(248, 113, 113, 0.20)"
                  : "1px solid rgba(192, 57, 43, 0.18)",
              }}
            >
              <AlertCircle
                size={22}
                strokeWidth={2}
                style={{ color: isDark ? "#F87171" : "#C0392B" }}
              />
            </div>
            <h2
              className="mt-5 text-[20px] font-bold"
              style={{ color: "var(--text-primary)" }}
            >
              Molécula no encontrada
            </h2>
            <p
              className="mx-auto mt-2 max-w-md text-[13.5px]"
              style={{ color: "var(--text-secondary)" }}
            >
              No existe una molécula con el identificador <span className="font-mono">#{id}</span>. Puede que haya sido eliminada o que el enlace sea incorrecto.
            </p>
            <Link
              to="/app/molecules"
              className="mt-6 inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-[13px] font-medium transition-all hover:opacity-95"
              style={{
                background: "var(--accent)",
                color: "var(--text-on-accent)",
              }}
            >
              Volver a la lista
            </Link>
          </Card>
        </motion.div>
      </div>
    );
  }

  const displayName = molecule.name || shortIdFromSmiles(molecule.smiles);

  const smilesBg = isDark ? "#14171C" : "#E8EAEE";
  const smilesBorder = isDark
    ? "rgba(255, 255, 255, 0.10)"
    : "rgba(14, 19, 48, 0.08)";
  const smilesColor = isDark ? "#F5F7FA" : "#0E1330";

  const sectionTitleColor = isDark ? "#9CA3B4" : "#6B7285";
  const sectionIconColor = isDark ? "#6B7285" : "#8A93A4";

  return (
    <div className="space-y-6">
      {/* Volver */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: SOFT_EASE }}
      >
        <Link
          to="/app/molecules"
          className="group inline-flex items-center gap-1.5 text-[12.5px] font-medium transition-opacity hover:opacity-80"
          style={{ color: "var(--accent)" }}
        >
          <ArrowLeft
            size={14}
            strokeWidth={2.2}
            className="transition-transform group-hover:-translate-x-0.5"
          />
          Volver a moléculas
        </Link>
      </motion.div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.04, ease: SOFT_EASE }}
        className="flex flex-wrap items-end justify-between gap-6"
      >
        <div>
          <h1
            className="text-[36px] font-bold leading-none tracking-[-0.03em] sm:text-[40px]"
            style={{ color: "var(--text-primary)" }}
          >
            {displayName}
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-3">
            <span
              className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-[10.5px] font-medium uppercase tracking-wider"
              style={{
                background: isDark
                  ? "rgba(34, 211, 230, 0.12)"
                  : "rgba(10, 124, 133, 0.10)",
                color: isDark ? "#22D3E6" : "#0A7C85",
                border: isDark
                  ? "1px solid rgba(34, 211, 230, 0.22)"
                  : "1px solid rgba(10, 124, 133, 0.20)",
              }}
            >
              <Atom size={10} strokeWidth={2.2} />
              Molécula
            </span>

            <span
              className="font-mono text-[12.5px]"
              style={{ color: "var(--text-tertiary)" }}
            >
              ID #{molecule.id}
            </span>

            <span
              className="text-[12.5px]"
              style={{ color: "var(--text-quaternary)" }}
            >
              ·
            </span>

            <span
              className="text-[12.5px]"
              style={{ color: "var(--text-tertiary)" }}
            >
              Registrada el {molecule.created_at}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg px-3.5 py-2.5 text-[13px] font-medium transition-colors"
            style={{
              background: "transparent",
              color: "var(--text-secondary)",
              border: "1px solid var(--border-subtle)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--surface-hover)";
              e.currentTarget.style.color = "var(--text-primary)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "var(--text-secondary)";
            }}
          >
            <Trash2 size={14} strokeWidth={2.2} />
            Eliminar
          </button>

          <Link
            to="/app/predictions"
            className="group inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-[13px] font-medium transition-all hover:opacity-95"
            style={{
              background: "var(--accent)",
              color: "var(--text-on-accent)",
            }}
          >
            <FlaskConical size={14} strokeWidth={2.2} />
            Usar en predicción
            <ArrowRight
              size={13}
              strokeWidth={2.2}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </motion.div>

      {/* Card principal */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.08, ease: SOFT_EASE }}
      >
        <Card className="p-5">
          <div className="grid gap-5 lg:grid-cols-[1fr_340px]">
            <MoleculeViewer smiles={molecule.smiles} height={520} />

            <div className="flex flex-col gap-6">
              {/* SMILES */}
              <div>
                <div className="flex items-center gap-2">
                  <Hash size={12} strokeWidth={2} style={{ color: sectionIconColor }} />
                  <span
                    className="text-[11px] font-medium uppercase tracking-[0.14em]"
                    style={{ color: sectionTitleColor }}
                  >
                    SMILES
                  </span>
                </div>
                <div
                  className="mt-2.5 break-all rounded-lg px-3.5 py-3 font-mono text-[12px] leading-relaxed"
                  style={{
                    background: smilesBg,
                    color: smilesColor,
                    border: `1px solid ${smilesBorder}`,
                    fontWeight: 400,
                  }}
                >
                  {molecule.smiles}
                </div>
              </div>

              {/* Propiedades */}
              <div>
                <div className="flex items-center gap-2">
                  <Atom size={12} strokeWidth={2} style={{ color: sectionIconColor }} />
                  <span
                    className="text-[11px] font-medium uppercase tracking-[0.14em]"
                    style={{ color: sectionTitleColor }}
                  >
                    Propiedades
                  </span>
                </div>

                <div className="mt-2.5 space-y-1.5">
                  <MetaPill label="Fórmula" value={molecule.formula} mono isDark={isDark} />
                  <MetaPill label="Átomos" value={molecule.atoms} isDark={isDark} />
                  <MetaPill
                    icon={Weight}
                    label="Masa molar"
                    value={molecule.weight ? `${molecule.weight} g/mol` : "—"}
                    isDark={isDark}
                  />
                </div>
              </div>

              {/* Registro */}
              <div>
                <div className="flex items-center gap-2">
                  <Calendar size={12} strokeWidth={2} style={{ color: sectionIconColor }} />
                  <span
                    className="text-[11px] font-medium uppercase tracking-[0.14em]"
                    style={{ color: sectionTitleColor }}
                  >
                    Registro
                  </span>
                </div>

                <div className="mt-2.5 space-y-1.5">
                  <MetaPill label="Fecha" value={molecule.created_at} isDark={isDark} />
                  <MetaPill label="Tipo" value="Compuesto" isDark={isDark} />
                </div>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}