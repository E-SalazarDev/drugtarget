import { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, Search, Dna, Check } from "lucide-react";
import { useTheme } from "../../../providers/ThemeProvider";

export default function ProteinSelector({ proteins, selectedId, onSelect }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const containerRef = useRef(null);

  const nameColor = isDark ? "#FFFFFF" : "#0A0F24";
  const helperColor = isDark ? "#7A8494" : "#6B7692";
  const accentCyan = isDark ? "#22D3E6" : "#0A7C85";

  const cardBg = isDark ? "#14171C" : "#FFFFFF";
  const dropdownBg = isDark ? "#181B22" : "#FFFFFF";
  const borderSubtle = isDark
    ? "rgba(255, 255, 255, 0.10)"
    : "rgba(14, 19, 48, 0.10)";
  const hoverBg = isDark ? "#1F232B" : "#F5F7FA";

  const selected = proteins.find((p) => p.id === selectedId);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    if (!q) return proteins;
    return proteins.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        (p.uniprot_id || "").toLowerCase().includes(q)
    );
  }, [proteins, query]);

  useEffect(() => {
    const handler = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      {/* Trigger — altura FIJA h-11 (44px) para coincidir con el botón */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex h-11 w-full items-center justify-between gap-3 rounded-lg px-3.5 text-left transition-colors"
        style={{
          background: cardBg,
          border: `1px solid ${open ? accentCyan : borderSubtle}`,
          boxShadow: open
            ? `0 0 0 3px ${
                isDark ? "rgba(34, 211, 230, 0.10)" : "rgba(10, 124, 133, 0.08)"
              }`
            : "none",
        }}
      >
        <div className="flex min-w-0 items-center gap-3">
          <div
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
            style={{
              background: isDark
                ? "rgba(34, 211, 230, 0.10)"
                : "rgba(10, 124, 133, 0.10)",
              border: `1px solid ${
                isDark
                  ? "rgba(34, 211, 230, 0.20)"
                  : "rgba(10, 124, 133, 0.20)"
              }`,
            }}
          >
            <Dna size={14} strokeWidth={2} style={{ color: accentCyan }} />
          </div>
          <div className="min-w-0 flex-1">
            {selected ? (
              <>
                <p
                  className="truncate text-[13.5px] font-semibold leading-tight"
                  style={{ color: nameColor }}
                >
                  {selected.name}
                </p>
                <p
                  className="mt-0.5 truncate font-mono text-[10.5px] leading-tight"
                  style={{ color: helperColor }}
                >
                  {selected.uniprot_id} · {selected.sequence_length} residuos
                </p>
              </>
            ) : (
              <p className="text-[13.5px]" style={{ color: helperColor }}>
                Selecciona una proteína…
              </p>
            )}
          </div>
        </div>

        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0"
        >
          <ChevronDown size={16} strokeWidth={2} style={{ color: helperColor }} />
        </motion.div>
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 right-0 z-40 mt-2 overflow-hidden rounded-lg"
            style={{
              background: dropdownBg,
              border: `1px solid ${borderSubtle}`,
              boxShadow: isDark
                ? "0 20px 60px rgba(0,0,0,0.5)"
                : "0 12px 40px rgba(14, 19, 48, 0.12)",
            }}
          >
            <div className="border-b p-2.5" style={{ borderColor: borderSubtle }}>
              <div className="relative">
                <Search
                  size={14}
                  strokeWidth={2}
                  className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2"
                  style={{ color: helperColor }}
                />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Buscar por nombre o UniProt…"
                  autoFocus
                  className="w-full rounded-md py-2 pl-8 pr-3 text-[12.5px] outline-none"
                  style={{
                    background: isDark ? "#0F1219" : "#F5F7FA",
                    border: `1px solid ${borderSubtle}`,
                    color: nameColor,
                  }}
                />
              </div>
            </div>

            <div className="max-h-72 overflow-y-auto py-1">
              {filtered.length === 0 ? (
                <p
                  className="px-4 py-6 text-center text-[12.5px]"
                  style={{ color: helperColor }}
                >
                  Sin resultados
                </p>
              ) : (
                filtered.map((p) => {
                  const isSelected = p.id === selectedId;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => {
                        onSelect(p.id);
                        setOpen(false);
                        setQuery("");
                      }}
                      className="flex w-full items-center gap-3 px-3 py-2.5 text-left transition-colors"
                      style={{
                        background: isSelected
                          ? isDark
                            ? "rgba(34, 211, 230, 0.08)"
                            : "rgba(10, 124, 133, 0.06)"
                          : "transparent",
                      }}
                      onMouseEnter={(e) => {
                        if (!isSelected)
                          e.currentTarget.style.background = hoverBg;
                      }}
                      onMouseLeave={(e) => {
                        if (!isSelected)
                          e.currentTarget.style.background = "transparent";
                      }}
                    >
                      <div className="min-w-0 flex-1">
                        <p
                          className="truncate text-[13px] font-medium"
                          style={{ color: nameColor }}
                        >
                          {p.name}
                        </p>
                        <p
                          className="mt-0.5 truncate font-mono text-[10.5px]"
                          style={{ color: helperColor }}
                        >
                          {p.uniprot_id} · {p.sequence_length} aa
                        </p>
                      </div>
                      {isSelected && (
                        <Check
                          size={14}
                          strokeWidth={2.4}
                          style={{ color: accentCyan, flexShrink: 0 }}
                        />
                      )}
                    </button>
                  );
                })
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}