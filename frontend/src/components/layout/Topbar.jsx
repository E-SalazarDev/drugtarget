import { Link } from "react-router-dom";
import { Beaker } from "lucide-react";
import NavLinks from "./NavLinks";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "../../providers/ThemeProvider";

function Topbar() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
   <header
  className="sticky top-0 z-30 flex h-16 items-center justify-between px-8"
  style={{
    background: isDark ? "var(--bg-elevated)" : "var(--bg-elevated)",
    borderBottom: "1px solid var(--border-medium)",
    boxShadow: "var(--shadow-header)",
  }}
>
      {/* Logo */}
      <Link
        to="/app"
        className="flex shrink-0 items-center gap-2.5 transition-opacity hover:opacity-90"
      >
        <div
          className="flex h-8 w-8 items-center justify-center rounded-lg"
          style={{
            background: isDark
              ? "rgba(34, 211, 230, 0.10)"
              : "rgba(10, 124, 133, 0.08)",
            border: `1px solid ${
              isDark
                ? "rgba(34, 211, 230, 0.20)"
                : "rgba(10, 124, 133, 0.18)"
            }`,
          }}
        >
          <Beaker
            className="h-4 w-4"
            strokeWidth={2.2}
            style={{ color: isDark ? "#22D3E6" : "#0A7C85" }}
          />
        </div>

        <span
          className="text-[14px] font-bold tracking-[-0.01em]"
          style={{ color: isDark ? "#FFFFFF" : "#0A0F24" }}
        >
          DrugTarget
        </span>
      </Link>

      {/* Nav central */}
      <div className="absolute left-1/2 -translate-x-1/2">
        <NavLinks />
      </div>

      {/* Toggle a la derecha con aire */}
      <div className="flex shrink-0 items-center">
        <ThemeToggle />
      </div>
    </header>
  );
}

export default Topbar;