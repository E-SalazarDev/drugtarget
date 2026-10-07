import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check } from "lucide-react";
import { useTheme } from "../../../providers/ThemeProvider";

const STEPS = [
  { label: "Cargando proteína objetivo", duration: 700 },
  { label: "Extrayendo features moleculares", duration: 900 },
  { label: "Ejecutando modelo de afinidad", duration: 1100 },
  { label: "Ordenando candidatos", duration: 500 },
];

export default function PredictionLoading({ onComplete }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [currentStep, setCurrentStep] = useState(0);

  const nameColor = isDark ? "#FFFFFF" : "#0A0F24";
  const labelColor = isDark ? "#9CA3B4" : "#4A5170";
  const accentCyan = isDark ? "#22D3E6" : "#0A7C85";

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
        background: isDark ? "#14171C" : "#FFFFFF",
        border: `1px solid ${
          isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(14, 19, 48, 0.08)"
        }`,
      }}
    >
      <div className="mx-auto max-w-md">
        {/* Spinner circular animado */}
        <div className="flex justify-center">
          <div className="relative h-16 w-16">
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                border: `2px solid ${
                  isDark
                    ? "rgba(34, 211, 230, 0.15)"
                    : "rgba(10, 124, 133, 0.15)"
                }`,
                borderTopColor: accentCyan,
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute inset-2 rounded-full"
              style={{
                border: `2px solid ${
                  isDark
                    ? "rgba(34, 211, 230, 0.10)"
                    : "rgba(10, 124, 133, 0.10)"
                }`,
                borderBottomColor: accentCyan,
              }}
              animate={{ rotate: -360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </div>

        {/* Título */}
        <h2
          className="mt-8 text-center text-[20px] font-bold tracking-[-0.01em]"
          style={{ color: nameColor }}
        >
          Calculando ranking de afinidad
        </h2>
        <p
          className="mt-2 text-center text-[13px]"
          style={{ color: labelColor }}
        >
          El modelo está evaluando cada candidato…
        </p>

        {/* Pasos */}
        <div className="mt-8 space-y-3">
          {STEPS.map((step, i) => {
            const isDone = i < currentStep;
            const isActive = i === currentStep;

            return (
              <div key={i} className="flex items-center gap-3">
                {/* Indicador */}
                <div
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-colors"
                  style={{
                    background: isDone
                      ? isDark
                        ? "rgba(34, 211, 230, 0.15)"
                        : "rgba(10, 124, 133, 0.12)"
                      : isActive
                      ? isDark
                        ? "rgba(34, 211, 230, 0.08)"
                        : "rgba(10, 124, 133, 0.06)"
                      : "transparent",
                    border: `1px solid ${
                      isDone || isActive
                        ? accentCyan
                        : isDark
                        ? "rgba(255, 255, 255, 0.10)"
                        : "rgba(14, 19, 48, 0.10)"
                    }`,
                  }}
                >
                  {isDone ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Check
                        size={12}
                        strokeWidth={3}
                        style={{ color: accentCyan }}
                      />
                    </motion.div>
                  ) : isActive ? (
                    <motion.div
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ background: accentCyan }}
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  ) : (
                    <div
                      className="h-1.5 w-1.5 rounded-full"
                      style={{
                        background: isDark
                          ? "rgba(255, 255, 255, 0.20)"
                          : "rgba(14, 19, 48, 0.20)",
                      }}
                    />
                  )}
                </div>

                {/* Label */}
                <span
                  className="text-[13px] font-medium transition-colors"
                  style={{
                    color: isDone
                      ? nameColor
                      : isActive
                      ? nameColor
                      : labelColor,
                    opacity: isDone || isActive ? 1 : 0.6,
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