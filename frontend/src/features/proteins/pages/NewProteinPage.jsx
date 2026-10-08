import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  Save,
  Sparkles,
  AlertCircle,
  X,
  Dna,
} from "lucide-react";
import { useTheme } from "../../../providers/ThemeProvider";
import ProteinSequenceViewer from "../components/ProteinSequenceViewer";

const SOFT_EASE = [0.22, 1, 0.36, 1];

const EXAMPLES = [
  {
    name: "Insulina (cadena A)",
    uniprot_id: "P01308",
    sequence: "GIVEQCCTSICSLYQLENYCN",
  },
  {
    name: "Angiotensina II",
    uniprot_id: "P01019",
    sequence: "DRVYIHPF",
  },
  {
    name: "Bradicinina",
    uniprot_id: null,
    sequence: "RPPGFSPFR",
  },
  {
    name: "Mioglobina (fragmento)",
    uniprot_id: "P02185",
    sequence: "MGLSDGEWQLVLNVWGKVEADIPGHGQEVLIRLFKGHPETLEKFDKFKHLKSEDEMKASEDLKKHGATVLTALGGILKKKGHHEAEIKPLAQSHATKHKIPVKYLEFISECIIQVLQSKHPGDFGADAQGAMNKALELFRKDMASNYKELGFQG",
  },
  {
    name: "Hemoglobina (fragmento)",
    uniprot_id: "P69905",
    sequence: "MVLSPADKTNVKAAWGKVGAHAGEYGAEALERMFLSFPTTKTYFPHFDLSHGSAQVKGHGKKVADALTNAVAHVDDMPNALSALSDLHAHKLRVDPVNFKLLSHCLLVTLAAHLPAEFTPAVHASLDKFLASVSTVLTSKYR",
  },
  {
    name: "Glucagón",
    uniprot_id: "P01275",
    sequence: "HSQGTFTSDYSKYLDSRRAQDFVQWLMNT",
  },
];

const AVG_RESIDUE_WEIGHT = 110;
const VALID_AA_REGEX = /^[ACDEFGHIKLMNPQRSTVWY]+$/;

