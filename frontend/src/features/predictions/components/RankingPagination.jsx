import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { useTheme } from "../../../providers/ThemeProvider";

/**
 * Paginador premium.
 * - Botones con tamaño fijo (40x40)
 * - Separación clara entre botones
 * - Página activa con fondo cian y sombra
 * - Hover sutil en inactivos
 */
export default function RankingPagination({
  currentPage,
  totalPages,
  onPageChange,
}) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const nameColor = isDark ? "#FFFFFF" : "#0A0F24";
  const labelColor = isDark ? "#9CA3B4" : "#4A5170";
  const helperColor = isDark ? "#7A8494" : "#8A93A4";
  const accentCyan = isDark ? "#22D3E6" : "#0A7C85";
  const cardBg = isDark ? "#14171C" : "#FFFFFF";
  const subtleBg = isDark
    ? "rgba(255, 255, 255, 0.03)"
    : "rgba(14, 19, 48, 0.03)";
  const subtleBorder = isDark
    ? "rgba(255, 255, 255, 0.06)"
    : "rgba(14, 19, 48, 0.06)";
  const disabledColor = isDark ? "#4A5170" : "#B8BFCE";

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

  // Botón base: 40x40 fijo, redondeado xl
  const buttonBase =
    "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-[13px] font-semibold tabular-nums transition-all duration-200";

  return (
    <div className="flex items-center justify-center gap-2">
      {/* Flecha anterior */}
      <button
        type="button"
        onClick={() => canPrev && onPageChange(currentPage - 1)}
        disabled={!canPrev}
        aria-label="Página anterior"
        className={`${buttonBase} ${
          !canPrev ? "cursor-not-allowed" : "cursor-pointer"
        }`}
        style={{
          background: "transparent",
          color: canPrev ? nameColor : disabledColor,
          opacity: canPrev ? 1 : 0.35,
        }}
        onMouseEnter={(e) => {
          if (canPrev) {
            e.currentTarget.style.background = subtleBg;
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "transparent";
        }}
      >
        <ChevronLeft size={15} strokeWidth={2.2} />
      </button>

      {/* Números de página */}
      {pages.map((p, i) => {
        if (p === "...") {
          return (
            <span
              key={`dots-${i}`}
              className="flex h-10 w-10 items-center justify-center text-[13px] font-medium tracking-widest"
              style={{ color: helperColor }}
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
            className={buttonBase}
            style={{
              background: isActive ? accentCyan : "transparent",
              color: isActive
                ? isDark
                  ? "#0A0B0D"
                  : "#FFFFFF"
                : nameColor,
              boxShadow: isActive
                ? isDark
                  ? `0 6px 20px ${accentCyan}40`
                  : `0 4px 14px ${accentCyan}35`
                : "none",
            }}
            onMouseEnter={(e) => {
              if (!isActive) {
                e.currentTarget.style.background = subtleBg;
                e.currentTarget.style.boxShadow = `inset 0 0 0 1px ${subtleBorder}`;
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive) {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.boxShadow = "none";
              }
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
          !canNext ? "cursor-not-allowed" : "cursor-pointer"
        }`}
        style={{
          background: "transparent",
          color: canNext ? nameColor : disabledColor,
          opacity: canNext ? 1 : 0.35,
        }}
        onMouseEnter={(e) => {
          if (canNext) {
            e.currentTarget.style.background = subtleBg;
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "transparent";
        }}
      >
        <ChevronRight size={15} strokeWidth={2.2} />
      </button>
    </div>
  );
}