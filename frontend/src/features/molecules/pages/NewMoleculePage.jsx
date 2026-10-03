import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Save, Sparkles, AlertCircle, X } from "lucide-react";
import { useTheme } from "../../../providers/ThemeProvider";
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

export default function NewMoleculePage() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [name, setName] = useState("");
  const [smiles, setSmiles] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [examplesOpen, setExamplesOpen] = useState(false);

  const cleanedSmiles = smiles.trim().replace(/\s/g, "");
  const isValidPreview = cleanedSmiles.length >= 2;

  // Colores
  const nameColor = isDark ? "#FFFFFF" : "#0A0F24";
  const labelColor = isDark ? "#9CA3B4" : "#4A5170";
  const helperColor = isDark ? "#7A8494" : "#6B7692";
  const cardBg = isDark ? "#14171C" : "#FFFFFF";
  const cardBorder = isDark
    ? "rgba(255, 255, 255, 0.08)"
    : "rgba(14, 19, 48, 0.08)";
  const inputBg = isDark ? "#0F1219" : "#F5F7FA";
  const inputBorder = isDark
    ? "rgba(255, 255, 255, 0.08)"
    : "rgba(14, 19, 48, 0.10)";
  const accentCyan = isDark ? "#22D3E6" : "#0A7C85";

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
          className="group inline-flex shrink-0 items-center gap-2 rounded-lg px-3.5 py-2 text-[13px] font-medium transition-colors"
          style={{
            background: "transparent",
            color: isDark ? "#C4C9D4" : "#3F4866",
            border: `1px solid ${inputBorder}`,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = isDark
              ? "rgba(34, 211, 230, 0.06)"
              : "rgba(10, 124, 133, 0.05)";
            e.currentTarget.style.borderColor = accentCyan;
            e.currentTarget.style.color = accentCyan;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.borderColor = inputBorder;
            e.currentTarget.style.color = isDark ? "#C4C9D4" : "#3F4866";
          }}
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
        <div
          className="rounded-2xl"
          style={{ background: cardBg, border: `1px solid ${cardBorder}` }}
        >
          <form onSubmit={handleSubmit}>
            {/* Nombre */}
            <div className="p-6">
              <div className="flex items-baseline justify-between">
                <label
                  htmlFor="name"
                  className="text-[10.5px] font-bold uppercase tracking-[0.14em]"
                  style={{ color: labelColor }}
                >
                  Nombre
                </label>
                <span
                  className="text-[10px] font-medium"
                  style={{ color: helperColor }}
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
                className="mt-2 w-full rounded-lg px-3 py-2.5 text-[13.5px] outline-none transition-colors"
                style={{
                  background: inputBg,
                  border: `1px solid ${inputBorder}`,
                  color: nameColor,
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = accentCyan;
                  e.target.style.boxShadow = `0 0 0 3px ${
                    isDark
                      ? "rgba(34, 211, 230, 0.10)"
                      : "rgba(10, 124, 133, 0.08)"
                  }`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = inputBorder;
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>

            <div
              style={{
                height: 1,
                background: isDark
                  ? "rgba(255, 255, 255, 0.06)"
                  : "rgba(14, 19, 48, 0.06)",
              }}
            />

            {/* SMILES */}
            <div className="p-6">
              <div className="flex items-baseline justify-between">
                <label
                  htmlFor="smiles"
                  className="text-[10.5px] font-bold uppercase tracking-[0.14em]"
                  style={{ color: labelColor }}
                >
                  SMILES
                </label>
                <div className="flex items-center gap-3">
                  {cleanedSmiles.length > 0 && (
                    <span
                      className="font-mono text-[10.5px] tabular-nums tracking-wide"
                      style={{ color: helperColor }}
                    >
                      {cleanedSmiles.length} car.
                    </span>
                  )}
                  <span
                    className="text-[10px] font-medium"
                    style={{ color: helperColor }}
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
                className="mt-2 w-full resize-none rounded-lg px-3 py-2.5 font-mono text-[12.5px] leading-relaxed outline-none transition-colors"
                style={{
                  background: inputBg,
                  border: `1px solid ${inputBorder}`,
                  color: nameColor,
                  letterSpacing: "0.02em",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = accentCyan;
                  e.target.style.boxShadow = `0 0 0 3px ${
                    isDark
                      ? "rgba(34, 211, 230, 0.10)"
                      : "rgba(10, 124, 133, 0.08)"
                  }`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = inputBorder;
                  e.target.style.boxShadow = "none";
                }}
              />
              <p
                className="mt-2 text-[11px] leading-relaxed"
                style={{ color: helperColor }}
              >
                Notación química lineal. Los espacios se ignoran.
              </p>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 flex items-center gap-2.5 rounded-lg px-3 py-2.5"
                  style={{
                    background: isDark
                      ? "rgba(248, 113, 113, 0.08)"
                      : "rgba(192, 57, 43, 0.06)",
                    border: `1px solid ${
                      isDark
                        ? "rgba(248, 113, 113, 0.20)"
                        : "rgba(192, 57, 43, 0.15)"
                    }`,
                  }}
                >
                  <AlertCircle
                    size={13}
                    strokeWidth={2.2}
                    style={{
                      color: isDark ? "#F87171" : "#991B1B",
                      flexShrink: 0,
                    }}
                  />
                  <span
                    className="text-[12px] font-medium"
                    style={{ color: isDark ? "#F87171" : "#991B1B" }}
                  >
                    {error}
                  </span>
                </motion.div>
              )}
            </div>

            <div
              style={{
                height: 1,
                background: isDark
                  ? "rgba(255, 255, 255, 0.06)"
                  : "rgba(14, 19, 48, 0.06)",
              }}
            />

            {/* Footer */}
            <div className="flex items-center justify-end gap-2 px-6 py-4">
              <Link
                to="/app/molecules"
                className="inline-flex items-center justify-center rounded-lg px-3.5 py-2 text-[13px] font-medium transition-colors"
                style={{
                  background: "transparent",
                  color: isDark ? "#C4C9D4" : "#3F4866",
                  border: `1px solid ${inputBorder}`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = isDark
                    ? "rgba(255, 255, 255, 0.05)"
                    : "rgba(14, 19, 48, 0.04)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
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
          style={{ background: cardBg, border: `1px solid ${cardBorder}` }}
        >
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Sparkles
                size={13}
                strokeWidth={2}
                style={{ color: accentCyan }}
              />
              <span
                className="text-[10.5px] font-bold uppercase tracking-[0.14em]"
                style={{ color: labelColor }}
              >
                Vista previa 3D
              </span>
            </div>

            <div className="flex items-center gap-4 font-mono text-[11px] tracking-wide">
              <span style={{ color: helperColor }}>
                <span style={{ color: nameColor, fontWeight: 600 }}>
                  {cleanedSmiles.length}
                </span>{" "}
                caracteres
              </span>
            </div>
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
              background: "rgba(0, 0, 0, 0.6)",
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
                background: cardBg,
                border: `1px solid ${cardBorder}`,
                boxShadow: isDark
                  ? "0 30px 90px rgba(0, 0, 0, 0.6)"
                  : "0 20px 60px rgba(14, 19, 48, 0.2)",
              }}
            >
              {/* Header del modal */}
              <div
                className="flex items-center justify-between px-6 py-5"
                style={{
                  borderBottom: `1px solid ${
                    isDark
                      ? "rgba(255, 255, 255, 0.06)"
                      : "rgba(14, 19, 48, 0.06)"
                  }`,
                }}
              >
                <div className="flex items-center gap-2.5">
                  <Sparkles
                    size={13}
                    strokeWidth={2.2}
                    style={{ color: accentCyan }}
                  />
                  <span
                    className="text-[13px] font-bold uppercase tracking-[0.14em]"
                    style={{ color: labelColor }}
                  >
                    Ejemplos
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setExamplesOpen(false)}
                  className="rounded-lg p-1.5 transition-colors"
                  style={{ color: helperColor }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = isDark
                      ? "rgba(255, 255, 255, 0.06)"
                      : "rgba(14, 19, 48, 0.06)";
                    e.currentTarget.style.color = nameColor;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = helperColor;
                  }}
                >
                  <X size={16} strokeWidth={2.2} />
                </button>
              </div>

              {/* Contenido */}
              <div className="p-6">
                <p
                  className="mb-4 text-[12px] leading-relaxed"
                  style={{ color: helperColor }}
                >
                  Toca uno para rellenar el formulario automáticamente.
                </p>

                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {EXAMPLES.map((ex) => (
                    <button
                      key={ex.smiles}
                      type="button"
                      onClick={() => handleSelectExample(ex)}
                      className="flex flex-col gap-2 rounded-xl p-4 text-left transition-all duration-200"
                      style={{
                        background: isDark
                          ? "rgba(255, 255, 255, 0.03)"
                          : "#F8FAFC",
                        border: `1px solid ${
                          isDark
                            ? "rgba(255, 255, 255, 0.08)"
                            : "rgba(14, 19, 48, 0.08)"
                        }`,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = accentCyan;
                        e.currentTarget.style.background = isDark
                          ? "rgba(34, 211, 230, 0.08)"
                          : "rgba(10, 124, 133, 0.04)";
                        e.currentTarget.style.boxShadow = isDark
                          ? `0 0 0 1px ${accentCyan}, 0 8px 24px rgba(0,0,0,0.3)`
                          : `0 0 0 1px ${accentCyan}, 0 8px 24px rgba(10, 124, 133, 0.10)`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = isDark
                          ? "rgba(255, 255, 255, 0.08)"
                          : "rgba(14, 19, 48, 0.08)";
                        e.currentTarget.style.background = isDark
                          ? "rgba(255, 255, 255, 0.03)"
                          : "#F8FAFC";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      {/* Nombre + fórmula */}
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className="truncate text-[13.5px] font-semibold tracking-[-0.01em]"
                          style={{ color: nameColor }}
                        >
                          {ex.name}
                        </span>
                        <span
                          className="shrink-0 rounded-md px-2 py-0.5 font-mono text-[10px] font-bold tabular-nums tracking-wider"
                          style={{
                            background: isDark
                              ? "rgba(34, 211, 230, 0.15)"
                              : "rgba(10, 124, 133, 0.12)",
                            color: isDark ? "#4DE1FF" : "#065F66",
                            border: `1px solid ${
                              isDark
                                ? "rgba(34, 211, 230, 0.25)"
                                : "rgba(10, 124, 133, 0.20)"
                            }`,
                          }}
                        >
                          {ex.formula}
                        </span>
                      </div>

                      {/* SMILES */}
                      <span
                        className="truncate font-mono text-[11px] leading-relaxed tracking-tight"
                        style={{
                          color: isDark ? "#8A93A4" : "#5A6480",
                          fontWeight: 500,
                        }}
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