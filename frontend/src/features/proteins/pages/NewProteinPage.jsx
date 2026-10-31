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

const cardStyle = {
  background: "var(--card-bg)",
  border: "1px solid var(--card-border)",
  boxShadow: "var(--shadow-md)",
};

const inputBase = {
  background: "var(--surface-3)",
  color: "var(--text-primary)",
};

const pillStyle = {
  color: "var(--link)",
  border: "1px solid var(--icon-box-border)",
  background: "var(--icon-box-bg)",
};

const labelClass = "text-[11.5px] font-bold uppercase tracking-[0.14em]";

const focusIn = (e) => {
  e.target.style.borderColor = "var(--accent-violet)";
  e.target.style.boxShadow = "0 0 0 3px var(--accent-violet-soft)";
};

export default function NewProteinPage() {
  const navigate = useNavigate();

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

  const normalBorder = "var(--border-medium)";
  const seqBorder = hasInvalidChars ? "var(--accent-danger)" : normalBorder;

  const focusOut = (e) => {
    e.target.style.borderColor = normalBorder;
    e.target.style.boxShadow = "none";
  };

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
          className="group inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12.5px] font-semibold transition-colors hover:bg-(--hover-overlay)"
          style={pillStyle}
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
            {/* Nombre + UniProt */}
            <div className="grid gap-5 p-6 sm:grid-cols-2">
              <div>
                <div className="flex items-baseline justify-between">
                  <label
                    htmlFor="name"
                    className={labelClass}
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
                  placeholder="Ej. Hemoglobina"
                  className="mt-2 w-full rounded-lg px-3.5 py-2.5 text-[14px] outline-none transition-colors"
                  style={{ ...inputBase, border: `1px solid ${normalBorder}` }}
                  onFocus={focusIn}
                  onBlur={focusOut}
                />
              </div>

              <div>
                <div className="flex items-baseline justify-between">
                  <label
                    htmlFor="uniprot"
                    className={labelClass}
                    style={{ color: "var(--text-secondary)" }}
                  >
                    UniProt ID
                  </label>
                  <span
                    className="text-[11px] font-medium"
                    style={{ color: "var(--text-tertiary)" }}
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
                  className="mt-2 w-full rounded-lg px-3.5 py-2.5 font-mono text-[13.5px] outline-none transition-colors"
                  style={{ ...inputBase, border: `1px solid ${normalBorder}` }}
                  onFocus={focusIn}
                  onBlur={focusOut}
                />
              </div>
            </div>

            <div style={{ height: 1, background: "var(--row-border)" }} />

            {/* Secuencia */}
            <div className="p-6">
              <div className="flex items-baseline justify-between">
                <label
                  htmlFor="sequence"
                  className={labelClass}
                  style={{ color: "var(--text-secondary)" }}
                >
                  Secuencia de aminoácidos
                </label>
                <div className="flex items-center gap-3">
                  {cleanedSeq.length > 0 && (
                    <span
                      className="font-mono text-[11.5px] tabular-nums tracking-wide"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {cleanedSeq.length} aa
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
                id="sequence"
                value={sequence}
                onChange={(e) => setSequence(e.target.value.toUpperCase())}
                rows={3}
                placeholder="Ej. MVLSPADKTNVKAAWGKVGAHAGEYGAEALERMFLSFPTTKTYFPHF…"
                className="mt-2 w-full resize-none rounded-lg px-3.5 py-2.5 font-mono text-[13px] leading-relaxed outline-none transition-colors"
                style={{
                  ...inputBase,
                  border: `1px solid ${seqBorder}`,
                  letterSpacing: "0.03em",
                }}
                onFocus={(e) => {
                  if (!hasInvalidChars) focusIn(e);
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = seqBorder;
                  e.target.style.boxShadow = "none";
                }}
              />
              <p
                className="mt-2 text-[12px] leading-relaxed"
                style={{ color: "var(--text-tertiary)" }}
              >
                Cadena de aminoácidos en código de una letra. Se ignoran los espacios.
              </p>

              {hasInvalidChars && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 flex items-start gap-2.5 rounded-lg px-3 py-2.5"
                  style={{
                    background: "var(--accent-danger-soft)",
                    border: "1px solid var(--accent-danger)",
                  }}
                >
                  <AlertCircle
                    size={14}
                    strokeWidth={2.2}
                    style={{
                      color: "var(--accent-danger)",
                      flexShrink: 0,
                      marginTop: 1,
                    }}
                  />
                  <span
                    className="text-[12.5px] font-semibold"
                    style={{ color: "var(--accent-danger)" }}
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
                to="/app/proteins"
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
          style={cardStyle}
        >
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span
                className="flex h-6 w-6 items-center justify-center rounded-md"
                style={{ background: "var(--chip-pink-bg)" }}
              >
                <Dna
                  size={13}
                  strokeWidth={2.4}
                  style={{ color: "var(--chip-text)" }}
                />
              </span>
              <span
                className={labelClass}
                style={{ color: "var(--text-secondary)" }}
              >
                Vista previa de la secuencia
              </span>
            </div>

            <div
              className="flex items-center gap-4 font-mono text-[12px] tracking-wide"
              style={{ color: "var(--text-secondary)" }}
            >
              <span>
                <b style={{ color: "var(--text-primary)" }}>{cleanedSeq.length}</b>{" "}
                residuos
              </span>
              <span>
                <b style={{ color: "var(--text-primary)" }}>
                  {estimatedWeight >= 1000
                    ? `${(estimatedWeight / 1000).toFixed(1)}k`
                    : estimatedWeight}
                </b>{" "}
                Da
              </span>
              {uniprotId && (
                <b style={{ color: "var(--text-primary)" }}>{uniprotId}</b>
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
                    style={{ background: "var(--chip-pink-bg)" }}
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
                      key={ex.name}
                      type="button"
                      onClick={() => handleSelectExample(ex)}
                      className="flex flex-col gap-2.5 rounded-xl p-4 text-left transition-all duration-200"
                      style={{
                        background: "var(--icon-box-bg)",
                        border: "1px solid var(--row-border)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = "var(--accent-violet)";
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
                            background: "var(--chip-pink-bg)",
                            color: "var(--chip-text)",
                          }}
                        >
                          {ex.sequence.length} aa
                        </span>
                      </div>

                      <span
                        className="truncate font-mono text-[11.5px] leading-relaxed tracking-tight"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {ex.sequence.slice(0, 40)}
                        {ex.sequence.length > 40 ? "…" : ""}
                      </span>

                      {ex.uniprot_id && (
                        <span
                          className="font-mono text-[11px] font-semibold tracking-wide"
                          style={{ color: "var(--text-tertiary)" }}
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