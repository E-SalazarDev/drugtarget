import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Atom, Dna, BrainCircuit, ArrowRight } from "lucide-react";
import { useTheme } from "../../../providers/ThemeProvider";

export default function PipelineCard({
  moleculesCount = 68,
  proteinsCount = 378,
  predictionsReady = false,
}) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const STEPS = [
    {
      n: "01",
      label: "Moléculas",
      description: "Compuestos cargados vía SMILES",
      count: moleculesCount,
      countLabel: "registradas",
      icon: Atom,
      href: "/app/molecules",
      color: isDark ? "#22D3E6" : "#0A7C85",
      colorSoft: isDark
        ? "rgba(34, 211, 230, 0.10)"
        : "rgba(10, 124, 133, 0.08)",
      colorBorder: isDark
        ? "rgba(34, 211, 230, 0.20)"
        : "rgba(10, 124, 133, 0.20)",
    },
    {
      n: "02",
      label: "Proteínas",
      description: "Dianas terapéuticas registradas",
      count: proteinsCount,
      countLabel: "disponibles",
      icon: Dna,
      href: "/app/proteins",
      color: isDark ? "#A78BFA" : "#7C3AED",
      colorSoft: isDark
        ? "rgba(167, 139, 250, 0.10)"
        : "rgba(124, 58, 237, 0.08)",
      colorBorder: isDark
        ? "rgba(167, 139, 250, 0.20)"
        : "rgba(124, 58, 237, 0.20)",
    },
    {
      n: "03",
      label: "Predicciones",
      description: predictionsReady
        ? "Ranking de afinidad disponible"
        : "Modelo en construcción",
      count: predictionsReady ? "Listo" : "—",
      countLabel: predictionsReady ? "activo" : "pendiente",
      icon: BrainCircuit,
      href: "/app/predictions",
      color: predictionsReady
        ? isDark
          ? "#4ADE80"
          : "#0A8F4A"
        : isDark
        ? "#FBBF24"
        : "#B45309",
      colorSoft: predictionsReady
        ? isDark
          ? "rgba(74, 222, 128, 0.10)"
          : "rgba(10, 143, 74, 0.08)"
        : isDark
        ? "rgba(251, 191, 36, 0.10)"
        : "rgba(180, 83, 9, 0.08)",
      colorBorder: predictionsReady
        ? isDark
          ? "rgba(74, 222, 128, 0.20)"
          : "rgba(10, 143, 74, 0.20)"
        : isDark
        ? "rgba(251, 191, 36, 0.20)"
        : "rgba(180, 83, 9, 0.20)",
    },
  ];

  const cardBg = isDark ? "#14171C" : "#FFFFFF";
  const cardBorder = isDark
    ? "rgba(255, 255, 255, 0.08)"
    : "rgba(14, 19, 48, 0.08)";
  const arrowColor = isDark
    ? "rgba(255, 255, 255, 0.10)"
    : "rgba(14, 19, 48, 0.10)";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <h2
        className="mb-3 text-[11px] font-bold uppercase tracking-[0.14em]"
        style={{ color: isDark ? "#9CA3B4" : "#6B7285" }}
      >
        Pipeline del producto
      </h2>

      <div className="grid gap-3 lg:grid-cols-[1fr_auto_1fr_auto_1fr]">
        {STEPS.map((step, i) => {
          const Icon = step.icon;
          const isLast = i === STEPS.length - 1;

          return (
            <div key={step.n} className="contents">
              <Link
                to={step.href}
                className="group relative flex flex-col gap-3 rounded-2xl p-5 transition-all duration-200"
                style={{
                  background: cardBg,
                  border: `1px solid ${cardBorder}`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = step.colorBorder;
                  e.currentTarget.style.background = isDark
                    ? "rgba(255, 255, 255, 0.02)"
                    : "rgba(14, 19, 48, 0.01)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = cardBorder;
                  e.currentTarget.style.background = cardBg;
                }}
              >
                {/* Header: número + ícono */}
                <div className="flex items-start justify-between">
                  <span
                    className="font-mono text-[11px] font-bold tabular-nums tracking-wider"
                    style={{ color: step.color }}
                  >
                    PASO {step.n}
                  </span>

                  <div
                    className="flex h-8 w-8 items-center justify-center rounded-lg"
                    style={{
                      background: step.colorSoft,
                      border: `1px solid ${step.colorBorder}`,
                    }}
                  >
                    <Icon
                      size={14}
                      strokeWidth={2.2}
                      style={{ color: step.color }}
                    />
                  </div>
                </div>

                {/* Título */}
                <div>
                  <h3
                    className="text-[15px] font-bold tracking-[-0.01em]"
                    style={{ color: isDark ? "#FFFFFF" : "#0A0F24" }}
                  >
                    {step.label}
                  </h3>
                  <p
                    className="mt-1 text-[11.5px] leading-relaxed"
                    style={{ color: isDark ? "#98A0AB" : "#5A6480" }}
                  >
                    {step.description}
                  </p>
                </div>

                {/* Métrica */}
                <div
                  className="mt-1 flex items-baseline justify-between border-t pt-3"
                  style={{
                    borderColor: isDark
                      ? "rgba(255, 255, 255, 0.06)"
                      : "rgba(14, 19, 48, 0.06)",
                  }}
                >
                  <span
                    className="font-mono text-[18px] font-bold tabular-nums leading-none"
                    style={{ color: isDark ? "#FFFFFF" : "#0A0F24" }}
                  >
                    {step.count}
                  </span>
                  <span
                    className="text-[10.5px] font-medium uppercase tracking-wider"
                    style={{ color: isDark ? "#7A8494" : "#8A93A4" }}
                  >
                    {step.countLabel}
                  </span>
                </div>
              </Link>

              {/* Flecha entre pasos */}
              {!isLast && (
                <div className="hidden items-center justify-center lg:flex">
                  <ArrowRight
                    size={16}
                    strokeWidth={2.2}
                    style={{ color: arrowColor }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}