// src/features/landing/components/HeroContent.jsx
import { motion } from "motion/react";
import { FlaskConical, Zap, Cpu, ArrowRight } from "lucide-react";

const SOFT_EASE = [0.22, 1, 0.36, 1];

export default function HeroContent() {
  return (
    <div className="relative flex max-w-2xl flex-col gap-10">
      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, ease: SOFT_EASE }}
        className="inline-flex w-fit items-center gap-2.5 rounded-full border border-[#29D9FF]/30 bg-[#01030A]/60 px-4 py-2 backdrop-blur-md"
      >
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#29D9FF]/60" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#29D9FF]" />
        </span>
        <span className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-[#29D9FF]">
          Descubrimiento de fármacos con IA
        </span>
      </motion.div>

      {/* Titular */}
      <div className="space-y-5">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.1, ease: SOFT_EASE }}
          className="flex items-center gap-3"
        >
          <span className="h-px w-12 bg-[#2F6BFF]/50" />
          <span className="font-mono text-[11px] font-medium uppercase tracking-[0.28em] text-[#DCE6FF]/70">
            Drug discovery platform
          </span>
        </motion.div>

        <h1 className="font-display">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, delay: 0.2, ease: SOFT_EASE }}
            className="block text-[2.6rem] font-semibold leading-[1.05] tracking-[-0.03em] text-[#EAF0FF] sm:text-[3rem] lg:text-[3.4rem] xl:text-[3.8rem]"
          >
            Prioriza candidatos
          </motion.span>

          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, delay: 0.3, ease: SOFT_EASE }}
            className="mt-2 block text-[2.6rem] font-light leading-[1.1] tracking-[-0.02em] text-[#DCE6FF] sm:text-[3rem] lg:text-[3.4rem] xl:text-[3.8rem]"
          >
            a fármaco{" "}
            <span className="font-medium text-[#29D9FF]">con precisión</span>
          </motion.span>
        </h1>
      </div>

      {/* Descripción */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, delay: 0.4, ease: SOFT_EASE }}
        className="max-w-lg text-[17px] leading-relaxed text-[#DCE6FF]"
      >
        Predicción de afinidad molécula-proteína con Machine Learning, para
        reducir tiempo y costo en el descubrimiento de fármacos.
      </motion.p>

      {/* Acciones */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, delay: 0.5, ease: SOFT_EASE }}
        className="flex flex-wrap items-center gap-3"
      >
        {/* CTA principal */}
        <motion.a
          href="/app"
          whileHover={{ y: -2, scale: 1.015 }}
          whileTap={{ scale: 0.985 }}
          transition={{ duration: 0.25, ease: SOFT_EASE }}
          className="
            group relative inline-flex h-14 items-center gap-3
            rounded-[17px] bg-[#EAF0FF] px-6 text-[#0E1330]
            transition-colors duration-300 hover:bg-white
          "
        >
          <span className="relative z-10 whitespace-nowrap text-[14px] font-semibold tracking-[-0.01em]">
            Explorar plataforma
          </span>

          <span className="h-5 w-px bg-[#0E1330]/20" />

          <motion.span
            whileHover={{ x: 3 }}
            transition={{ type: "spring", stiffness: 420, damping: 24 }}
            className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0E1330] text-[#EAF0FF]"
          >
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.4} />
          </motion.span>
        </motion.a>

        {/* CTA secundario */}
        <motion.a
          href="#como-funciona"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.25, ease: SOFT_EASE }}
          className="
            inline-flex h-14 items-center gap-2 rounded-[18px]
            border border-[#101A48] bg-[#01030A]/40 px-6
            text-[14px] font-medium text-[#DCE6FF]
            transition-colors duration-300
            hover:border-[#29D9FF]/50
            hover:bg-[#29D9FF]/5
            hover:text-white
          "
        >
          Cómo funciona
          <ArrowRight
            className="h-3.5 w-3.5 text-[#DCE6FF]/50"
            strokeWidth={2}
          />
        </motion.a>
      </motion.div>

      {/* Features */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, delay: 0.7, ease: SOFT_EASE }}
        className="flex flex-wrap gap-3 pt-2"
      >
        <FeatureChip
          icon={<FlaskConical className="h-4 w-4" strokeWidth={2} />}
          label="Menos ensayos"
          delay={0.1}
        />
        <FeatureChip
          icon={<Zap className="h-4 w-4" strokeWidth={2} />}
          label="Ranking ágil"
          delay={0.2}
        />
        <FeatureChip
          icon={<Cpu className="h-4 w-4" strokeWidth={2} />}
          label="Featurización RDKit"
          delay={0.3}
        />
      </motion.div>
    </div>
  );
}

function FeatureChip({ icon, label, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6, delay: 0.7 + delay, ease: SOFT_EASE }}
      whileHover={{ y: -2 }}
      className="
        group inline-flex items-center gap-2.5 rounded-full
        border border-[#101A48] bg-[#01030A]/60 px-4 py-2
        backdrop-blur-sm transition-colors duration-300
        hover:border-[#29D9FF]/40
        hover:bg-[#29D9FF]/5
      "
    >
      <span className="text-[#29D9FF]">{icon}</span>
      <span className="text-[13px] font-medium text-[#DCE6FF] transition-colors duration-300 group-hover:text-white">
        {label}
      </span>
    </motion.div>
  );
}