export default function NewProteinPage() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [name, setName] = useState("");
  const [sequence, setSequence] = useState("");
  const [uniprotId, setUniprotId] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [examplesOpen, setExamplesOpen] = useState(false);

  const cleanedSeq = sequence.trim().toUpperCase().replace(/\s/g, "");
  const isValidPreview = cleanedSeq.length >= 3;
  const hasInvalidChars =
    cleanedSeq.length > 0 && !VALID_AA_REGEX.test(cleanedSeq);

  const estimatedWeight = cleanedSeq.length * AVG_RESIDUE_WEIGHT;

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
  const accentViolet = isDark ? "#A78BFA" : "#7C3AED";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!cleanedSeq) {
      setError("La secuencia es obligatoria.");
      return;
    }

    if (!VALID_AA_REGEX.test(cleanedSeq)) {
      setError("La secuencia contiene caracteres inválidos.");
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      navigate("/app/proteins");
    }, 600);
  };

  const handleSelectExample = (ex) => {
    setName(ex.name);
    setSequence(ex.sequence);
    setUniprotId(ex.uniprot_id || "");
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
          to="/app/proteins"
          className="group inline-flex items-center gap-1.5 text-[12.5px] font-medium transition-opacity hover:opacity-80"
          style={{ color: "var(--accent)" }}
        >
          <ArrowLeft
            size={14}
            strokeWidth={2.2}
            className="transition-transform group-hover:-translate-x-0.5"
          />
          Volver a proteínas
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
            Registrar proteína
          </h1>
          <p
            className="mt-2 text-[14px]"
            style={{ color: "var(--text-secondary)" }}
          >
            Añade una nueva diana terapéutica mediante su secuencia de aminoácidos.
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
              ? "rgba(167, 139, 250, 0.06)"
              : "rgba(124, 58, 237, 0.05)";
            e.currentTarget.style.borderColor = accentViolet;
            e.currentTarget.style.color = accentViolet;
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

      {/* Formulario — ancho completo */}
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
            {/* Nombre + UniProt */}
            <div className="grid gap-5 p-6 sm:grid-cols-2">
              <div>
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
                  placeholder="Ej. Hemoglobina"
                  className="mt-2 w-full rounded-lg px-3 py-2.5 text-[13.5px] outline-none transition-colors"
                  style={{
                    background: inputBg,
                    border: `1px solid ${inputBorder}`,
                    color: nameColor,
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = accentViolet;
                    e.target.style.boxShadow = `0 0 0 3px ${
                      isDark
                        ? "rgba(167, 139, 250, 0.10)"
                        : "rgba(124, 58, 237, 0.08)"
                    }`;
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = inputBorder;
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>

              <div>
                <div className="flex items-baseline justify-between">
                  <label
                    htmlFor="uniprot"
                    className="text-[10.5px] font-bold uppercase tracking-[0.14em]"
                    style={{ color: labelColor }}
                  >
                    UniProt ID
                  </label>
                  <span
                    className="text-[10px] font-medium"
                    style={{ color: helperColor }}
                  >
                    opcional
                  </span>
                </div>
                <input
                  id="uniprot"
                  type="text"
                  value={uniprotId}
                  onChange={(e) => setUniprotId(e.target.value.toUpperCase())}
                  placeholder="Ej. P69905"
                  className="mt-2 w-full rounded-lg px-3 py-2.5 font-mono text-[13px] outline-none transition-colors"
                  style={{
                    background: inputBg,
                    border: `1px solid ${inputBorder}`,
                    color: nameColor,
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = accentViolet;
                    e.target.style.boxShadow = `0 0 0 3px ${
                      isDark
                        ? "rgba(167, 139, 250, 0.10)"
                        : "rgba(124, 58, 237, 0.08)"
                    }`;
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = inputBorder;
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>
            </div>

            <div
              style={{
                height: 1,
                background: isDark
                  ? "rgba(255, 255, 255, 0.06)"
                  : "rgba(14, 19, 48, 0.06)",
              }}
            />

            {/* Secuencia */}
            <div className="p-6">
              <div className="flex items-baseline justify-between">
                <label
                  htmlFor="sequence"
                  className="text-[10.5px] font-bold uppercase tracking-[0.14em]"
                  style={{ color: labelColor }}
                >
                  Secuencia de aminoácidos
                </label>
                <div className="flex items-center gap-3">
                  {cleanedSeq.length > 0 && (
                    <span
                      className="font-mono text-[10.5px] tabular-nums tracking-wide"
                      style={{ color: helperColor }}
                    >
                      {cleanedSeq.length} aa
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
                id="sequence"
                value={sequence}
                onChange={(e) => setSequence(e.target.value.toUpperCase())}
                rows={3}
                placeholder="Ej. MVLSPADKTNVKAAWGKVGAHAGEYGAEALERMFLSFPTTKTYFPHF…"
                className="mt-2 w-full resize-none rounded-lg px-3 py-2.5 font-mono text-[12px] leading-relaxed outline-none transition-colors"
                style={{
                  background: inputBg,
                  border: `1px solid ${
                    hasInvalidChars
                      ? isDark
                        ? "rgba(248, 113, 113, 0.40)"
                        : "rgba(192, 57, 43, 0.35)"
                      : inputBorder
                  }`,
                  color: nameColor,
                  letterSpacing: "0.03em",
                }}
                onFocus={(e) => {
                  if (!hasInvalidChars) {
                    e.target.style.borderColor = accentViolet;
                    e.target.style.boxShadow = `0 0 0 3px ${
                      isDark
                        ? "rgba(167, 139, 250, 0.10)"
                        : "rgba(124, 58, 237, 0.08)"
                    }`;
                  }
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = hasInvalidChars
                    ? isDark
                      ? "rgba(248, 113, 113, 0.40)"
                      : "rgba(192, 57, 43, 0.35)"
                    : inputBorder;
                  e.target.style.boxShadow = "none";
                }}
              />
              <p
                className="mt-2 text-[11px] leading-relaxed"
                style={{ color: helperColor }}
              >
                Cadena de aminoácidos en código de una letra. Se ignoran los espacios.
              </p>

              {hasInvalidChars && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 flex items-start gap-2.5 rounded-lg px-3 py-2.5"
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
                      marginTop: 1,
                    }}
                  />
                  <span
                    className="text-[12px] font-medium"
                    style={{ color: isDark ? "#F87171" : "#991B1B" }}
                  >
                    Contiene caracteres que no son aminoácidos estándar.
                  </span>
                </motion.div>
              )}

              {error && !hasInvalidChars && (
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
                to="/app/proteins"
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
                disabled={submitting || hasInvalidChars}
                className="inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-[13px] font-semibold transition-all hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
                style={{
                  background: "var(--accent)",
                  color: "var(--text-on-accent)",
                }}
              >
                <Save size={14} strokeWidth={2.4} />
                {submitting ? "Guardando…" : "Guardar proteína"}
              </button>
            </div>
          </form>
        </div>
      </motion.div>

      {/* Vista previa a ancho completo */}
      {isValidPreview && !hasInvalidChars && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: SOFT_EASE }}
          className="rounded-2xl p-6"
          style={{ background: cardBg, border: `1px solid ${cardBorder}` }}
        >
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Dna size={13} strokeWidth={2} style={{ color: labelColor }} />
              <span
                className="text-[10.5px] font-bold uppercase tracking-[0.14em]"
                style={{ color: labelColor }}
              >
                Vista previa de la secuencia
              </span>
            </div>

            <div className="flex items-center gap-4 font-mono text-[11px] tracking-wide">
              <span style={{ color: helperColor }}>
                <span style={{ color: nameColor, fontWeight: 600 }}>
                  {cleanedSeq.length}
                </span>{" "}
                residuos
              </span>
              <span style={{ color: helperColor }}>
                <span style={{ color: nameColor, fontWeight: 600 }}>
                  {estimatedWeight >= 1000
                    ? `${(estimatedWeight / 1000).toFixed(1)}k`
                    : estimatedWeight}
                </span>{" "}
                Da
              </span>
              {uniprotId && (
                <span style={{ color: helperColor }}>
                  <span style={{ color: nameColor, fontWeight: 600 }}>
                    {uniprotId}
                  </span>
                </span>
              )}
            </div>
          </div>

          <ProteinSequenceViewer sequence={cleanedSeq} />
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
                background: isDark ? "#14171C" : "#FFFFFF",
                border: `1px solid ${
                  isDark
                    ? "rgba(255, 255, 255, 0.08)"
                    : "rgba(14, 19, 48, 0.10)"
                }`,
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
                    style={{ color: accentViolet }}
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
                      key={ex.name}
                      type="button"
                      onClick={() => handleSelectExample(ex)}
                      className="flex flex-col gap-2 rounded-xl p-4 text-left transition-all duration-200"
                      style={{
                        // Fondo definido: no "casi igual al del modal"
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
                        e.currentTarget.style.borderColor = accentViolet;
                        e.currentTarget.style.background = isDark
                          ? "rgba(167, 139, 250, 0.08)"
                          : "rgba(124, 58, 237, 0.04)";
                        e.currentTarget.style.boxShadow = isDark
                          ? `0 0 0 1px ${accentViolet}, 0 8px 24px rgba(0,0,0,0.3)`
                          : `0 0 0 1px ${accentViolet}, 0 8px 24px rgba(124, 58, 237, 0.10)`;
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
                      {/* Fila 1: Nombre + badge de residuos */}
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
                              ? "rgba(167, 139, 250, 0.15)"
                              : "rgba(124, 58, 237, 0.12)",
                            color: isDark ? "#C4B5FD" : "#6D28D9",
                            border: `1px solid ${
                              isDark
                                ? "rgba(167, 139, 250, 0.25)"
                                : "rgba(124, 58, 237, 0.20)"
                            }`,
                          }}
                        >
                          {ex.sequence.length} aa
                        </span>
                      </div>

                      {/* Fila 2: Secuencia */}
                      <span
                        className="truncate font-mono text-[11px] leading-relaxed tracking-tight"
                        style={{
                          color: isDark ? "#8A93A4" : "#5A6480",
                          fontWeight: 500,
                        }}
                      >
                        {ex.sequence.slice(0, 40)}
                        {ex.sequence.length > 40 ? "…" : ""}
                      </span>

                      {/* Fila 3: UniProt ID (opcional) */}
                      {ex.uniprot_id && (
                        <span
                          className="font-mono text-[10px] font-medium tracking-wide"
                          style={{
                            color: isDark ? "#6B7285" : "#8A93A4",
                          }}
                        >
                          UniProt {ex.uniprot_id}
                        </span>
                      )}
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