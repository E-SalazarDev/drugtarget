/**
 * Button
 * ------
 * Variantes:
 *  - primary    → acción principal (cobalto sólido)
 *  - secondary  → acción secundaria (borde, transparente)
 *  - ghost      → acción terciaria (sin borde, solo hover)
 *  - inverse    → botón dentro de card destacada (blanco / oscuro según tema)
 */

const VARIANTS = {
  primary: {
    background: "var(--accent)",
    color: "var(--text-on-accent)",
    border: "1px solid var(--accent)",
  },
  secondary: {
    background: "transparent",
    color: "var(--text-primary)",
    border: "1px solid var(--border-subtle)",
  },
  ghost: {
    background: "transparent",
    color: "var(--text-secondary)",
    border: "1px solid transparent",
  },
  inverse: {
    background: "var(--surface-inverse)",
    color: "var(--text-inverse)",
    border: "1px solid var(--surface-inverse)",
  },
};

const SIZES = {
  sm: { padding: "6px 12px", fontSize: "13px", height: "32px" },
  md: { padding: "8px 16px", fontSize: "13.5px", height: "38px" },
  lg: { padding: "10px 20px", fontSize: "14.5px", height: "44px" },
};

export default function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  as: Tag = "button",
  ...rest
}) {
  const v = VARIANTS[variant] ?? VARIANTS.primary;
  const s = SIZES[size] ?? SIZES.md;

  return (
    <Tag
      className={`inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-opacity hover:opacity-90 ${className}`}
      style={{
        background: v.background,
        color: v.color,
        border: v.border,
        padding: s.padding,
        fontSize: s.fontSize,
        height: s.height,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}