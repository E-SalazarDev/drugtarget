import { motion } from "motion/react";
import { Atom, Dna, BrainCircuit, TrendingUp } from "lucide-react";
import { useTheme } from "../../../providers/ThemeProvider";

/**
 * Sparkline SVG — mini gráfico de tendencia.
 * Los datos son mock por ahora — se alimentan del backend después.
 */
function Sparkline({ data, color, height = 32 }) {
  const width = 100;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  const points = data
    .map((value, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - ((value - min) / range) * height;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      className="h-8 w-full"
    >
      <motion.polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      />
    </svg>
  );
}

export default function StatsGrid({
  moleculesCount = 68,
  proteinsCount = 378,
  predictionsReady = false,
}) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const cardBg = isDark ? "#14171C" : "#FFFFFF";
  const cardBorder = isDark
    ? "rgba(255, 255, 255, 0.08)"
    : "rgba(14, 19, 48, 0.08)";

  // Datos de sparklines (mock)
  const moleculesTrend = [12, 18, 24, 30, 38, 48, 58, 68];
  const proteinsTrend = [45, 98, 156, 210, 268, 318, 355, 378];
  const predictionsTrend = [0, 0, 0, 0, 0, 0, 0, 0];

  const stats = [
    {
      label: "Moléculas registradas",
      value: moleculesCount,
      note: "Compuestos disponibles",
      icon: Atom,
      color: isDark ? "#22D3E6" : "#0A7C85",
      colorSoft: isDark
        ? "rgba(34, 211, 230, 0.10)"
        : "rgba(10, 124, 133, 0.08)",
      colorBorder: isDark
        ? "rgba(34, 211, 230, 0.20)"
        : "rgba(10, 124, 133, 0.20)",
      trend: moleculesTrend,
      delta: "+12",
      deltaLabel: "esta semana",
      href: "/app/molecules",
    },
    {
      label: "Proteínas registradas",
      value: proteinsCount,
      note: "Dianas disponibles",
      icon: Dna,
      color: isDark ? "#A78BFA" : "#7C3AED",
      colorSoft: isDark
        ? "rgba(167, 139, 250, 0.10)"
        : "rgba(124, 58, 237, 0.08)",
      colorBorder: isDark
        ? "rgba(167, 139, 250, 0.20)"
        : "rgba(124, 58, 237, 0.20)",
      trend: proteinsTrend,
      delta: "+23",
      deltaLabel: "esta semana",
      href: "/app/proteins",
    },
    {
      label: "Predicciones",
      value: predictionsReady ? "Listo" : "—",
      note: predictionsReady
        ? "Modelo disponible"
        : "Modelo en construcción",
      icon: BrainCircuit,
      color: predictionsReady
        ? isDark
          ? "#4ADE80"
          : "#0A8F4A"
        : isDark
        ? "#FBBF24"
        : "#B45309",
      colorSoft: predictionsReady
        ? isDark
          ? "rgba(74, 222, 128, 0.10)"
          : "rgba(10, 143, 74, 0.08)"
        : isDark
        ? "rgba(251, 191, 36, 0.10)"
        : "rgba(180, 83, 9, 0.08)",
      colorBorder: predictionsReady
        ? isDark
          ? "rgba(74, 222, 128, 0.20)"
          : "rgba(10, 143, 74, 0.20)"
        : isDark
        ? "rgba(251, 191, 36, 0.20)"
        : "rgba(180, 83, 9, 0.20)",
      trend: predictionsReady ? [0, 10, 25, 40, 55] : predictionsTrend,
      delta: null,
      deltaLabel: predictionsReady ? "activas" : "próximamente",
      href: "/app/predictions",
      isUpcoming: !predictionsReady,
    },
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat, i) => {
        const Icon = stat.icon;

        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              delay: 0.05 + i * 0.05,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative overflow-hidden rounded-2xl p-5"
            style={{ background: cardBg, border: `1px solid ${cardBorder}` }}
          >
            {/* Header: label + ícono */}
            <div className="flex items-start justify-between">
              <span
                className="text-[10.5px] font-bold uppercase tracking-[0.14em]"
                style={{ color: isDark ? "#9CA3B4" : "#6B7285" }}
              >
                {stat.label}
              </span>

              <div
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                style={{
                  background: stat.colorSoft,
                  border: `1px solid ${stat.colorBorder}`,
                }}
              >
                <Icon
                  size={14}
                  strokeWidth={2.2}
                  style={{ color: stat.color }}
                />
              </div>
            </div>

            {/* Valor + Sparkline */}
            <div className="mt-4 flex items-end justify-between gap-3">
              <div className="min-w-0">
                <p
                  className="font-mono text-[28px] font-bold tabular-nums leading-none tracking-[-0.02em]"
                  style={{ color: isDark ? "#FFFFFF" : "#0A0F24" }}
                >
                  {stat.value}
                </p>
                <p
                  className="mt-2 text-[11.5px]"
                  style={{ color: isDark ? "#98A0AB" : "#5A6480" }}
                >
                  {stat.note}
                </p>
              </div>

              <div className="w-24 shrink-0 opacity-70">
                <Sparkline data={stat.trend} color={stat.color} />
              </div>
            </div>

            {/* Footer: delta + label */}
            <div
              className="mt-4 flex items-center justify-between border-t pt-3"
              style={{
                borderColor: isDark
                  ? "rgba(255, 255, 255, 0.06)"
                  : "rgba(14, 19, 48, 0.06)",
              }}
            >
              {stat.isUpcoming ? (
                <span
                  className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider"
                  style={{
                    background: stat.colorSoft,
                    color: stat.color,
                    border: `1px solid ${stat.colorBorder}`,
                  }}
                >
                  Próximamente
                </span>
              ) : (
                <span
                  className="flex items-center gap-1 font-mono text-[11px] font-bold tabular-nums"
                  style={{ color: stat.color }}
                >
                  <TrendingUp size={11} strokeWidth={2.5} />
                  {stat.delta}
                </span>
              )}

              <span
                className="text-[10.5px] font-medium uppercase tracking-wider"
                style={{ color: isDark ? "#7A8494" : "#8A93A4" }}
              >
                {stat.deltaLabel}
              </span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}