import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Check } from "lucide-react";

const STEPS = [
  { label: "Cargando proteína objetivo", duration: 700 },
  { label: "Extrayendo features moleculares", duration: 900 },
  { label: "Ejecutando modelo de afinidad", duration: 1100 },
  { label: "Ordenando candidatos", duration: 500 },
];

const VIOLET_GRADIENT = "linear-gradient(135deg, #A48BFF 0%, #6D4AF2 100%)";

export default function PredictionLoading({ onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    let cancelled = false;
    let totalDelay = 0;

    STEPS.forEach((step, i) => {
      totalDelay += step.duration;
      setTimeout(() => {
        if (!cancelled) setCurrentStep(i + 1);
      }, totalDelay);
    });

    // Al terminar todos los pasos, llamar onComplete
    const finalTimer = setTimeout(() => {
      if (!cancelled) onComplete();
    }, totalDelay + 300);

    return () => {
      cancelled = true;
      clearTimeout(finalTimer);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.4 }}
      className="rounded-2xl p-10 sm:p-14"
      style={{
        background: "var(--card-bg)",
        border: "1px solid var(--card-border)",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      <div className="mx-auto max-w-md">
        {/* Spinner:*/}
        <div className="flex justify-center">
          <div className="relative h-18 w-18">
            <motion.svg
              viewBox="0 0 72 72"
              className="absolute inset-0"
              animate={{ rotate: 360 }}
              transition={{ duration: 1.3, repeat: Infinity, ease: "linear" }}
            >
              <defs>
                <linearGradient id="loadingArc" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#B8A6FF" />
                  <stop offset="100%" stopColor="#6D4AF2" />
                </linearGradient>
              </defs>
              <circle
                cx="36"
                cy="36"
                r="31"
                fill="none"
                style={{ stroke: "var(--bar-track)" }}
                strokeWidth="4"
              />
              <circle
                cx="36"
                cy="36"
                r="31"
                fill="none"
                stroke="url(#loadingArc)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="70 125"
              />
            </motion.svg>

            <motion.svg
              viewBox="0 0 72 72"
              className="absolute inset-0"
              animate={{ rotate: -360 }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
            >
              <circle
                cx="36"
                cy="36"
                r="20"
                fill="none"
                style={{ stroke: "var(--text-primary)" }}
                strokeOpacity="0.7"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray="34 92"
              />
            </motion.svg>
          </div>
        </div>

        {/* Título */}
        <h2
          className="mt-8 text-center text-[20px] font-bold tracking-[-0.01em]"
          style={{ color: "var(--text-primary)" }}
        >
          Calculando ranking de afinidad
        </h2>
        <p
          className="mt-2 text-center text-[13.5px]"
          style={{ color: "var(--text-secondary)" }}
        >
          El modelo está evaluando cada candidato…
        </p>

        {/* Pasos */}
        <div className="mt-8 space-y-3.5">
          {STEPS.map((step, i) => {
            const isDone = i < currentStep;
            const isActive = i === currentStep;

            return (
              <div key={i} className="flex items-center gap-3">
                {/* Indicador */}
                <div
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-all"
                  style={{
                    background: isDone ? VIOLET_GRADIENT : "transparent",
                    border: `${isActive ? 2 : 1}px solid ${
                      isDone
                        ? "transparent"
                        : isActive
                        ? "#8E74FF"
                        : "var(--border-medium)"
                    }`,
                  }}
                >
                  {isDone ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Check size={12} strokeWidth={3.4} color="#FFFFFF" />
                    </motion.div>
                  ) : isActive ? (
                    <motion.div
                      className="h-2 w-2 rounded-full"
                      style={{ background: "var(--text-primary)" }}
                      animate={{ opacity: [0.35, 1, 0.35] }}
                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  ) : (
                    <div
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ background: "var(--text-quaternary)" }}
                    />
                  )}
                </div>

                {/* Label */}
                <span
                  className="text-[13.5px] font-semibold transition-colors"
                  style={{
                    color:
                      isDone || isActive
                        ? "var(--text-primary)"
                        : "var(--text-tertiary)",
                  }}
                >
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}