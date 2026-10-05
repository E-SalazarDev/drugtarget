import { motion } from "motion/react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../providers/ThemeProvider";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  // Colores por modo:
  // - Oscuro: thumb cian (coherente con el acento dark)
  // - Claro: thumb rosita/morado (identidad propia del light)
  const darkThumb = "#22D3E6";      // cian
  const lightThumb = "#A78BFA";     // lavanda/morado suave

  return (
    <div
      className="relative flex items-center rounded-full"
      style={{
        background: isDark
          ? "rgba(255, 255, 255, 0.05)"
          : "rgba(14, 19, 48, 0.05)",
        border: `1px solid ${
          isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(14, 19, 48, 0.08)"
        }`,
        padding: 3,
      }}
    >
      {/* Botón Oscuro */}
      <button
        type="button"
        onClick={() => setTheme("dark")}
        className="relative z-10 flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[11.5px] font-bold transition-colors"
        style={{
          color: isDark ? "#0A0B0D" : isDark ? "#FFFFFF" : "#5A6480",
        }}
        aria-pressed={isDark}
      >
        <Moon
          className="relative z-10"
          size={12}
          strokeWidth={2.4}
          fill={isDark ? "currentColor" : "none"}
        />
        <span className="relative z-10">Oscuro</span>
      </button>

      {/* Botón Claro */}
      <button
        type="button"
        onClick={() => setTheme("light")}
        className="relative z-10 flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[11.5px] font-bold transition-colors"
        style={{
          color: !isDark ? "#FFFFFF" : "#5A6480",
        }}
        aria-pressed={!isDark}
      >
        <Sun className="relative z-10" size={12} strokeWidth={2.4} />
        <span className="relative z-10">Claro</span>
      </button>

      {/* Thumb deslizante — color según tema */}
      <div
        className={`absolute inset-y-0 z-0 flex ${
          isDark ? "justify-start" : "justify-end"
        }`}
        style={{ left: 3, right: 3, top: 3, bottom: 3 }}
      >
        <motion.span
          layout
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="h-full rounded-full"
          style={{
            width: "calc(50% - 1px)",
            background: isDark ? darkThumb : lightThumb,
            boxShadow: isDark
              ? "0 2px 8px rgba(34, 211, 230, 0.3)"
              : "0 2px 8px rgba(167, 139, 250, 0.35)",
          }}
        />
      </div>
    </div>
  );
}