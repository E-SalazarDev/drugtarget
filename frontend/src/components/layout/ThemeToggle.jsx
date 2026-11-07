import { motion } from "motion/react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../providers/ThemeProvider";

const OPTIONS = [
  { key: "dark", label: "Oscuro", icon: Moon },
  { key: "light", label: "Claro", icon: Sun },
];

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div
      className="flex items-center gap-1 rounded-full p-1"
      style={{
        background: "var(--toggle-bg)",
        border: "1px solid var(--toggle-border)",
      }}
    >
      {OPTIONS.map(({ key, label, icon: Icon }) => {
        const active = theme === key;

        return (
          <button
            key={key}
            type="button"
            onClick={() => setTheme(key)}
            aria-pressed={active}
            className={
              "relative flex items-center gap-1.5 rounded-full px-3 py-2 text-[12.5px] font-semibold transition-colors sm:px-3.5 " +
              (active
                ? "text-(--text-on-accent)"
                : "text-(--nav-text) hover:text-(--nav-text-hover)")
            }
          >
            {active && (
              <motion.span
                layoutId="theme-thumb"
                className="absolute inset-0 rounded-full"
                style={{
                  background: "var(--accent)",
                  boxShadow: "var(--shadow-sm)",
                }}
                transition={{ type: "spring", damping: 24, stiffness: 320 }}
              />
            )}
            <Icon
              className="relative z-10"
              size={14}
              strokeWidth={2.3}
              fill={active && key === "dark" ? "currentColor" : "none"}
            />
            <span className="relative z-10 hidden sm:inline">{label}</span>
          </button>
        );
      })}
    </div>
  );
}