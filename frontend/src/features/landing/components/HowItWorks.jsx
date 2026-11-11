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
      className="relative w-full px-5 py-24 sm:px-8 lg:px-12 xl:px-16"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/15 to-transparent" />

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
            <h2 className="text-[2.25rem] font-bold leading-[1.05] tracking-[-0.04em] text-[#F6F6FB] sm:text-[2.75rem] lg:text-[3.25rem]">
              Convierte una búsqueda
              <br />
              <span className="bg-linear-to-r from-[#CABEFF] to-[#FF9CC4] bg-clip-text text-transparent">
                en una decisión.
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.01 }}
            transition={{ duration: 0.7, delay: 0.1, ease: SOFT_EASE }}
            className="max-w-md border-l-2 border-[#CABEFF]/50 pl-5 lg:mt-2"
          >
            <p className="text-[15px] font-medium leading-7 text-[#E6E4F2]">
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
          className="relative mt-10 overflow-hidden rounded-2xl border border-white/10 bg-[#0E0E15]"
        >
          <div className="flex items-center gap-3 border-b border-white/10 px-5 py-3.5">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#FFA0C4]" />
              <span className="h-2 w-2 rounded-full bg-[#FFC066]" />
              <span className="h-2 w-2 rounded-full bg-[#C4F54D]" />
            </span>
            <span className="font-mono text-[12px] tracking-wide text-[#C4C3D8]">
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
              className="border-b border-white/10 p-6 md:border-b-0 md:border-r"
            >
              <div className="mb-6 flex items-center justify-between">
                <span className="text-[15px] font-semibold text-[#F6F6FB]">
                  Proteína objetivo
                </span>
                <span className="font-mono text-[12px] font-semibold text-[#FFA0C4]">
                  PDB 4HHB
                </span>
              </div>

              <div className="flex items-center gap-3.5 rounded-xl border border-white/10 bg-[#0A0A10] p-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-[#FF7FB0] to-[#E8458A]">
                  <Dna className="h-5 w-5 text-white" />
                </div>

                <div className="min-w-0">
                  <p className="text-[16px] font-semibold text-[#F6F6FB]">
                    Hemoglobin
                  </p>
                  <p className="mt-0.5 font-mono text-[12px] text-[#C4C3D8]">
                    574 residues
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-3.5">
                <div className="flex items-center justify-between">
                  <span className="text-[13px] text-[#C4C3D8]">
                    biological target
                  </span>
                  <span className="font-mono text-[12px] font-semibold text-[#F6F6FB]">
                    verified
                  </span>
                </div>
                <div className="h-px bg-white/10" />
                <div className="flex items-center justify-between">
                  <span className="text-[13px] text-[#C4C3D8]">structure</span>
                  <span className="font-mono text-[12px] font-semibold text-[#F6F6FB]">
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
              className="border-b border-white/10 p-6 md:border-b-0 md:border-r"
            >
              <div className="mb-6 flex items-center justify-between">
                <span className="text-[15px] font-semibold text-[#F6F6FB]">
                  Candidatos moleculares
                </span>
                <span className="font-mono text-[12px] font-semibold text-[#CABEFF]">
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
                        rounded-md border border-white/10
                        bg-[#0A0A10]
                        py-3 text-center font-mono text-[12px] font-semibold
                        text-[#F6F6FB]
                        transition-colors duration-300
                        hover:border-[#CABEFF]/60
                        hover:bg-[#CABEFF]/10
                      "
                    >
                      {smiles}
                    </motion.div>
                  )
                )}
              </div>

              <div className="mt-6 space-y-3.5">
                <div className="flex items-center justify-between">
                  <span className="text-[13px] text-[#C4C3D8]">
                    loaded via SMILES
                  </span>
                  <span className="font-mono text-[12px] font-semibold text-[#F6F6FB]">
                    ok
                  </span>
                </div>
                <div className="h-px bg-white/10" />
                <div className="flex items-center justify-between">
                  <span className="text-[13px] text-[#C4C3D8]">
                    preparation
                  </span>
                  <span className="font-mono text-[12px] font-semibold text-[#F6F6FB]">
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
                  <ScanSearch className="h-4 w-4 text-[#CABEFF]" />
                  <span className="text-[15px] font-semibold text-[#F6F6FB]">
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
                  accent="#C4F54D"
                  delay={0.4}
                />
                <ResultRow
                  name="Molecule_427"
                  score="0.89"
                  rank="02"
                  accent="#CABEFF"
                  delay={0.55}
                />
                <ResultRow
                  name="Molecule_093"
                  score="0.82"
                  rank="03"
                  accent="#FFC066"
                  delay={0.7}
                />
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                <div className="flex items-center gap-2">
                  <Database className="h-3.5 w-3.5 text-[#C4C3D8]" />
                  <span className="font-mono text-[11px] tracking-wide text-[#C4C3D8]">
                    model inference
                  </span>
                </div>
                <FlaskConical className="h-4 w-4 text-[#C4C3D8]" />
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Pasos */}
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
                        relative z-10 flex h-12 w-12 items-center justify-center rounded-xl
                        ${
                          isActive
                            ? "bg-linear-to-br from-[#A48BFF] to-[#6D4AF2]"
                            : "border border-white/15 bg-[#14141C] transition-colors group-hover:border-[#CABEFF]/60"
                        }
                      `}
                      animate={
                        isActive
                          ? {
                              boxShadow: [
                                "0 0 0 0 rgba(164,139,255,0)",
                                "0 0 0 8px rgba(164,139,255,0.16)",
                                "0 0 0 0 rgba(164,139,255,0)",
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
                            ? "text-white"
                            : "text-[#E6E4F2] transition-colors group-hover:text-[#CABEFF]"
                        }`}
                      />
                    </motion.div>
                  </div>

                  <div
                    className={`
                      relative overflow-hidden rounded-xl border bg-linear-to-b from-[#12121A] to-[#0C0C12] p-5 transition-colors
                      ${
                        isActive
                          ? "border-[#CABEFF]/45"
                          : "border-white/10 group-hover:border-[#CABEFF]/45"
                      }
                    `}
                  >
                    <div
                      className={`
                        absolute inset-x-0 top-0 h-0.5 transition-opacity
                        ${
                          isActive
                            ? "bg-linear-to-r from-transparent via-[#CABEFF] to-transparent opacity-100"
                            : "bg-linear-to-r from-transparent via-[#CABEFF]/60 to-transparent opacity-0 group-hover:opacity-100"
                        }
                      `}
                    />

                    <h3 className="text-[16px] font-semibold text-[#F6F6FB]">
                      {step.title}
                    </h3>

                    <p className="mt-2.5 text-[13.5px] leading-6 text-[#D0CFE0]">
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
              "#8E74FF40",
              "#8E74FF40",
              "#CABEFF",
              "#8E74FF40",
              "#8E74FF40",
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
      <span className="w-6 shrink-0 font-mono text-[12px] font-semibold text-[#C4C3D8]">
        {rank}
      </span>

      <span
        className={`w-28 truncate font-mono text-[13px] ${
          best ? "font-semibold text-[#F6F6FB]" : "text-[#D0CFE0]"
        }`}
      >
        {name}
      </span>

      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: accent }}
          initial={{ width: 0 }}
          whileInView={{ width: `${targetWidth}%` }}
          viewport={{ once: true, amount: 0.01 }}
          transition={{ duration: 1.1, delay: delay + 0.2, ease: SOFT_EASE }}
        />
      </div>

      <span className="w-10 text-right font-mono text-[13px] font-semibold text-[#F6F6FB]">
        {score}
      </span>
    </motion.div>
  );
}