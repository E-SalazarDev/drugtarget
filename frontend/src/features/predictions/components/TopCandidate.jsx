import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  animate,
  useMotionValue,
  useMotionTemplate,
} from "motion/react";
import { Star, ArrowRight, Atom } from "lucide-react";
import { useTheme } from "../../../providers/ThemeProvider";
import { PKd_MIN, PKd_MAX } from "../mock/rankingData";

/**
 * Borde con gradiente cian girando lento para el top 1.
 */
function RotatingCyanBorder({ children, className, duration = 6 }) {
  const turn = useMotionValue(0);

  useEffect(() => {
    const controls = animate(turn, 1, {
      ease: "linear",
      duration,
      repeat: Infinity,
    });
    return () => controls.stop();
  }, [duration, turn]);

  const gradient = useMotionTemplate`conic-gradient(from ${turn}turn, transparent 0%, rgba(34,211,230,0.05) 20%, rgba(34,211,230,0.9) 45%, rgba(34,211,230,0.3) 55%, rgba(34,211,230,0.05) 80%, transparent 100%)`;

  return (
    <div className={`relative p-px rounded-2xl ${className || ""}`}>
      <motion.div
        style={{ backgroundImage: gradient }}
        className="absolute inset-0 rounded-2xl"
      />
      <div className="relative overflow-hidden rounded-[15px]">
        {children}
      </div>
    </div>
  );
}

export default function TopCandidate({ rank, item, featured = false }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const nameColor = isDark ? "#FFFFFF" : "#0A0F24";
  const monoColor = isDark ? "#B8BFCE" : "#2E3550";
  const labelColor = isDark ? "#9CA3B4" : "#4A5170";

  const colors = {
    1: {
      accent: isDark ? "#22D3E6" : "#0A7C85",
      soft: isDark ? "rgba(34, 211, 230, 0.15)" : "rgba(10, 124, 133, 0.12)",
      border: isDark ? "rgba(34, 211, 230, 0.5)" : "rgba(10, 124, 133, 0.5)",
    },
    2: {
      accent: isDark ? "#A78BFA" : "#7C3AED",
      soft: isDark ? "rgba(167, 139, 250, 0.15)" : "rgba(124, 58, 237, 0.12)",
      border: isDark ? "rgba(167, 139, 250, 0.5)" : "rgba(124, 58, 237, 0.5)",
    },
    3: {
      accent: isDark ? "#FBBF24" : "#B45309",
      soft: isDark ? "rgba(251, 191, 36, 0.15)" : "rgba(180, 83, 9, 0.12)",
      border: isDark ? "rgba(251, 191, 36, 0.5)" : "rgba(180, 83, 9, 0.5)",
    },
  };

  const c = colors[rank] ?? colors[3];

  const cardBg = isDark ? "#14171C" : "#FFFFFF";

  const pct = Math.max(
    0,
    Math.min(100, ((item.pKd - PKd_MIN) / (PKd_MAX - PKd_MIN)) * 100)
  );

  const cardContent = (
    <div className={`relative ${featured ? "p-7" : "p-6"}`}>
      {/* Rank + ícono — REDISEÑADO: grande, con color sólido */}
      <div className="flex items-start justify-between">
        <div className="flex items-baseline gap-1">
          <span
            className="font-mono text-[11px] font-medium tracking-wider"
            style={{ color: c.accent, opacity: 0.7 }}
          >
            RANK
          </span>
          <span
            className={`font-mono font-bold tabular-nums leading-none tracking-[-0.04em] ${
              featured ? "text-[28px]" : "text-[22px]"
            }`}
            style={{ color: c.accent }}
          >
            {rank.toString().padStart(2, "0")}
          </span>
        </div>

        <Atom
          size={featured ? 16 : 14}
          strokeWidth={2.2}
          style={{ color: c.accent, opacity: 0.6 }}
        />
      </div>

      {/* pKd */}
      <div className={featured ? "mt-4" : "mt-3"}>
        <p
          className={`font-mono font-bold tabular-nums leading-none tracking-[-0.03em] ${
            featured ? "text-[52px]" : "text-[38px]"
          }`}
          style={{ color: c.accent }}
        >
          {item.pKd.toFixed(2)}
        </p>
        <p
          className="mt-2 text-[11px] font-bold uppercase tracking-[0.14em]"
          style={{ color: labelColor }}
        >
          pKd predicho
        </p>
      </div>

      {/* Barra de afinidad */}
      <div className="mt-4">
        <div
          className="relative h-1.5 w-full overflow-hidden rounded-full"
          style={{
            background: isDark
              ? "rgba(255, 255, 255, 0.06)"
              : "rgba(14, 19, 48, 0.06)",
          }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{ background: c.accent }}
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{
              duration: 1,
              delay: featured ? 0.5 : 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        </div>
      </div>

      {/* Nombre + SMILES */}
      <div className="mt-5">
        <h3
          className={`font-bold tracking-[-0.01em] ${
            featured ? "text-[20px]" : "text-[16px]"
          }`}
          style={{ color: nameColor }}
        >
          {item.molecule_name}
        </h3>
        <p
          className="mt-1.5 line-clamp-2 font-mono text-[10.5px] leading-relaxed"
          style={{ color: monoColor }}
        >
          {item.smiles}
        </p>
      </div>

      {/* Fórmula + Ver detalle */}
      <div
        className="mt-5 flex items-center justify-between border-t pt-4"
        style={{
          borderColor: isDark
            ? "rgba(255, 255, 255, 0.06)"
            : "rgba(14, 19, 48, 0.06)",
        }}
      >
        <span
          className="font-mono text-[11px]"
          style={{ color: monoColor }}
        >
          {item.formula}
        </span>
        <span
          className="flex items-center gap-1 text-[12px] font-semibold transition-transform group-hover:translate-x-0.5"
          style={{ color: c.accent }}
        >
          Ver detalle
          <ArrowRight size={12} strokeWidth={2.4} />
        </span>
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: featured ? 16 : 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: featured ? 0.15 : 0.05,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`relative ${featured ? "lg:-mt-4 lg:mb-0" : ""}`}
    >
      {/* Badge "MEJOR CANDIDATO" solo para el top 1 */}
      {featured && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="absolute -top-3 left-1/2 z-20 -translate-x-1/2"
        >
          <div
            className="flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em]"
            style={{
              background: c.accent,
              color: isDark ? "#0A0B0D" : "#FFFFFF",
              boxShadow: `0 4px 20px ${c.accent}66`,
            }}
          >
            <Star size={10} strokeWidth={2.5} fill="currentColor" />
            Mejor candidato
          </div>
        </motion.div>
      )}

      {featured ? (
        <RotatingCyanBorder duration={5}>
          <Link
            to={`/app/molecules/${item.molecule_id}`}
            className="group relative block"
            style={{ background: cardBg }}
          >
            <div
              className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full"
              style={{
                background: `radial-gradient(circle, ${c.accent}25 0%, transparent 70%)`,
                filter: "blur(24px)",
              }}
            />
            {cardContent}
          </Link>
        </RotatingCyanBorder>
      ) : (
        <Link
          to={`/app/molecules/${item.molecule_id}`}
          className="group relative block overflow-hidden rounded-2xl transition-all duration-200"
          style={{
            background: cardBg,
            border: `1px solid ${c.border}`,
            boxShadow: isDark
              ? `0 8px 32px rgba(0,0,0,0.3), 0 0 0 1px ${c.border}`
              : `0 8px 32px ${c.soft}`,
          }}
        >
          {cardContent}
        </Link>
      )}
    </motion.div>
  );
}