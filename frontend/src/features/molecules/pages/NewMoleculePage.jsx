import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Save, Sparkles, AlertCircle, X } from "lucide-react";
import MoleculeViewer from "../components/MoleculeViewer";

const SOFT_EASE = [0.22, 1, 0.36, 1];

const EXAMPLES = [
  { name: "Etanol", smiles: "CCO", formula: "C2H6O" },
  { name: "Aspirina", smiles: "CC(=O)Oc1ccccc1C(=O)O", formula: "C9H8O4" },
  { name: "Cafeína", smiles: "CN1C=NC2=C1C(=O)N(C(=O)N2C)C", formula: "C8H10N4O2" },
  { name: "Ibuprofeno", smiles: "CC(C)Cc1ccc(cc1)C(C)C(=O)O", formula: "C13H18O2" },
  { name: "Paracetamol", smiles: "CC(=O)Nc1ccc(O)cc1", formula: "C8H9NO2" },
  { name: "Glucosa", smiles: "OC[C@H]1OC(O)[C@H](O)[C@@H](O)[C@@H]1O", formula: "C6H12O6" },
];

const cardStyle = {
  background: "var(--card-bg)",
  border: "1px solid var(--card-border)",
  boxShadow: "var(--shadow-md)",
};

const inputStyle = {
  background: "var(--surface-3)",
  border: "1px solid var(--border-medium)",
  color: "var(--text-primary)",
};

const pillStyle = {
  color: "var(--link)",
  border: "1px solid var(--icon-box-border)",
  background: "var(--icon-box-bg)",
};

const focusIn = (e) => {
  e.target.style.borderColor = "var(--border-strong)";
  e.target.style.boxShadow = "0 0 0 3px var(--accent-cyan-soft)";
};
const focusOut = (e) => {
  e.target.style.borderColor = "var(--border-medium)";
  e.target.style.boxShadow = "none";
};

