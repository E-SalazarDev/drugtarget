import Card from "./Card";

export default function StatCard({
  label,
  value,
  note,
  icon: Icon,
  accent = "cyan",
  upcoming = false,
}) {
  const accentColors = {
    cyan: "var(--accent-cyan)",
    cobalt: "var(--accent)",
    success: "var(--accent-success)",
    warning: "var(--accent-warning)",
    danger: "var(--accent-danger)",
    violet: "var(--accent-violet)",
  };

  const accentSofts = {
    cyan: "var(--accent-cyan-soft)",
    cobalt: "var(--accent-soft)",
    success: "var(--accent-success-soft)",
    warning: "var(--accent-warning-soft)",
    danger: "var(--accent-danger-soft)",
    violet: "var(--accent-violet-soft)",
  };

  const color = accentColors[accent] ?? accentColors.cyan;
  const soft = accentSofts[accent] ?? accentSofts.cyan;

  return (
    <Card className="p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <p
            className="text-[10.5px] font-semibold uppercase tracking-[0.14em]"
            style={{ color: "var(--text-tertiary)" }}
          >
            {label}
          </p>

          <p
            className="mt-4 text-[30px] font-semibold leading-none tracking-[-0.03em] tabular-nums"
            style={{ color: "var(--text-primary)" }}
          >
            {value}
          </p>

          {note && !upcoming && (
            <p
              className="mt-3 text-[12.5px]"
              style={{ color: "var(--text-secondary)" }}
            >
              {note}
            </p>
          )}

          {upcoming && (
            <span
              className="mt-3 inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
              style={{
                background: "transparent",
                color: "var(--accent-warning)",
                border: "1px solid var(--accent-warning)",
                borderColor: "rgba(251, 191, 36, 0.35)",
              }}
            >
              Próximamente
            </span>
          )}
        </div>

        {Icon && (
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
            style={{
              background: soft,
              border: `1px solid ${color}33`,
            }}
          >
            <Icon size={17} strokeWidth={2} style={{ color }} />
          </div>
        )}
      </div>
    </Card>
  );
}