import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight, FlaskConical, Plus } from "lucide-react";

export default function HeroCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden rounded-2xl"
      style={{
        background: "var(--hero-bg)",
        border: "1px solid var(--card-border)",
        boxShadow: "var(--shadow-md)",
      }}
    >
      <div className="p-8 sm:p-10">
        {/* Badge */}
        <span
          className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-[0.14em]"
          style={{
            background: "var(--chip-lilac-bg)",
            color: "var(--chip-text)",
            border: "1px solid transparent",
          }}
        >
          <FlaskConical size={10} strokeWidth={2.4} />
          Descubrimiento de fármacos con IA
        </span>

        {/* Título */}
        <h1
          className="mt-5 max-w-3xl text-[30px] font-bold leading-[1.1] tracking-[-0.03em] sm:text-[38px]"
          style={{ color: "var(--text-primary)" }}
        >
          Prioriza candidatos antes de sintetizarlos.
        </h1>

        {/* Subtítulo */}
        <p
          className="mt-4 max-w-2xl text-[14px] leading-relaxed"
          style={{ color: "var(--text-secondary)" }}
        >
          DrugTarget combina información molecular y biológica para estudiar la
          afinidad de unión entre compuestos y proteínas objetivo.
        </p>

        {/* CTAs */}
        <div className="mt-6 flex flex-wrap items-center gap-2.5">
          <Link
            to="/app/predictions"
            className="group inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-[13px] font-semibold transition-all hover:opacity-95"
            style={{
              background: "var(--accent)",
              color: "var(--text-on-accent)",
            }}
          >
            Explorar predicciones
            <ArrowRight
              size={14}
              strokeWidth={2.4}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </Link>

          <Link
            to="/app/molecules/new"
            className="inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-[13px] font-semibold transition-colors"
            style={{
              background: "transparent",
              color: "var(--text-primary)",
              border: "1px solid var(--border-medium)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--hover-overlay)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
            }}
          >
            <Plus size={14} strokeWidth={2.4} />
            Registrar molécula
          </Link>
        </div>
      </div>

      {/* Barra inferior con métricas integradas */}
      <div
        className="grid grid-cols-3"
        style={{
          borderTop: "1px solid var(--card-border)",
          background: "var(--surface-2)",
        }}
      >
        {[
          {
            label: "Dataset",
            value: "68 × 378",
            note: "moléculas · dianas",
            dot: "var(--chip-lilac-bg)",
            valueColor: "var(--text-primary)",
          },
          {
            label: "Modelo",
            value: "CI 0.85",
            note: "concordance index",
            dot: "var(--chip-lime-bg)",
            valueColor: "var(--chip-lime-bg)",
          },
          {
            label: "Pares con afinidad",
            value: "30.000",
            note: "dataset Davis",
            dot: "var(--chip-pink-bg)",
            valueColor: "var(--text-primary)",
          },
        ].map((m, i) => (
          <div
            key={m.label}
            className="px-6 py-5"
            style={{
              borderLeft: i === 0 ? "none" : "1px solid var(--row-border)",
            }}
          >
            <p
              className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em]"
              style={{ color: "var(--text-secondary)" }}
            >
              <span
                className="inline-block h-1.5 w-1.5 rounded-full"
                style={{ background: m.dot }}
              />
              {m.label}
            </p>
            <p
              className="mt-2.5 font-mono text-[22px] font-bold tabular-nums leading-none tracking-[-0.02em]"
              style={{ color: m.valueColor }}
            >
              {m.value}
            </p>
            <p
              className="mt-2 text-[12px]"
              style={{ color: "var(--text-secondary)" }}
            >
              {m.note}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}