export default function NewMoleculePage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [smiles, setSmiles] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [examplesOpen, setExamplesOpen] = useState(false);

  const cleanedSmiles = smiles.trim().replace(/\s/g, "");
  const isValidPreview = cleanedSmiles.length >= 2;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!smiles.trim()) {
      setError("El SMILES es obligatorio.");
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      navigate("/app/molecules");
    }, 600);
  };

  const handleSelectExample = (ex) => {
    setName(ex.name);
    setSmiles(ex.smiles);
    setExamplesOpen(false);
  };

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
          style={pillStyle}
        >
          <ArrowLeft
            size={14}
            strokeWidth={2.2}
            className="transition-transform group-hover:-translate-x-0.5"
          />
          Volver a moléculas
        </Link>
      </motion.div>

      {/* Header + botón Ejemplos */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.04, ease: SOFT_EASE }}
        className="flex flex-wrap items-end justify-between gap-4"
      >
        <div>
          <h1
            className="text-[32px] font-bold leading-none tracking-[-0.03em]"
            style={{ color: "var(--text-primary)" }}
          >
            Registrar molécula
          </h1>
          <p
            className="mt-2 text-[14px]"
            style={{ color: "var(--text-secondary)" }}
          >
            Añade un compuesto mediante su representación SMILES.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setExamplesOpen(true)}
          className="inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-[13px] font-semibold transition-colors hover:bg-(--hover-overlay)"
          style={pillStyle}
        >
          <Sparkles size={14} strokeWidth={2.2} />
          Ver ejemplos
        </button>
      </motion.div>

      {/* Formulario */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.08, ease: SOFT_EASE }}
      >
        <div className="rounded-2xl" style={cardStyle}>
          <form onSubmit={handleSubmit}>
            {/* Nombre */}
            <div className="p-6">
              <div className="flex items-baseline justify-between">
                <label
                  htmlFor="name"
                  className="text-[11.5px] font-bold uppercase tracking-[0.14em]"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Nombre
                </label>
                <span
                  className="text-[11px] font-medium"
                  style={{ color: "var(--text-tertiary)" }}
                >
                  opcional
                </span>
              </div>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej. Aspirina"
                className="mt-2 w-full rounded-lg px-3.5 py-2.5 text-[14px] outline-none transition-colors"
                style={inputStyle}
                onFocus={focusIn}
                onBlur={focusOut}
              />
            </div>

            <div style={{ height: 1, background: "var(--row-border)" }} />

            {/* SMILES */}
            <div className="p-6">
              <div className="flex items-baseline justify-between">
                <label
                  htmlFor="smiles"
                  className="text-[11.5px] font-bold uppercase tracking-[0.14em]"
                  style={{ color: "var(--text-secondary)" }}
                >
                  SMILES
                </label>
                <div className="flex items-center gap-3">
                  {cleanedSmiles.length > 0 && (
                    <span
                      className="font-mono text-[11.5px] tabular-nums tracking-wide"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {cleanedSmiles.length} car.
                    </span>
                  )}
                  <span
                    className="text-[11px] font-semibold"
                    style={{ color: "var(--accent-violet)" }}
                  >
                    obligatorio
                  </span>
                </div>
              </div>
              <textarea
                id="smiles"
                value={smiles}
                onChange={(e) => setSmiles(e.target.value)}
                rows={3}
                placeholder="Ej. CC(=O)Oc1ccccc1C(=O)O"
                className="mt-2 w-full resize-none rounded-lg px-3.5 py-2.5 font-mono text-[13px] leading-relaxed outline-none transition-colors"
                style={{ ...inputStyle, letterSpacing: "0.02em" }}
                onFocus={focusIn}
                onBlur={focusOut}
              />
              <p
                className="mt-2 text-[12px] leading-relaxed"
                style={{ color: "var(--text-tertiary)" }}
              >
                Notación química lineal. Los espacios se ignoran.
              </p>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 flex items-center gap-2.5 rounded-lg px-3 py-2.5"
                  style={{
                    background: "var(--accent-danger-soft)",
                    border: "1px solid var(--accent-danger)",
                  }}
                >
                  <AlertCircle
                    size={14}
                    strokeWidth={2.2}
                    style={{ color: "var(--accent-danger)", flexShrink: 0 }}
                  />
                  <span
                    className="text-[12.5px] font-semibold"
                    style={{ color: "var(--accent-danger)" }}
                  >
                    {error}
                  </span>
                </motion.div>
              )}
            </div>

            <div style={{ height: 1, background: "var(--row-border)" }} />

            {/* Footer */}
            <div className="flex items-center justify-end gap-2 px-6 py-4">
              <Link
                to="/app/molecules"
                className="inline-flex items-center justify-center rounded-lg px-3.5 py-2 text-[13px] font-semibold transition-colors hover:bg-(--hover-overlay)"
                style={{
                  background: "transparent",
                  color: "var(--text-primary)",
                  border: "1px solid var(--border-medium)",
                }}
              >
                Cancelar
              </Link>

              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-[13px] font-semibold transition-all hover:opacity-95 disabled:opacity-60"
                style={{
                  background: "var(--accent)",
                  color: "var(--text-on-accent)",
                }}
              >
                <Save size={14} strokeWidth={2.4} />
                {submitting ? "Guardando…" : "Guardar molécula"}
              </button>
            </div>
          </form>
        </div>
      </motion.div>

      {/* Vista previa 3D */}
      {isValidPreview && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: SOFT_EASE }}
          className="rounded-2xl p-6"
          style={cardStyle}
        >
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span
                className="flex h-6 w-6 items-center justify-center rounded-md"
                style={{ background: "var(--chip-lilac-bg)" }}
              >
                <Sparkles
                  size={13}
                  strokeWidth={2.4}
                  style={{ color: "var(--chip-text)" }}
                />
              </span>
              <span
                className="text-[11.5px] font-bold uppercase tracking-[0.14em]"
                style={{ color: "var(--text-secondary)" }}
              >
                Vista previa 3D
              </span>
            </div>

            <span
              className="font-mono text-[12px] tracking-wide"
              style={{ color: "var(--text-secondary)" }}
            >
              <span style={{ color: "var(--text-primary)", fontWeight: 700 }}>
                {cleanedSmiles.length}
              </span>{" "}
              caracteres
            </span>
          </div>

          <MoleculeViewer smiles={cleanedSmiles} height={420} />
        </motion.div>
      )}

      {/* Modal de ejemplos */}
      <AnimatePresence>
        {examplesOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{
              background: "rgba(0, 0, 0, 0.62)",
              backdropFilter: "blur(6px)",
            }}
            onClick={() => setExamplesOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2, ease: SOFT_EASE }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl overflow-hidden rounded-2xl"
              style={{
                background: "var(--card-bg)",
                border: "1px solid var(--card-border)",
                boxShadow: "var(--shadow-lg)",
              }}
            >
              {/* Header del modal */}
              <div
                className="flex items-center justify-between px-6 py-5"
                style={{ borderBottom: "1px solid var(--row-border)" }}
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className="flex h-6 w-6 items-center justify-center rounded-md"
                    style={{ background: "var(--chip-lilac-bg)" }}
                  >
                    <Sparkles
                      size={13}
                      strokeWidth={2.4}
                      style={{ color: "var(--chip-text)" }}
                    />
                  </span>
                  <span
                    className="text-[13px] font-bold uppercase tracking-[0.14em]"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Ejemplos
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setExamplesOpen(false)}
                  aria-label="Cerrar"
                  className="rounded-lg p-1.5 transition-colors hover:bg-(--hover-overlay)"
                  style={{ color: "var(--text-primary)" }}
                >
                  <X size={16} strokeWidth={2.2} />
                </button>
              </div>

              {/* Contenido */}
              <div className="p-6">
                <p
                  className="mb-4 text-[13px] leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Toca uno para rellenar el formulario automáticamente.
                </p>

                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {EXAMPLES.map((ex) => (
                    <button
                      key={ex.smiles}
                      type="button"
                      onClick={() => handleSelectExample(ex)}
                      className="flex flex-col gap-2.5 rounded-xl p-4 text-left transition-all duration-200"
                      style={{
                        background: "var(--icon-box-bg)",
                        border: "1px solid var(--row-border)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = "var(--border-strong)";
                        e.currentTarget.style.background = "var(--surface-hover)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "var(--row-border)";
                        e.currentTarget.style.background = "var(--icon-box-bg)";
                      }}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className="truncate text-[14px] font-bold tracking-[-0.01em]"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {ex.name}
                        </span>
                        <span
                          className="shrink-0 rounded-md px-2 py-0.5 font-mono text-[10.5px] font-bold tabular-nums tracking-wider"
                          style={{
                            background: "var(--chip-lilac-bg)",
                            color: "var(--chip-text)",
                          }}
                        >
                          {ex.formula}
                        </span>
                      </div>

                      <span
                        className="truncate font-mono text-[11.5px] leading-relaxed tracking-tight"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {ex.smiles.slice(0, 40)}
                        {ex.smiles.length > 40 ? "…" : ""}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}