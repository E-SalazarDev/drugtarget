import { motion } from "motion/react";
import { Atom, Dna, BrainCircuit, TrendingUp } from "lucide-react";

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
      color: "var(--accent-cyan)",
      colorSoft: "var(--chip-lilac-bg)",
      colorBorder: "transparent",
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
      color: "var(--accent-violet)",
      colorSoft: "var(--chip-pink-bg)",
      colorBorder: "transparent",
      trend: proteinsTrend,
      delta: "+23",
      deltaLabel: "esta semana",
      href: "/app/proteins",
    },
    {
      label: "Predicciones",
      value: predictionsReady ? "Listo" : "—",
      note: predictionsReady ? "Modelo disponible" : "Modelo en construcción",
      icon: BrainCircuit,
      color: predictionsReady ? "var(--accent-success)" : "var(--accent-warning)",
      colorSoft: predictionsReady
        ? "var(--chip-lime-bg)"
        : "var(--chip-amber-bg)",
      colorBorder: "transparent",
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
            style={{
              background: "var(--card-bg)",
              border: "1px solid var(--card-border)",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            {/* Header: label + ícono */}
            <div className="flex items-start justify-between">
              <span
                className="text-[10.5px] font-bold uppercase tracking-[0.14em]"
                style={{ color: "var(--text-secondary)" }}
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
                  style={{ color: "var(--chip-text)" }}
                />
              </div>
            </div>

            {/* Valor + Sparkline */}
            <div className="mt-4 flex items-end justify-between gap-3">
              <div className="min-w-0">
                <p
                  className="font-mono text-[28px] font-bold tabular-nums leading-none tracking-[-0.02em]"
                  style={{ color: "var(--text-primary)" }}
                >
                  {stat.value}
                </p>
                <p
                  className="mt-2 text-[11.5px]"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {stat.note}
                </p>
              </div>

              <div className="w-24 shrink-0 opacity-80">
                <Sparkline data={stat.trend} color={stat.color} />
              </div>
            </div>

            {/* Footer: delta + label */}
            <div
              className="mt-4 flex items-center justify-between border-t pt-3"
              style={{ borderColor: "var(--row-border)" }}
            >
              {stat.isUpcoming ? (
                <span
                  className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider"
                  style={{
                    background: stat.colorSoft,
                    color: "var(--chip-text)",
                    border: "1px solid transparent",
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
                style={{ color: "var(--text-tertiary)" }}
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