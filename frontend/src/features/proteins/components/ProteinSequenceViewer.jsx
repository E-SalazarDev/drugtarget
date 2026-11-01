import { useMemo, useState } from "react";

/**
 * ProteinSequenceViewer
 * ---------------------
 * Muestra una secuencia de aminoácidos con:
 *  - Numeración cada 60 caracteres
 *  - Bloques de 10 aminoácidos separados por espacio
 *  - Colores por tipo de aminoácido (categorías químicas)
 *  - Toggle entre vista coloreada y vista plana
 *
 * Categorías:
 *  - Hidrofóbicos (ámbar)  - Polares (lima)
 *  - Ácidos (rojo)         - Básicos (lavanda)
 */

const AA_CATEGORIES = {
  // Hidrofóbicos — cadena lateral apolar
  A: "hydrophobic", V: "hydrophobic", L: "hydrophobic", I: "hydrophobic",
  M: "hydrophobic", F: "hydrophobic", W: "hydrophobic", P: "hydrophobic",
  G: "hydrophobic",
  // Polares sin carga
  S: "polar", T: "polar", C: "polar", Y: "polar", N: "polar", Q: "polar",
  // Ácidos (carga negativa)
  D: "acidic", E: "acidic",
  // Básicos (carga positiva)
  K: "basic", R: "basic", H: "basic",
};

// Todos los colores salen de tokens.css, así funcionan en claro y oscuro
const CATEGORY_STYLES = {
  hydrophobic: { color: "var(--accent-warning)", bg: "var(--accent-warning-soft)" },
  polar:       { color: "var(--accent-success)", bg: "var(--accent-success-soft)" },
  acidic:      { color: "var(--accent-danger)",  bg: "var(--accent-danger-soft)" },
  basic:       { color: "var(--accent-cyan)",    bg: "var(--accent-cyan-soft)" },
  default:     { color: "var(--text-secondary)", bg: "var(--icon-box-bg)" },
};

const LEGEND = [
  { key: "hydrophobic", label: "Hidrofóbico" },
  { key: "polar", label: "Polar" },
  { key: "acidic", label: "Ácido" },
  { key: "basic", label: "Básico" },
];

export default function ProteinSequenceViewer({ sequence = "", linesPerBlock = 60 }) {
  const [colored, setColored] = useState(true);

  // Partimos la secuencia en líneas de `linesPerBlock` caracteres
  const lines = useMemo(() => {
    if (!sequence) return [];
    const out = [];
    for (let i = 0; i < sequence.length; i += linesPerBlock) {
      out.push({
        start: i,
        text: sequence.slice(i, i + linesPerBlock),
      });
    }
    return out;
  }, [sequence, linesPerBlock]);

  return (
    <div>
      {/* Header con leyenda + toggle */}
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-4">
          {LEGEND.map((item) => (
            <span
              key={item.key}
              className="flex items-center gap-2 text-[12px] font-semibold"
              style={{ color: "var(--text-secondary)" }}
            >
              <span
                className="h-2.5 w-2.5 rounded-sm"
                style={{ background: CATEGORY_STYLES[item.key].color }}
              />
              {item.label}
            </span>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setColored((c) => !c)}
          className="rounded-full px-3.5 py-1.5 text-[12px] font-semibold transition-colors hover:bg-(--hover-overlay)"
          style={{
            background: "var(--icon-box-bg)",
            color: "var(--link)",
            border: "1px solid var(--icon-box-border)",
          }}
        >
          {colored ? "Vista plana" : "Vista coloreada"}
        </button>
      </div>

      {/* Secuencia */}
      <div
        className="overflow-x-auto rounded-xl p-4"
        style={{
          background: "var(--surface-3)",
          border: "1px solid var(--row-border)",
        }}
      >
        <div className="space-y-2 font-mono text-[13px] leading-[1.7]">
          {lines.map((line, idx) => (
            <div key={idx} className="flex gap-4">
              {/* Número de línea */}
              <span
                className="shrink-0 select-none tabular-nums"
                style={{ color: "var(--text-tertiary)", minWidth: 56 }}
              >
                {(line.start + 1).toString().padStart(4, " ")}
              </span>

              {/* Aminoácidos — agrupados en bloques de 10 */}
              <span className="break-all">
                {line.text.match(/.{1,10}/g)?.map((group, gi) => (
                  <span key={gi} className="mr-3 inline-block">
                    {group.split("").map((aa, ai) => {
                      if (!colored) {
                        return (
                          <span key={ai} style={{ color: "var(--text-primary)" }}>
                            {aa}
                          </span>
                        );
                      }

                      const style =
                        CATEGORY_STYLES[AA_CATEGORIES[aa] || "default"];

                      return (
                        <span
                          key={ai}
                          style={{
                            color: style.color,
                            background: style.bg,
                            borderRadius: 3,
                            padding: "1px 1.5px",
                            fontWeight: 600,
                          }}
                        >
                          {aa}
                        </span>
                      );
                    })}
                  </span>
                ))}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Pie de info */}
      <div
        className="mt-3 flex items-center justify-between text-[12px] font-medium"
        style={{ color: "var(--text-secondary)" }}
      >
        <span>{sequence.length} residuos</span>
        <span>{lines.length} líneas</span>
      </div>
    </div>
  );
}