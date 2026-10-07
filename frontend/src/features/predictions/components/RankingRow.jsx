import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useTheme } from "../../../providers/ThemeProvider";
import { PKd_MIN, PKd_MAX } from "../mock/rankingData";

export default function RankingRow({ rank, item, topPKd, index = 0 }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const nameColor = isDark ? "#FFFFFF" : "#0A0F24";
  const monoColor = isDark ? "#B8BFCE" : "#2E3550";
  const labelColor = isDark ? "#9CA3B4" : "#4A5170";

  const rowBg = isDark ? "#14171C" : "#FFFFFF";
  const rowHoverBg = isDark ? "#1A1E24" : "#FAFBFC";
  const rowBorder = isDark
    ? "rgba(255, 255, 255, 0.06)"
    : "rgba(14, 19, 48, 0.06)";
  const rowHoverBorder = isDark
    ? "rgba(34, 211, 230, 0.25)"
    : "rgba(10, 124, 133, 0.25)";

  const accentCyan = isDark ? "#22D3E6" : "#0A7C85";

  const pct = Math.max(
    0,
    Math.min(100, ((item.pKd - PKd_MIN) / (PKd_MAX - PKd_MIN)) * 100)
  );

  const delta = topPKd ? (topPKd - item.pKd).toFixed(2) : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        delay: Math.min(index * 0.02, 0.3),
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <Link
        to={`/app/molecules/${item.molecule_id}`}
        className="group relative grid grid-cols-[44px_1fr_auto] items-center gap-4 rounded-xl px-4 py-3.5 transition-all duration-200 sm:grid-cols-[44px_1fr_120px_100px_auto]"
        style={{
          background: rowBg,
          border: `1px solid ${rowBorder}`,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = rowHoverBg;
          e.currentTarget.style.borderColor = rowHoverBorder;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = rowBg;
          e.currentTarget.style.borderColor = rowBorder;
        }}
      >
        {/* Rank */}
        <span
          className="font-mono text-[14px] font-bold tabular-nums leading-none"
          style={{ color: labelColor }}
        >
          {rank.toString().padStart(2, "0")}
        </span>

        {/* Nombre + SMILES */}
        <div className="min-w-0 flex-1">
          <p
            className="truncate text-[14px] font-semibold"
            style={{ color: nameColor }}
          >
            {item.molecule_name}
          </p>
          <p
            className="mt-0.5 truncate font-mono text-[10.5px]"
            style={{ color: monoColor }}
          >
            {item.smiles}
          </p>
        </div>

        {/* Barra */}
        <div className="hidden sm:block">
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
              style={{ background: accentCyan, opacity: 0.55 }}
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{
                duration: 0.7,
                delay: Math.min(index * 0.02 + 0.05, 0.4),
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          </div>
        </div>

        {/* pKd */}
        <div className="hidden flex-col items-end gap-0.5 sm:flex">
          <span
            className="font-mono text-[15px] font-bold tabular-nums leading-none"
            style={{ color: nameColor }}
          >
            {item.pKd.toFixed(2)}
          </span>
          <span
            className="font-mono text-[9.5px] font-medium uppercase tracking-wider"
            style={{ color: labelColor }}
          >
            pKd
          </span>
        </div>

        {/* Delta + flecha */}
        <div className="flex items-center gap-2.5">
          {delta && (
            <span
              className="hidden font-mono text-[10.5px] font-medium tabular-nums lg:block"
              style={{ color: labelColor }}
            >
              −{delta}
            </span>
          )}
          <ArrowUpRight
            size={14}
            strokeWidth={2.2}
            className="opacity-0 transition-opacity group-hover:opacity-100"
            style={{ color: accentCyan }}
          />
        </div>
      </Link>
    </motion.div>
  );
}