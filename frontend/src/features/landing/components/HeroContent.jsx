import { ArrowRight, FlaskConical, Zap, Cpu } from "lucide-react";

export default function HeroContent() {
  return (
    <div className="relative flex max-w-2xl flex-col gap-8">
      {/* Badge */}
      <div className="inline-flex w-fit items-center gap-2.5 rounded-full border border-white/20 bg-black/40 px-3.5 py-1.5 backdrop-blur-md">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70 opacity-60" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
        </span>
        <span className="text-[12px] font-medium tracking-wide text-white/90">
          Descubrimiento de fármacos con IA
        </span>
      </div>

      {/* Headline */}
      <div className="space-y-3">
        {/* Kicker — línea visible */}
        <div className="flex items-center gap-3">
          <span className="h-px w-10 bg-white/40" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/70">
            Drug discovery platform
          </span>
        </div>

        <h1 className="space-y-1">
          <span className="block text-[2.4rem] font-bold leading-[0.98] tracking-[-0.035em] text-white sm:text-[2.9rem] lg:text-[3.2rem] xl:text-[3.5rem]">
            Prioriza candidatos
          </span>
          <span className="block text-[2.4rem] font-normal leading-[1.02] tracking-[-0.025em] text-white/90 sm:text-[2.9rem] lg:text-[3.2rem] xl:text-[3.5rem]">
            a fármaco{" "}
            <span className="font-semibold text-white">con precisión</span>
          </span>
        </h1>
      </div>

      {/* Párrafo — más contraste */}
      <p className="max-w-lg text-[16px] font-normal leading-relaxed text-white/85 sm:text-[16.5px]">
        Predicción de afinidad molécula-proteína con Machine Learning, para
        reducir tiempo y costo en el descubrimiento de fármacos.
      </p>

      {/* CTAs */}
      <div className="flex flex-wrap items-center gap-3">
        <a
          href="app"
          className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 px-5 py-2.5 text-[14px] font-semibold text-gray-950 shadow-[0_0_28px_rgba(16,185,129,0.4)] transition-all hover:shadow-[0_0_44px_rgba(16,185,129,0.6)]"
        >
          Explorar plataforma
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </a>

        <a
          href="#como-funciona"
          className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/[0.08] px-5 py-2.5 text-[14px] font-medium text-white backdrop-blur-md transition-colors hover:border-white/40 hover:bg-white/[0.14]"
        >
          Cómo funciona
        </a>
      </div>

      {/* Trust — separador visible, iconos con más peso */}
      <div className="mt-3 flex flex-wrap gap-x-7 gap-y-4 border-t border-white/20 pt-7">
        <Feature
          icon={<FlaskConical className="h-4 w-4" strokeWidth={2} />}
          label="Menos ensayos de laboratorio"
        />
        <Feature
          icon={<Zap className="h-4 w-4" strokeWidth={2} />}
          label="Ranking en minutos"
        />
        <Feature
          icon={<Cpu className="h-4 w-4" strokeWidth={2} />}
          label="Featurización con RDKit"
        />
      </div>
    </div>
  );
}

function Feature({ icon, label }) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-white/20 bg-white/[0.06] text-white/90">
        {icon}
      </div>
      <span className="text-[13.5px] font-medium text-white/90">{label}</span>
    </div>
  );
}