import { NavLink } from "react-router-dom";
import { motion } from "motion/react";
import { Atom, BrainCircuit, Dna, LayoutDashboard } from "lucide-react";

const navigation = [
  { label: "Resumen", path: "/app", icon: LayoutDashboard, end: true },
  { label: "Moléculas", path: "/app/molecules", icon: Atom },
  { label: "Proteínas", path: "/app/proteins", icon: Dna },
  { label: "Predicciones", path: "/app/predictions", icon: BrainCircuit },
];

export default function NavLinks() {
  return (
    <nav
      className="flex items-center gap-1 rounded-full p-1"
      style={{
        background: "var(--toggle-bg)",
        border: "1px solid var(--toggle-border)",
      }}
    >
      {navigation.map((item) => {
        const Icon = item.icon;

        return (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.end}
            className={({ isActive }) =>
              "relative flex items-center gap-2 rounded-full px-3 py-2 text-[13px] font-semibold transition-colors md:px-4 " +
              (isActive
                ? "text-(--text-on-accent)"
                : "text-(--nav-text) hover:bg-(--nav-hover-bg) hover:text-(--nav-text-hover)")
            }
          >
            {({ isActive }) => (
              <>
                {/* Píldora activa: se desliza entre opciones */}
                {isActive && (
                  <motion.span
                    layoutId="nav-active-pill"
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: "var(--accent)",
                      boxShadow: "var(--shadow-sm)",
                    }}
                    transition={{ type: "spring", damping: 24, stiffness: 320 }}
                  />
                )}
                <Icon
                  className="relative z-10 h-3.75 w-3.75"
                  strokeWidth={isActive ? 2.4 : 2.1}
                />
                <span className="relative z-10 hidden md:inline">
                  {item.label}
                </span>
              </>
            )}
          </NavLink>
        );
      })}
    </nav>
  );
}