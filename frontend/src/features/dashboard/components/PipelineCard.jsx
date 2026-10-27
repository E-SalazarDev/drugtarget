import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Atom, Dna, BrainCircuit, ArrowRight } from "lucide-react";

const cardBg = "var(--card-bg)";
const cardBorder = "var(--card-border)";

export default function PipelineCard({
  moleculesCount = 68,
  proteinsCount = 378,
  predictionsReady = false,
}) {
  const STEPS = [
    {
      n: "01",
      label: "Moléculas",
      description: "Compuestos cargados vía SMILES",
      count: moleculesCount,
      countLabel: "registradas",
      icon: Atom,
      href: "/app/molecules",
      color: "var(--chip-text)",
      colorSoft: "var(--chip-lilac-bg)",
      colorBorder: "transparent",
    },
    {
      n: "02",
      label: "Proteínas",
      description: "Dianas terapéuticas registradas",
      count: proteinsCount,
      countLabel: "disponibles",
      icon: Dna,
      href: "/app/proteins",
      color: "var(--chip-text)",
      colorSoft: "var(--chip-pink-bg)",
      colorBorder: "transparent",
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
      color: "var(--chip-text)",
      colorSoft: predictionsReady
        ? "var(--chip-lime-bg)"
        : "var(--chip-amber-bg)",
      colorBorder: "transparent",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <h2
        className="mb-3 text-[11px] font-bold uppercase tracking-[0.14em]"
        style={{ color: "var(--text-secondary)" }}
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
                  boxShadow: "var(--shadow-sm)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--border-strong)";
                  e.currentTarget.style.background = "var(--surface-hover)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--card-border)";
                  e.currentTarget.style.background = "var(--card-bg)";
                }}
              >
                {/* Header: número + ícono */}
                <div className="flex items-start justify-between">
                  <span
                    className="font-mono text-[11px] font-bold tabular-nums tracking-wider"
                    style={{ color: "var(--text-secondary)" }}
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
                    style={{ color: "var(--text-primary)" }}
                  >
                    {step.label}
                  </h3>
                  <p
                    className="mt-1 text-[11.5px] leading-relaxed"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {step.description}
                  </p>
                </div>

                {/* Métrica */}
                <div
                  className="mt-1 flex items-baseline justify-between border-t pt-3"
                  style={{ borderColor: "var(--row-border)" }}
                >
                  <span
                    className="font-mono text-[18px] font-bold tabular-nums leading-none"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {step.count}
                  </span>
                  <span
                    className="text-[10.5px] font-medium uppercase tracking-wider"
                    style={{ color: "var(--text-tertiary)" }}
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
                    style={{ color: "var(--text-quaternary)" }}
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