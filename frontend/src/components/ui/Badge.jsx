/**
 * Badge
 * -----
 * Variantes:
 *  - default  → texto secundario, borde sutil
 *  - accent   → cobalto (acción, info)
 *  - cyan     → mejor candidato, datos destacados
 *  - violet   → estados especiales (próximamente, beta)
 *  - success  → confirmado, verificado
 */

const VARIANTS = {
  default: {
    background: "transparent",
    color: "var(--text-secondary)",
    border: "1px solid var(--border-subtle)",
  },
  accent: {
    background: "var(--accent-soft)",
    color: "var(--accent)",
    border: "1px solid transparent",
  },
  cyan: {
    background: "var(--accent-cyan-soft)",
    color: "var(--accent-cyan)",
    border: "1px solid transparent",
  },
  violet: {
    background: "var(--accent-violet-soft)",
    color: "var(--accent-violet)",
    border: "1px solid transparent",
  },
  success: {
    background: "var(--accent-cyan-soft)",
    color: "var(--state-success)",
    border: "1px solid transparent",
  },
};

export default function Badge({
  variant = "default",
  className = "",
  children,
  ...rest
}) {
  const v = VARIANTS[variant] ?? VARIANTS.default;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11.5px] font-medium tracking-wide ${className}`}
      style={{
        background: v.background,
        color: v.color,
        border: v.border,
      }}
      {...rest}
    >
      {children}
    </span>
  );
}