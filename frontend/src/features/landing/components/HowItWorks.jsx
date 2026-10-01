import { Dna, Upload, BarChart3 } from "lucide-react";

const steps = [
  {
    icon: Dna,
    num: "01",
    title: "Cargá tu proteína objetivo",
    desc: "Ingresá la secuencia y el identificador de la proteína a la que querés unir moléculas candidatas.",
    color: "from-cyan-400 to-sky-400",
    glow: "rgba(34,211,238,0.2)",
  },
  {
    icon: Upload,
    num: "02",
    title: "Subí tus moléculas candidatas",
    desc: "Cargá compuestos en formato SMILES, de a uno o en lote (batch), listos para evaluar.",
    color: "from-sky-400 to-violet-400",
    glow: "rgba(56,189,248,0.18)",
  },
  {
    icon: BarChart3,
    num: "03",
    title: "Obtené el ranking",
    desc: "Recibí un ranking ordenado por afinidad predicha y priorizá solo los candidatos más prometedores.",
    color: "from-violet-400 to-fuchsia-400",
    glow: "rgba(167,139,250,0.2)",
  },
];

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="relative px-5 py-20 sm:px-8 lg:px-12 xl:px-16">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <p className="mb-3 text-[12.5px] font-medium uppercase tracking-widest text-cyan-300/80">
            Cómo funciona
          </p>
          <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Tres pasos para priorizar candidatos
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="group relative rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm transition-colors hover:border-white/20 hover:bg-white/[0.05]"
              >
                <div
                  className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br"
                  style={{
                    backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))`,
                    boxShadow: `0 0 28px ${step.glow}`,
                  }}
                >
                  <div className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${step.color}`}>
                    <Icon className="h-5 w-5 text-gray-950" strokeWidth={2.2} />
                  </div>
                </div>

                <p className="mb-1.5 text-[11px] font-semibold tracking-wider text-white/35">
                  {step.num}
                </p>
                <h3 className="mb-2 text-[16px] font-semibold text-white">
                  {step.title}
                </h3>
                <p className="text-[13.5px] leading-relaxed text-white/50">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}