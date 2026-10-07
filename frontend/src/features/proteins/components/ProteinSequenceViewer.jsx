import { useMemo, useState } from "react";
import { useTheme } from "../../../providers/ThemeProvider";

/**
 * ProteinSequenceViewer
 * ---------------------
 * Muestra una secuencia de aminoácidos con:
 *  - Numeración cada 60 caracteres
 *  - Bloques de 10 aminoácidos separados por espacio
 *  - Colores por tipo de aminoácido (categorías químicas)
 *  - Toggle entre vista coloreada y vista plana
 *
 * Categorías de aminoácidos:
 *  - Hidrofóbicos (amarillo)
 *  - Polares (verde)
 *  - Ácidos (rojo)
 *  - Básicos (azul)
 *  - Especiales (gris)
 */

// Categorías de aminoácidos por propiedad química
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

const CATEGORY_STYLES_DARK = {
  hydrophobic: { color: "#FBBF24", bg: "rgba(251, 191, 36, 0.14)" },
  polar:       { color: "#4ADE80", bg: "rgba(74, 222, 128, 0.14)" },
  acidic:      { color: "#F87171", bg: "rgba(248, 113, 113, 0.14)" },
  basic:       { color: "#60A5FA", bg: "rgba(96, 165, 250, 0.14)" },
  default:     { color: "#9CA3B4", bg: "rgba(156, 163, 180, 0.10)" },
};

const CATEGORY_STYLES_LIGHT = {
  hydrophobic: { color: "#92400E", bg: "rgba(217, 119, 6, 0.10)" },
  polar:       { color: "#166534", bg: "rgba(22, 101, 52, 0.10)" },
  acidic:      { color: "#991B1B", bg: "rgba(153, 27, 27, 0.10)" },
  basic:       { color: "#1E40AF", bg: "rgba(30, 64, 175, 0.10)" },
  default:     { color: "#4A5170", bg: "rgba(74, 81, 112, 0.06)" },
};

const LEGEND = [
  { key: "hydrophobic", label: "Hidrofóbico" },
  { key: "polar", label: "Polar" },
  { key: "acidic", label: "Ácido" },
  { key: "basic", label: "Básico" },
];

export default function ProteinSequenceViewer({ sequence, linesPerBlock = 60 }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [colored, setColored] = useState(true);

  const categoryStyles = isDark ? CATEGORY_STYLES_DARK : CATEGORY_STYLES_LIGHT;

  // Colores base
  const blockBg = isDark ? "#0F1219" : "#F5F7FA";
  const blockBorder = isDark
    ? "rgba(255, 255, 255, 0.06)"
    : "rgba(14, 19, 48, 0.08)";
  const numberColor = isDark ? "#5A6480" : "#8A93A4";
  const plainAAColor = isDark ? "#E2E6EE" : "#1F2540";

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
      {/* Header con toggle + leyenda */}
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          {LEGEND.map((item) => {
            const style = categoryStyles[item.key];
            return (
              <span
                key={item.key}
                className="flex items-center gap-1.5 text-[11px] font-medium"
                style={{ color: isDark ? "#9CA3B4" : "#4A5170" }}
              >
                <span
                  className="h-2 w-2 rounded-sm"
                  style={{ background: style.color }}
                />
                {item.label}
              </span>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => setColored((c) => !c)}
          className="rounded-md px-2.5 py-1 text-[11px] font-medium transition-colors"
          style={{
            background: isDark
              ? "rgba(255, 255, 255, 0.06)"
              : "rgba(14, 19, 48, 0.05)",
            color: isDark ? "#E2E6EE" : "#2E3550",
            border: `1px solid ${
              isDark ? "rgba(255, 255, 255, 0.10)" : "rgba(14, 19, 48, 0.08)"
            }`,
          }}
        >
          {colored ? "Vista plana" : "Vista coloreada"}
        </button>
      </div>

      {/* Secuencia */}
      <div
        className="overflow-x-auto rounded-lg p-4"
        style={{
          background: blockBg,
          border: `1px solid ${blockBorder}`,
        }}
      >
        <div className="space-y-1.5 font-mono text-[12.5px] leading-[1.6]">
          {lines.map((line, idx) => (
            <div key={idx} className="flex gap-4">
              {/* Número de línea */}
              <span
                className="shrink-0 select-none tabular-nums"
                style={{ color: numberColor, minWidth: 56 }}
              >
                {(line.start + 1).toString().padStart(4, " ")}
              </span>

              {/* Aminoácidos — agrupados en bloques de 10 */}
              <span className="break-all">
                {line.text.match(/.{1,10}/g)?.map((group, gi) => (
                  <span key={gi} className="mr-2.5 inline-block">
                    {group.split("").map((aa, ai) => {
                      const category = AA_CATEGORIES[aa] || "default";
                      const style = categoryStyles[category];

                      if (!colored) {
                        return (
                          <span
                            key={ai}
                            style={{ color: plainAAColor }}
                          >
                            {aa}
                          </span>
                        );
                      }

                      return (
                        <span
                          key={ai}
                          style={{
                            color: style.color,
                            background: style.bg,
                            borderRadius: 3,
                            padding: "1px 1px",
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
      <div className="mt-3 flex items-center justify-between text-[11px]">
        <span style={{ color: isDark ? "#8A93A4" : "#5A6480" }}>
          {sequence.length} residuos
        </span>
        <span style={{ color: isDark ? "#8A93A4" : "#5A6480" }}>
          {lines.length} líneas
        </span>
      </div>
    </div>
  );
}