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
import MoleculeViewer from "../components/MoleculeViewer";

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

const cardStyle = {
  background: "var(--card-bg)",
  border: "1px solid var(--card-border)",
  boxShadow: "var(--shadow-md)",
};

const backLinkStyle = {
  color: "var(--link)",
  border: "1px solid var(--icon-box-border)",
  background: "var(--icon-box-bg)",
};

function MetaPill({ icon: Icon, label, value, mono = false }) {
  const displayValue =
    value === null || value === undefined || value === "" ? "—" : String(value);

  return (
    <div
      className="flex min-h-11.5 items-center justify-between gap-3 rounded-lg px-3.5 py-3"
      style={{
        background: "var(--surface-3)",
        border: "1px solid var(--row-border)",
      }}
    >
      <span
        className="flex shrink-0 items-center gap-2 text-[13px]"
        style={{ color: "var(--text-secondary)" }}
      >
        {Icon && <Icon size={13} strokeWidth={2.2} />}
        {label}
      </span>
      <span
        className="truncate text-right text-[14px] font-semibold"
        style={{
          color: "var(--text-primary)",
          fontFamily: mono ? "var(--font-mono)" : "inherit",
        }}
      >
        {displayValue}
      </span>
    </div>
  );
}

function SectionTitle({ icon: Icon, children }) {
  return (
    <div className="flex items-center gap-2.5">
      <span
        className="flex h-6 w-6 items-center justify-center rounded-md"
        style={{ background: "var(--chip-lilac-bg)" }}
      >
        <Icon size={13} strokeWidth={2.4} style={{ color: "var(--chip-text)" }} />
      </span>
      <span
        className="text-[11.5px] font-bold uppercase tracking-[0.14em]"
        style={{ color: "var(--text-secondary)" }}
      >
        {children}
      </span>
    </div>
  );
}

export default function MoleculeDetailPage() {
  const { id } = useParams();
  const molecule = MOCK_MOLECULES[id];

  // Molécula inexistente (id="new", id="999"…)
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
            className="group inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12.5px] font-semibold transition-colors hover:bg-(--hover-overlay)"
            style={backLinkStyle}
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
          <div className="rounded-2xl p-12 text-center" style={cardStyle}>
            <div
              className="mx-auto flex h-14 w-14 items-center justify-center rounded-full"
              style={{
                background: "var(--accent-danger-soft)",
                border: "1px solid var(--accent-danger)",
              }}
            >
              <AlertCircle
                size={22}
                strokeWidth={2}
                style={{ color: "var(--accent-danger)" }}
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
              No existe una molécula con el identificador{" "}
              <span className="font-mono">#{id}</span>. Puede que haya sido
              eliminada o que el enlace sea incorrecto.
            </p>
            <Link
              to="/app/molecules"
              className="mt-6 inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-[13px] font-semibold transition-all hover:opacity-95"
              style={{
                background: "var(--accent)",
                color: "var(--text-on-accent)",
              }}
            >
              Volver a la lista
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  const displayName = molecule.name || shortIdFromSmiles(molecule.smiles);

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
          className="group inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12.5px] font-semibold transition-colors hover:bg-(--hover-overlay)"
          style={backLinkStyle}
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

          <div className="mt-3.5 flex flex-wrap items-center gap-3">
            <span
              className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider"
              style={{
                background: "var(--chip-lilac-bg)",
                color: "var(--chip-text)",
              }}
            >
              <Atom size={11} strokeWidth={2.4} />
              Molécula
            </span>

            <span
              className="font-mono text-[13px] font-semibold"
              style={{ color: "var(--text-primary)" }}
            >
              ID #{molecule.id}
            </span>

            <span
              className="text-[13px]"
              style={{ color: "var(--text-quaternary)" }}
            >
              ·
            </span>

            <span
              className="text-[13px]"
              style={{ color: "var(--text-secondary)" }}
            >
              Registrada el {molecule.created_at}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg px-3.5 py-2.5 text-[13px] font-semibold transition-colors"
            style={{
              background: "transparent",
              color: "var(--text-primary)",
              border: "1px solid var(--border-medium)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--accent-danger-soft)";
              e.currentTarget.style.color = "var(--accent-danger)";
              e.currentTarget.style.borderColor = "var(--accent-danger)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "var(--text-primary)";
              e.currentTarget.style.borderColor = "var(--border-medium)";
            }}
          >
            <Trash2 size={14} strokeWidth={2.2} />
            Eliminar
          </button>

          <Link
            to="/app/predictions"
            className="group inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-[13px] font-semibold transition-all hover:opacity-95"
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
        <div className="rounded-2xl p-5" style={cardStyle}>
          <div className="grid gap-5 lg:grid-cols-[1fr_340px]">
            <MoleculeViewer smiles={molecule.smiles} height={520} />

            <div className="flex flex-col gap-6">
              {/* SMILES */}
              <div>
                <SectionTitle icon={Hash}>SMILES</SectionTitle>
                <div
                  className="mt-3 break-all rounded-lg px-3.5 py-3 font-mono text-[12.5px] leading-relaxed"
                  style={{
                    background: "var(--surface-3)",
                    color: "var(--text-primary)",
                    border: "1px solid var(--row-border)",
                  }}
                >
                  {molecule.smiles}
                </div>
              </div>

              {/* Propiedades */}
              <div>
                <SectionTitle icon={Atom}>Propiedades</SectionTitle>
                <div className="mt-3 space-y-1.5">
                  <MetaPill label="Fórmula" value={molecule.formula} mono />
                  <MetaPill label="Átomos" value={molecule.atoms} />
                  <MetaPill
                    icon={Weight}
                    label="Masa molar"
                    value={molecule.weight ? `${molecule.weight} g/mol` : "—"}
                  />
                </div>
              </div>

              {/* Registro */}
              <div>
                <SectionTitle icon={Calendar}>Registro</SectionTitle>
                <div className="mt-3 space-y-1.5">
                  <MetaPill label="Fecha" value={molecule.created_at} />
                  <MetaPill label="Tipo" value="Compuesto" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}