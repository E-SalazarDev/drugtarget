import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "motion/react";

/**
 * Paginador.
 * - Botones de tamaño fijo (40x40)
 * - Página activa: píldora blanca con letra oscura (igual que el menú)
 * - Hover sutil en inactivos
 */
export default function RankingPagination({
  currentPage,
  totalPages,
  onPageChange,
}) {
  const getVisiblePages = () => {
    const pages = [];
    const delta = 1;

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }

    pages.push(1);

    const left = Math.max(2, currentPage - delta);
    const right = Math.min(totalPages - 1, currentPage + delta);

    if (left > 2) pages.push("...");

    for (let i = left; i <= right; i++) pages.push(i);

    if (right < totalPages - 1) pages.push("...");

    pages.push(totalPages);

    return pages;
  };

  const pages = getVisiblePages();
  const canPrev = currentPage > 1;
  const canNext = currentPage < totalPages;

  const buttonBase =
    "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-[13.5px] font-semibold tabular-nums transition-all duration-200";

  const arrowStyle = (enabled) => ({
    background: "var(--icon-box-bg)",
    border: "1px solid var(--icon-box-border)",
    color: enabled ? "var(--text-primary)" : "var(--text-quaternary)",
    opacity: enabled ? 1 : 0.5,
  });

  return (
    <div className="flex items-center justify-center gap-2">
      {/* Flecha anterior */}
      <button
        type="button"
        onClick={() => canPrev && onPageChange(currentPage - 1)}
        disabled={!canPrev}
        aria-label="Página anterior"
        className={`${buttonBase} ${
          canPrev ? "cursor-pointer hover:bg-(--hover-overlay)" : "cursor-not-allowed"
        }`}
        style={arrowStyle(canPrev)}
      >
        <ChevronLeft size={16} strokeWidth={2.4} />
      </button>

      {/* Números de página */}
      {pages.map((p, i) => {
        if (p === "...") {
          return (
            <span
              key={`dots-${i}`}
              className="flex h-10 w-8 items-center justify-center text-[13px] font-medium tracking-widest"
              style={{ color: "var(--text-secondary)" }}
            >
              ···
            </span>
          );
        }

        const isActive = p === currentPage;

        return (
          <motion.button
            key={p}
            type="button"
            onClick={() => onPageChange(p)}
            whileTap={{ scale: 0.94 }}
            transition={{ duration: 0.1 }}
            className={`${buttonBase} ${
              isActive ? "" : "hover:bg-(--hover-overlay)"
            }`}
            style={{
              background: isActive ? "var(--accent)" : "transparent",
              color: isActive
                ? "var(--text-on-accent)"
                : "var(--text-primary)",
              boxShadow: isActive ? "var(--shadow-sm)" : "none",
            }}
          >
            {p}
          </motion.button>
        );
      })}

      {/* Flecha siguiente */}
      <button
        type="button"
        onClick={() => canNext && onPageChange(currentPage + 1)}
        disabled={!canNext}
        aria-label="Página siguiente"
        className={`${buttonBase} ${
          canNext ? "cursor-pointer hover:bg-(--hover-overlay)" : "cursor-not-allowed"
        }`}
        style={arrowStyle(canNext)}
      >
        <ChevronRight size={16} strokeWidth={2.4} />
      </button>
    </div>
  );
}