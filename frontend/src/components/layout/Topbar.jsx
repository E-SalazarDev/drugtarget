import { Link } from "react-router-dom";
import { Beaker } from "lucide-react";
import NavLinks from "./NavLinks";
import ThemeToggle from "./ThemeToggle";

function Topbar() {
  return (
    <header
      className="sticky top-0 z-30 flex h-17 items-center justify-between px-5 backdrop-blur-xl sm:px-8"
      style={{
        background: "var(--nav-bg)",
        borderBottom: "1px solid var(--nav-border)",
      }}
    >
      {/* Logo */}
      <Link
        to="/app"
        className="flex shrink-0 items-center gap-3 transition-opacity hover:opacity-90"
      >
        <div
          className="flex h-9 w-9 items-center justify-center rounded-xl"
          style={{
            background: "linear-gradient(135deg, #9B82FF 0%, #6D4AF2 100%)",
            boxShadow: "var(--shadow-sm)",
          }}
        >
          <Beaker className="h-4.5 w-4.5" strokeWidth={2.2} color="#FFFFFF" />
        </div>

        <span
          className="hidden text-[15px] font-bold tracking-[-0.01em] sm:inline"
          style={{ color: "var(--text-primary)" }}
        >
          DrugTarget
        </span>
      </Link>

      {/* Nav central */}
      <div className="absolute left-1/2 -translate-x-1/2">
        <NavLinks />
      </div>

      {/* Toggle de tema */}
      <div className="flex shrink-0 items-center">
        <ThemeToggle />
      </div>
    </header>
  );
}

export default Topbar;