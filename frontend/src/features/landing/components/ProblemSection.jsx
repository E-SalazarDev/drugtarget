// src/features/landing/components/ProblemSection.jsx
import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "motion/react";
import {
  FlaskConical,
  Microscope,
  ShieldCheck,
  Sparkles,
  ListOrdered,
  Beaker,
  Zap,
  TrendingDown,
  Workflow,
} from "lucide-react";

const STEPS = ["validar", "predecir", "priorizar"];
const DOTS_PER_CONNECTOR = 5;
const DOT_STAGGER = 0.22;
const DOT_DURATION = 0.5;
const CHIP_ACTIVATE_AFTER_DOTS = DOTS_PER_CONNECTOR * DOT_STAGGER + 0.2;
const PHASE_DURATION = 3800;
const SOFT_EASE = [0.22, 1, 0.36, 1];

const INLINE_DOTS = 4;
const INLINE_STAGGER = 0.18;

export default function ProblemSection() {
  return (
    <section
      id="problema"
      className="relative w-full overflow-hidden bg-[#02040C] px-5 py-20 sm:px-8 lg:px-12 xl:px-16"
    >
      <div className="relative mx-auto max-w-375">
        {/* Encabezado */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.01 }}
            transition={{ duration: 0.7, ease: SOFT_EASE }}
            className="max-w-2xl"
          >
            <h2 className="text-[2.25rem] font-bold leading-[1.05] tracking-[-0.04em] text-[#EAF0FF] sm:text-[2.75rem] lg:text-[3.25rem]">
              Menos ensayo.
              <br />
              Más <span className="text-[#29D9FF]">criterio</span>.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.01 }}
            transition={{ duration: 0.7, delay: 0.1, ease: SOFT_EASE }}
            className="max-w-md border-l-2 border-[#2F6BFF]/40 pl-5 lg:mt-2"
          >
            <p className="text-[15px] font-medium leading-7 text-[#EAF0FF]">
              El descubrimiento de candidatos suele empezar con una búsqueda
              enorme que después debe pasar por síntesis y validación
              experimental.
            </p>
          </motion.div>
        </div>

        {/* Comparación asimétrica 40/60 */}
        <div className="mt-12 grid gap-5 lg:grid-cols-[0.8fr_1.2fr] lg:items-stretch">
          {/* Convencional */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.01 }}
            transition={{ duration: 0.8, ease: SOFT_EASE }}
            className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#101A48] bg-[#01030A]"
          >
            <div className="flex items-center justify-between px-5 py-4">
              <div className="flex items-center gap-2.5">
                <FlaskConical className="h-4 w-4 text-[#8A7CFF]" />
                <span className="text-[14px] font-semibold text-[#EAF0FF]">
                  Flujo convencional
                </span>
              </div>
              <span className="font-mono text-[11px] uppercase tracking-widest text-[#EAF0FF]/70">
                validación primero
              </span>
            </div>

            <div className="flex flex-1 flex-col p-5 pt-2">
              <div className="flex flex-col gap-2">
                <FlowStep icon={<FlaskConical className="h-4 w-4" />} label="Sintetizar" tone="warm" />
                <FlowStep icon={<Microscope className="h-4 w-4" />} label="Testear" tone="warm" />
                <FlowStep icon={<ShieldCheck className="h-4 w-4" />} label="Validar" tone="warm" />
              </div>

              <div className="mt-auto flex items-start gap-2 pt-6">
                <TrendingDown className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#8A7CFF]" />
                <span className="text-[13.5px] leading-5 text-[#DCE6FF]">
                  Cada candidato se prueba en el laboratorio, uno por uno.
                </span>
              </div>
            </div>
          </motion.div>

          {/* DrugTarget */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.01 }}
            transition={{ duration: 0.8, delay: 0.1, ease: SOFT_EASE }}
            className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#29D9FF]/40 bg-[#01030A]"
          >
            <div className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center gap-2.5">
                <Zap className="h-5 w-5 text-[#29D9FF]" />
                <span className="text-[15px] font-semibold text-[#EAF0FF]">
                  Con DrugTarget
                </span>
              </div>
              <span className="font-mono text-[11px] uppercase tracking-widest text-[#EAF0FF]/70">
                prediction first
              </span>
            </div>

            <div className="flex flex-1 flex-col p-6 pt-2">
              <p className="mb-6 max-w-lg text-[14.5px] leading-7 text-[#DCE6FF]">
                El modelo estima la afinidad de cada candidato antes de tocar
                el laboratorio. Solo los mejor rankeados pasan a validación
                experimental.
              </p>

              <div className="flex items-center gap-3">
                <FlowStep icon={<Sparkles className="h-4 w-4" />} label="Predecir" tone="cool" />
                <InlineDots />
                <FlowStep icon={<ListOrdered className="h-4 w-4" />} label="Priorizar" tone="cool" />
                <InlineDots delay={0.4} />
                <FlowStep icon={<Beaker className="h-4 w-4" />} label="Experimentar" tone="cool" />
              </div>

              <div className="mt-auto flex items-start gap-2 pt-6">
                <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#29D9FF]" />
                <span className="text-[13.5px] leading-5 text-[#DCE6FF]">
                  Solo los candidatos priorizados llegan al laboratorio.
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Franja informativa */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.01 }}
          transition={{ duration: 0.7, ease: SOFT_EASE }}
          className="mt-10 overflow-hidden rounded-2xl border border-[#101A48] bg-[#01030A]"
        >
          <div className="p-6 sm:p-7">
            <p className="text-[16px] font-medium leading-7 text-[#EAF0FF]">
              La predicción no reemplaza la validación experimental.
              <span className="text-[#DCE6FF]">
                {" "}
                Ayuda a decidir qué candidatos merece la pena evaluar primero.
              </span>
            </p>
          </div>

          <div className="border-t border-[#101A48] px-6 py-5 sm:px-7">
            <div className="mb-5 flex items-center gap-2.5">
              <Workflow className="h-3.5 w-3.5 text-[#29D9FF]" />
              <span className="text-[12px] font-medium uppercase tracking-[0.14em] text-[#DCE6FF]/70">
                Proceso de decisión
              </span>
            </div>

            <DecisionFlow />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function InlineDots({ delay = 0 }) {
  return (
    <div className="flex shrink-0 items-center gap-1.5 px-1">
      {Array.from({ length: INLINE_DOTS }).map((_, i) => (
        <motion.span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-[#29D9FF]"
          animate={{
            opacity: [0.15, 0.9, 0.15],
            scale: [0.8, 1.1, 0.8],
          }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: delay + i * INLINE_STAGGER,
          }}
        />
      ))}
    </div>
  );
}

