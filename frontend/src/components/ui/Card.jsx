/**
 * Card
 * ----
 * Variantes:
 *  - default  → superficies normales (tablas, stats, formularios)
 *  - accent   → superficies destacadas (hero, mejor candidato, CTA)
 *  - subtle   → superficies secundarias (agrupaciones internas)
 */

const VARIANTS = {
  default: {
    background: "var(--surface-1)",
    border: "1px solid var(--border-subtle)",
    color: "var(--text-primary)",
    boxShadow: "var(--shadow-sm)",
  },
  accent: {
    background: "var(--surface-1)",
    border: "1px solid var(--border-strong)",
    color: "var(--text-primary)",
    boxShadow: "var(--shadow-md)",
  },
  subtle: {
    background: "var(--surface-2)",
    border: "1px solid var(--border-subtle)",
    color: "var(--text-secondary)",
    boxShadow: "none",
  },
};

export default function Card({
  variant = "default",
  className = "",
  children,
  as: Tag = "div",
  style: styleProp,
  ...rest
}) {
  const styles = VARIANTS[variant] ?? VARIANTS.default;

  return (
    <Tag
      className={`rounded-2xl ${className}`}
      style={{
        background: styles.background,
        border: styles.border,
        color: styles.color,
        boxShadow: styles.boxShadow,
        ...styleProp,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}