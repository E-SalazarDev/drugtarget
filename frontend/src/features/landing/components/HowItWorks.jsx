// src/features/landing/components/HowItWorks.jsx
import { motion } from "motion/react";
import {
  Atom,
  BarChart3,
  Database,
  Dna,
  FlaskConical,
  ScanSearch,
} from "lucide-react";

const steps = [
  {
    title: "Define el objetivo",
    description:
      "Introduce la proteína que quieres estudiar y establece el punto de partida.",
    icon: Dna,
  },
  {
    title: "Explora moléculas",
    description:
      "Carga candidatos vía SMILES y prepara el conjunto que será evaluado.",
    icon: Atom,
  },
  {
    title: "Prioriza resultados",
    description:
      "El modelo estima afinidad y ordena los candidatos para decidir el siguiente paso.",
    icon: BarChart3,
  },
];

const SOFT_EASE = [0.22, 1, 0.36, 1];
const SPRING = { type: "spring", stiffness: 210, damping: 22 };

export default function HowItWorks() {
  return (
    <section
      id="como-funciona"
      className="relative w-full bg-[#02040C] px-5 py-20 sm:px-8 lg:px-12 xl:px-16"
    >
      <div className="mx-auto max-w-375">
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
              Convierte una búsqueda
              <br />
              <span className="text-[#29D9FF]">en una decisión.</span>
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
              Un flujo continuo conecta la información biológica con el espacio
              molecular y termina en un ranking de candidatos.
            </p>
          </motion.div>
        </div>

        {/* Panel principal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.01 }}
          transition={{ duration: 0.8, ease: SOFT_EASE }}
          className="relative mt-10 overflow-hidden rounded-2xl border border-[#101A48] bg-[#01030A]"
        >
          <div className="flex items-center justify-between border-b border-[#101A48] px-5 py-3.5">
            <span className="font-mono text-[12px] tracking-wide text-[#DCE6FF]">
              drugtarget / analysis
            </span>
          </div>

          <div className="grid md:grid-cols-[1fr_1.25fr_1.15fr]">
            {/* Col 1: Target */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.01 }}
              transition={{ duration: 0.7, delay: 0.05, ease: SOFT_EASE }}
              className="border-b border-[#101A48] p-6 md:border-b-0 md:border-r"
            >
              <div className="mb-6 flex items-center justify-between">
                <span className="text-[15px] font-semibold text-[#EAF0FF]">
                  Proteína objetivo
                </span>
                <span className="font-mono text-[12px] text-[#29D9FF]">
                  PDB 4HHB
                </span>
              </div>

              <div className="flex items-center gap-3.5 rounded-xl border border-[#101A48] bg-[#02040C] p-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#29D9FF]/10">
                  <Dna className="h-5 w-5 text-[#29D9FF]" />
                </div>

                <div className="min-w-0">
                  <p className="text-[16px] font-semibold text-[#EAF0FF]">
                    Hemoglobin
                  </p>
                  <p className="mt-0.5 font-mono text-[12px] text-[#DCE6FF]">
                    574 residues
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-3.5">
                <div className="flex items-center justify-between">
                  <span className="text-[13px] text-[#DCE6FF]">
                    biological target
                  </span>
                  <span className="font-mono text-[12px] font-medium text-[#EAF0FF]">
                    verified
                  </span>
                </div>
                <div className="h-px bg-[#101A48]" />
                <div className="flex items-center justify-between">
                  <span className="text-[13px] text-[#DCE6FF]">structure</span>
                  <span className="font-mono text-[12px] font-medium text-[#EAF0FF]">
                    resolved
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Col 2: Candidates */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.01 }}
              transition={{ duration: 0.7, delay: 0.15, ease: SOFT_EASE }}
              className="border-b border-[#101A48] p-6 md:border-b-0 md:border-r"
            >
              <div className="mb-6 flex items-center justify-between">
                <span className="text-[15px] font-semibold text-[#EAF0FF]">
                  Candidatos moleculares
                </span>
                <span className="font-mono text-[12px] text-[#DCE6FF]">
                  2,481 compounds
                </span>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {["CCO", "CCN", "C1=CC", "COC", "NCC", "CCOC", "CNC", "CCCl"].map(
                  (smiles, i) => (
                    <motion.div
                      key={`${smiles}-${i}`}
                      initial={{ opacity: 0, scale: 0.7, y: 12 }}
                      whileInView={{ opacity: 1, scale: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.01 }}
                      transition={{
                        ...SPRING,
                        delay: 0.25 + i * 0.06,
                      }}
                      className="
                        rounded-md border border-[#101A48]
                        bg-[#02040C]
                        py-3 text-center font-mono text-[12px] font-medium
                        text-[#EAF0FF]
                        transition-colors duration-300
                        hover:border-[#29D9FF]/50
                        hover:text-[#29D9FF]
                      "
                    >
                      {smiles}
                    </motion.div>
                  )
                )}
              </div>

              <div className="mt-6 space-y-3.5">
                <div className="flex items-center justify-between">
                  <span className="text-[13px] text-[#DCE6FF]">
                    loaded via SMILES
                  </span>
                  <span className="font-mono text-[12px] font-medium text-[#EAF0FF]">
                    ok
                  </span>
                </div>
                <div className="h-px bg-[#101A48]" />
                <div className="flex items-center justify-between">
                  <span className="text-[13px] text-[#DCE6FF]">
                    preparation
                  </span>
                  <span className="font-mono text-[12px] font-medium text-[#EAF0FF]">
                    complete
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Col 3: Affinity */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.01 }}
              transition={{ duration: 0.7, delay: 0.25, ease: SOFT_EASE }}
              className="p-6"
            >
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ScanSearch className="h-4 w-4 text-[#29D9FF]" />
                  <span className="text-[15px] font-semibold text-[#EAF0FF]">
                    Afinidad predicha
                  </span>
                </div>
              </div>

              <div className="space-y-5">
                <ResultRow
                  name="Molecule_018"
                  score="0.94"
                  rank="01"
                  best
                  accent="#29D9FF"
                  delay={0.4}
                />
                <ResultRow
                  name="Molecule_427"
                  score="0.89"
                  rank="02"
                  accent="#7DD87D"
                  delay={0.55}
                />
                <ResultRow
                  name="Molecule_093"
                  score="0.82"
                  rank="03"
                  accent="#FFB347"
                  delay={0.7}
                />
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-[#101A48] pt-4">
                <div className="flex items-center gap-2">
                  <Database className="h-3.5 w-3.5 text-[#DCE6FF]/70" />
                  <span className="font-mono text-[11px] tracking-wide text-[#DCE6FF]">
                    model inference
                  </span>
                </div>
                <FlaskConical className="h-4 w-4 text-[#DCE6FF]/50" />
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Pasos rediseñados */}
        <div className="relative mt-10">
          {/* Riel segmentado entre pasos (solo desktop) */}
          <div className="pointer-events-none absolute inset-x-0 top-6 hidden grid-cols-3 gap-4 lg:grid">
            <div className="relative col-start-1 col-end-3">
              <SegmentedRail delay={0} />
            </div>
            <div className="relative col-start-2 col-end-4">
              <SegmentedRail delay={1.2} />
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = index === 0;

              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ ...SPRING, delay: 0.2 + index * 0.15 }}
                  whileHover={{ y: -4 }}
                  className="group relative"
                >
                  <div className="relative mb-4 flex justify-center lg:justify-start lg:pl-0">
                    <motion.div
                      className={`
                        relative z-10 flex h-12 w-12 items-center justify-center rounded-xl border bg-[#02040C]
                        ${
                          isActive
                            ? "border-[#29D9FF]"
                            : "border-[#101A48] transition-colors group-hover:border-[#29D9FF]/40"
                        }
                      `}
                      animate={
                        isActive
                          ? {
                              boxShadow: [
                                "0 0 0 0 rgba(41,217,255,0)",
                                "0 0 0 8px rgba(41,217,255,0.15)",
                                "0 0 0 0 rgba(41,217,255,0)",
                              ],
                            }
                          : {}
                      }
                      transition={
                        isActive
                          ? {
                              duration: 2.4,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }
                          : {}
                      }
                    >
                      <Icon
                        className={`h-5 w-5 ${
                          isActive
                            ? "text-[#29D9FF]"
                            : "text-[#DCE6FF] transition-colors group-hover:text-[#29D9FF]"
                        }`}
                      />
                    </motion.div>
                  </div>

                  <div
                    className={`
                      relative overflow-hidden rounded-xl border bg-linear-to-b from-[#01030A] to-[#02040C] p-5 transition-colors
                      ${
                        isActive
                          ? "border-[#29D9FF]/40"
                          : "border-[#101A48] group-hover:border-[#29D9FF]/40"
                      }
                    `}
                  >
                    <div
                      className={`
                        absolute inset-x-0 top-0 h-0.5 transition-opacity
                        ${
                          isActive
                            ? "bg-linear-to-r from-transparent via-[#29D9FF] to-transparent opacity-100"
                            : "bg-linear-to-r from-transparent via-[#2F6BFF]/50 to-transparent opacity-0 group-hover:opacity-100"
                        }
                      `}
                    />

                    <h3 className="text-[16px] font-semibold text-[#EAF0FF]">
                      {step.title}
                    </h3>

                    <p className="mt-2.5 text-[13.5px] leading-6 text-[#DCE6FF]">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function SegmentedRail({ delay = 0 }) {
  const segments = 14;

  return (
    <div className="absolute left-6 right-6 top-1/2 flex h-3 -translate-y-1/2 items-center justify-between">
      {Array.from({ length: segments }).map((_, i) => (
        <motion.span
          key={i}
          className="h-0.75 w-2 rounded-sm"
          animate={{
            backgroundColor: [
              "#2F6BFF40",
              "#2F6BFF40",
              "#29D9FF",
              "#2F6BFF40",
              "#2F6BFF40",
            ],
          }}
          transition={{
            duration: 2.8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: delay + i * 0.08,
          }}
        />
      ))}
    </div>
  );
}

function ResultRow({ name, score, rank, best = false, delay = 0, accent }) {
  const targetWidth = Number(score) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.01 }}
      transition={{ duration: 0.55, delay, ease: SOFT_EASE }}
      className="flex items-center gap-3"
    >
      <span className="w-6 shrink-0 font-mono text-[12px] text-[#DCE6FF]">
        {rank}
      </span>

      <span
        className={`w-28 truncate font-mono text-[13px] ${
          best ? "font-semibold text-[#EAF0FF]" : "text-[#DCE6FF]"
        }`}
      >
        {name}
      </span>

      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#0E1330]">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: accent }}
          initial={{ width: 0 }}
          whileInView={{ width: `${targetWidth}%` }}
          viewport={{ once: true, amount: 0.01 }}
          transition={{ duration: 1.1, delay: delay + 0.2, ease: SOFT_EASE }}
        />
      </div>

      <span className="w-10 text-right font-mono text-[13px] font-semibold text-[#EAF0FF]">
        {score}
      </span>
    </motion.div>
  );
}