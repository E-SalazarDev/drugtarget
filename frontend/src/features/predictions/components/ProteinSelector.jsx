import { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, Search, Dna, Check } from "lucide-react";

const PINK_GRADIENT = "linear-gradient(135deg, #FF7FB0 0%, #E8458A 100%)";

export default function ProteinSelector({ proteins, selectedId, onSelect }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const containerRef = useRef(null);

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
      {/* Trigger — altura fija h-11 (igual que el botón) */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex h-11 w-full items-center justify-between gap-3 rounded-lg px-3 text-left transition-colors"
        style={{
          background: "var(--surface-3)",
          border: `1px solid ${
            open ? "var(--accent-violet)" : "var(--border-medium)"
          }`,
          boxShadow: open ? "0 0 0 3px var(--accent-violet-soft)" : "none",
        }}
      >
        <div className="flex min-w-0 items-center gap-3">
          <div
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md"
            style={{ background: PINK_GRADIENT }}
          >
            <Dna size={14} strokeWidth={2.3} color="#FFFFFF" />
          </div>
          <div className="min-w-0 flex-1">
            {selected ? (
              <>
                <p
                  className="truncate text-[13.5px] font-semibold leading-tight"
                  style={{ color: "var(--text-primary)" }}
                >
                  {selected.name}
                </p>
                <p
                  className="mt-0.5 truncate font-mono text-[11px] leading-tight"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {selected.uniprot_id} · {selected.sequence_length} residuos
                </p>
              </>
            ) : (
              <p
                className="text-[13.5px]"
                style={{ color: "var(--text-secondary)" }}
              >
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
          <ChevronDown
            size={16}
            strokeWidth={2.2}
            style={{ color: "var(--text-primary)" }}
          />
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
            className="absolute left-0 right-0 z-40 mt-2 overflow-hidden rounded-xl"
            style={{
              background: "var(--card-bg)",
              border: "1px solid var(--border-medium)",
              boxShadow: "var(--shadow-lg)",
            }}
          >
            <div
              className="p-2.5"
              style={{ borderBottom: "1px solid var(--row-border)" }}
            >
              <div className="relative">
                <Search
                  size={14}
                  strokeWidth={2.2}
                  className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2"
                  style={{ color: "var(--text-secondary)" }}
                />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Buscar por nombre o UniProt…"
                  autoFocus
                  className="w-full rounded-md py-2 pl-8 pr-3 text-[13px] outline-none"
                  style={{
                    background: "var(--surface-3)",
                    border: "1px solid var(--border-medium)",
                    color: "var(--text-primary)",
                  }}
                />
              </div>
            </div>

            <div className="max-h-72 overflow-y-auto py-1">
              {filtered.length === 0 ? (
                <p
                  className="px-4 py-6 text-center text-[13px]"
                  style={{ color: "var(--text-secondary)" }}
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
                          ? "var(--accent-violet-soft)"
                          : "transparent",
                      }}
                      onMouseEnter={(e) => {
                        if (!isSelected)
                          e.currentTarget.style.background = "var(--row-hover)";
                      }}
                      onMouseLeave={(e) => {
                        if (!isSelected)
                          e.currentTarget.style.background = "transparent";
                      }}
                    >
                      <div className="min-w-0 flex-1">
                        <p
                          className="truncate text-[13.5px] font-semibold"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {p.name}
                        </p>
                        <p
                          className="mt-0.5 truncate font-mono text-[11px]"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          {p.uniprot_id} · {p.sequence_length} aa
                        </p>
                      </div>
                      {isSelected && (
                        <Check
                          size={15}
                          strokeWidth={2.6}
                          style={{ color: "var(--accent-violet)", flexShrink: 0 }}
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