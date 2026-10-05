import { NavLink } from "react-router-dom";
import {
  Atom,
  BrainCircuit,
  Dna,
  LayoutDashboard,
} from "lucide-react";
import { useTheme } from "../../providers/ThemeProvider";

const navigation = [
  { label: "Resumen", path: "/app", icon: LayoutDashboard, end: true },
  { label: "Moléculas", path: "/app/molecules", icon: Atom },
  { label: "Proteínas", path: "/app/proteins", icon: Dna },
  { label: "Predicciones", path: "/app/predictions", icon: BrainCircuit },
];

export default function NavLinks() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Cian sólido en ambos temas
  const accentCyan = "#22D3E6";
  const accentTextOn = "#0A0B0D"; // texto oscuro sobre el fondo cian

  return (
    <nav className="flex items-center gap-1">
      {navigation.map((item) => {
        const Icon = item.icon;

        return (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.end}
            className="group flex items-center gap-2 rounded-lg px-3.5 py-2 text-[13px] transition-all"
            style={({ isActive }) => ({
              background: isActive ? accentCyan : "transparent",
              color: isActive
                ? accentTextOn
                : isDark
                ? "#98A0AB"
                : "#5A6480",
              fontWeight: isActive ? 700 : 500,
            })}
            onMouseEnter={(e) => {
              const link = e.currentTarget;
              const isActive = link.getAttribute("aria-current") === "page";
              if (!isActive) {
                link.style.background = isDark
                  ? "rgba(255, 255, 255, 0.05)"
                  : "rgba(14, 19, 48, 0.05)";
                link.style.color = isDark ? "#FFFFFF" : "#0A0F24";
              }
            }}
            onMouseLeave={(e) => {
              const link = e.currentTarget;
              const isActive = link.getAttribute("aria-current") === "page";
              if (!isActive) {
                link.style.background = "transparent";
                link.style.color = isDark ? "#98A0AB" : "#5A6480";
              }
            }}
          >
            {({ isActive }) => (
              <>
                <Icon
                  className="h-3.5 w-3.5"
                  strokeWidth={isActive ? 2.4 : 2}
                  style={{
                    color: isActive
                      ? accentTextOn
                      : isDark
                      ? "#7A8494"
                      : "#8A93A4",
                  }}
                />
                <span>{item.label}</span>
              </>
            )}
          </NavLink>
        );
      })}
    </nav>
  );
}