function DecisionFlow() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.01 });
  const [phase, setPhase] = useState(-1);

  useEffect(() => {
    if (!isInView) return;
    setPhase(0);
  }, [isInView]);

  useEffect(() => {
    if (phase < 0) return;
    const timeout = setTimeout(() => {
      setPhase((p) => (p + 1) % STEPS.length);
    }, PHASE_DURATION);
    return () => clearTimeout(timeout);
  }, [phase]);

  return (
    <div
      ref={ref}
      className="grid grid-cols-[auto_1fr_auto_1fr_auto] items-center gap-3 sm:gap-4"
    >
      {STEPS.map((label, i) => (
        <FlowItem
          key={label}
          index={i}
          label={label}
          phase={phase}
          active={phase === i}
          completed={phase > i}
        />
      ))}
    </div>
  );
}

function FlowItem({ index, label, phase, active, completed }) {
  const isLast = index === STEPS.length - 1;

  return (
    <>
      {index > 0 && (
        <Dots
          filling={active}
          completed={completed || active}
        />
      )}

      <motion.div
        className="relative shrink-0"
        animate={{
          scale: active ? 1.08 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 220,
          damping: 24,
          delay: active && phase > 0 ? CHIP_ACTIVATE_AFTER_DOTS : 0,
        }}
      >
        <motion.div
          className={`
            rounded-md border px-4 py-2.5 text-[13.5px] font-medium
            ${
              active
                ? "border-[#29D9FF] bg-[#29D9FF]/8 text-[#EAF0FF]"
                : completed
                ? "border-[#29D9FF]/40 bg-[#29D9FF]/3 text-[#EAF0FF]/85"
                : "border-[#101A48] bg-transparent text-[#DCE6FF]/60"
            }
          `}
          animate={{
            opacity: active ? 1 : completed ? 0.95 : 0.55,
          }}
          transition={{
            duration: 0.5,
            ease: SOFT_EASE,
            delay: active && phase > 0 ? CHIP_ACTIVATE_AFTER_DOTS : 0,
          }}
        >
          {label}
        </motion.div>

        {active && (
          <motion.span
            className="pointer-events-none absolute inset-0 rounded-md"
            initial={{ boxShadow: "0 0 0 0 rgba(41,217,255,0)" }}
            animate={{
              boxShadow: [
                "0 0 0 0 rgba(41,217,255,0.35)",
                "0 0 0 12px rgba(41,217,255,0)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeOut",
              delay: phase > 0 ? CHIP_ACTIVATE_AFTER_DOTS : 0,
            }}
          />
        )}
      </motion.div>

      {isLast && <div />}
    </>
  );
}

function Dots({ filling, completed }) {
  return (
    <div className="flex h-4 w-full items-center justify-between px-1">
      {Array.from({ length: DOTS_PER_CONNECTOR }).map((_, i) => {
        const lit = completed || filling;
        const isHistorical = completed && !filling;

        return (
          <motion.span
            key={i}
            className="h-2 w-2 rounded-full"
            animate={{
              backgroundColor: lit ? "#29D9FF" : "#1C3EB0",
              scale: lit ? 1 : 0.7,
              opacity: isHistorical ? 0.55 : 1,
              boxShadow: lit
                ? isHistorical
                  ? "0 0 4px rgba(41,217,255,0.35)"
                  : "0 0 8px rgba(41,217,255,0.9)"
                : "0 0 0 rgba(41,217,255,0)",
            }}
            transition={{
              duration: filling ? DOT_DURATION : 0.6,
              ease: SOFT_EASE,
              delay: filling ? i * DOT_STAGGER : 0,
            }}
          />
        );
      })}
    </div>
  );
}

function FlowStep({ icon, label, tone = "cool" }) {
  const isCool = tone === "cool";
  return (
    <div
      className={`
        flex min-w-0 flex-1 items-center gap-2 rounded-lg border px-3 py-3
        ${
          isCool
            ? "border-[#29D9FF]/40 bg-[#29D9FF]/5"
            : "border-[#8A7CFF]/40 bg-[#8A7CFF]/5"
        }
      `}
    >
      <span className={isCool ? "text-[#29D9FF]" : "text-[#8A7CFF]"}>
        {icon}
      </span>
      <span className="truncate text-[13.5px] font-medium text-[#EAF0FF]">
        {label}
      </span>
    </div>
  );
}