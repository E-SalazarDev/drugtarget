import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Plus, Search, ArrowUpRight, X, Atom } from "lucide-react";

const SOFT_EASE = [0.22, 1, 0.36, 1];

// Columnas de la lista (el SMILES ocupa el centro)
const COLS =
  "lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1.5fr)_150px_120px_32px]";

const MOCK_MOLECULES = [
  { id: 1, name: "Aspirina", smiles: "CC(=O)Oc1ccccc1C(=O)O", formula: "C9H8O4", weight: "180.16", created_at: "2025-06-12" },
  { id: 2, name: "Ibuprofeno", smiles: "CC(C)Cc1ccc(cc1)C(C)C(=O)O", formula: "C13H18O2", weight: "206.28", created_at: "2025-06-10" },
  { id: 3, name: "Cafeína", smiles: "CN1C=NC2=C1C(=O)N(C(=O)N2C)C", formula: "C8H10N4O2", weight: "194.19", created_at: "2025-06-08" },
  { id: 4, name: "Paracetamol", smiles: "CC(=O)Nc1ccc(O)cc1", formula: "C8H9NO2", weight: "151.16", created_at: "2025-06-05" },
  { id: 5, name: "Metformina", smiles: "CN(C)C(=N)NC(=N)N", formula: "C4H11N5", weight: "129.16", created_at: "2025-06-03" },
  { id: 6, name: "Etanol", smiles: "CCO", formula: "C2H6O", weight: "46.07", created_at: "2025-06-01" },
  { id: 7, name: "Glucosa", smiles: "OC[C@H]1OC(O)[C@H](O)[C@@H](O)[C@@H]1O", formula: "C6H12O6", weight: "180.16", created_at: "2025-05-28" },
  { id: 8, name: "Penicilina G", smiles: "CC1(C)S[C@@H]2[C@H](NC(=O)Cc3ccccc3)C(=O)N2[C@H]1C(=O)O", formula: "C16H18N2O4S", weight: "334.39", created_at: "2025-05-25" },
];

export default function MoleculesPage() {
  const [query, setQuery] = useState("");
  const [hoveredId, setHoveredId] = useState(null);
  const molecules = MOCK_MOLECULES;

  const maxWeight = Math.max(...molecules.map((m) => parseFloat(m.weight)));

  const filtered = molecules.filter((m) => {
    const q = query.toLowerCase();
    return (
      (m.name || "").toLowerCase().includes(q) ||
      m.smiles.toLowerCase().includes(q) ||
      (m.formula || "").toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: SOFT_EASE }}
        className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
      >
        <div>
          <h1
            className="text-[32px] font-bold leading-none tracking-[-0.03em]"
            style={{ color: "var(--text-primary)" }}
          >
            Moléculas
          </h1>
          <p
            className="mt-2 text-[14px]"
            style={{ color: "var(--text-secondary)" }}
          >
            Explora y administra las moléculas registradas.
          </p>
        </div>

        <Link
          to="/app/molecules/new"
          className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-[13.5px] font-medium transition-all hover:opacity-95"
          style={{
            background: "var(--accent)",
            color: "var(--text-on-accent)",
          }}
        >
          <Plus size={15} strokeWidth={2.4} />
          Nueva molécula
        </Link>
      </motion.div>

      {/* Buscador + contador */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05, ease: SOFT_EASE }}
        className="flex flex-col gap-3 sm:flex-row sm:items-center"
      >
        <div className="relative flex-1">
          <Search
            size={16}
            strokeWidth={2.2}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2"
            style={{ color: "var(--text-secondary)" }}
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por nombre, SMILES o fórmula…"
            className="w-full rounded-lg py-2.5 pl-10 pr-10 text-[13.5px] outline-none transition-colors"
            style={{
              background: "var(--card-bg)",
              border: "1px solid var(--card-border)",
              color: "var(--text-primary)",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "var(--border-strong)";
              e.target.style.boxShadow = "0 0 0 3px var(--accent-cyan-soft)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "var(--card-border)";
              e.target.style.boxShadow = "none";
            }}
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Limpiar búsqueda"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 transition-colors hover:opacity-80"
              style={{ color: "var(--text-secondary)" }}
            >
              <X size={14} strokeWidth={2.2} />
            </button>
          )}
        </div>

        {/* Ej.: "8 de 8 moléculas" = mostradas / total */}
        <span
          className="shrink-0 rounded-full px-3.5 py-2 text-[12.5px] font-semibold tabular-nums"
          style={{
            color: "var(--text-primary)",
            background: "var(--icon-box-bg)",
            border: "1px solid var(--icon-box-border)",
          }}
        >
          {filtered.length} de {molecules.length} moléculas
        </span>
      </motion.div>

      {/* Lista */}
      {filtered.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1, ease: SOFT_EASE }}
          className="rounded-2xl px-6 py-16 text-center"
          style={{
            background: "var(--card-bg)",
            border: "1px solid var(--card-border)",
          }}
        >
          <p
            className="text-[14px] font-medium"
            style={{ color: "var(--text-primary)" }}
          >
            {query
              ? "Sin resultados para esa búsqueda"
              : "Todavía no hay moléculas registradas"}
          </p>
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="mt-3 text-[12.5px] font-semibold transition-opacity hover:opacity-80"
              style={{ color: "var(--link)" }}
            >
              Limpiar búsqueda
            </button>
          )}
        </motion.div>
      ) : (
        <div className="space-y-2">
          {/* Encabezados de columna */}
          <div
            className={`hidden gap-5 px-5 pb-1 text-[11px] font-bold uppercase tracking-[0.12em] lg:grid ${COLS}`}
            style={{ color: "var(--text-secondary)" }}
          >
            <span>Molécula</span>
            <span>SMILES</span>
            <span>Masa molar</span>
            <span>Registrada</span>
            <span />
          </div>

          {filtered.map((m, i) => {
            const isHovered = hoveredId === m.id;
            const pct = Math.round((parseFloat(m.weight) / maxWeight) * 100);

            return (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: Math.min(i * 0.03, 0.25),
                  ease: SOFT_EASE,
                }}
              >
                <Link
                  to={`/app/molecules/${m.id}`}
                  onMouseEnter={() => setHoveredId(m.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className={`group relative grid items-center gap-x-5 gap-y-3 rounded-xl px-5 py-4 transition-all duration-200 ${COLS}`}
                  style={{
                    background: isHovered ? "var(--surface-2)" : "var(--card-bg)",
                    border: `1px solid ${
                      isHovered ? "var(--border-strong)" : "var(--card-border)"
                    }`,
                    boxShadow: "var(--shadow-sm)",
                  }}
                >
                  {/* Barra lateral al hover */}
                  <motion.span
                    className="absolute left-0 top-1/2 -translate-y-1/2 rounded-r-full"
                    style={{
                      width: 3,
                      height: "60%",
                      background: "var(--chip-lilac-bg)",
                    }}
                    initial={false}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.15 }}
                  />

                  {/* Molécula: icono + nombre + fórmula */}
                  <div className="flex min-w-0 items-center gap-3.5">
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                      style={{
                        background:
                          "linear-gradient(135deg, #9B82FF 0%, #6D4AF2 100%)",
                      }}
                    >
                      <Atom size={18} strokeWidth={2.2} color="#FFFFFF" />
                    </div>
                    <div className="flex min-w-0 flex-col gap-1.5">
                      <span
                        className="truncate text-[15px] font-bold"
                        style={{
                          color: "var(--text-primary)",
                          letterSpacing: "-0.01em",
                        }}
                      >
                        {m.name || "Sin nombre"}
                      </span>
                      <span
                        className="w-fit rounded-md px-2 py-0.5 font-mono text-[11px] font-bold tracking-wide"
                        style={{
                          background: "var(--chip-lilac-bg)",
                          color: "var(--chip-text)",
                        }}
                      >
                        {m.formula}
                      </span>
                    </div>
                  </div>

                  {/* SMILES (centro) */}
                  <div
                    className="min-w-0 truncate rounded-lg px-3 py-2 font-mono text-[12.5px]"
                    title={m.smiles}
                    style={{
                      color: "var(--text-primary)",
                      background: "var(--icon-box-bg)",
                      border: "1px solid var(--row-border)",
                    }}
                  >
                    {m.smiles}
                  </div>

                  {/* Masa + fecha (en pantallas chicas van en una fila) */}
                  <div className="flex items-center gap-8 lg:contents">
                    <div className="flex min-w-32.5 flex-col gap-1.5">
                      <div className="flex items-baseline gap-1.5">
                        <span
                          className="font-mono text-[16px] font-bold tabular-nums"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {m.weight}
                        </span>
                        <span
                          className="text-[11px] font-semibold"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          g/mol
                        </span>
                      </div>
                      <div
                        className="h-1.5 w-full overflow-hidden rounded-full"
                        style={{ background: "var(--bar-track)" }}
                      >
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${pct}%`,
                            background:
                              "linear-gradient(90deg, #9B82FF 0%, #6D4AF2 100%)",
                          }}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-0.5">
                      <span
                        className="text-[11px] font-bold uppercase tracking-[0.12em] lg:hidden"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        Registrada
                      </span>
                      <span
                        className="font-mono text-[13.5px] font-semibold tabular-nums"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {m.created_at}
                      </span>
                    </div>
                  </div>

                  {/* Flecha */}
                  <div
                    className="hidden h-8 w-8 items-center justify-center rounded-full transition-colors lg:flex"
                    style={{
                      background: isHovered
                        ? "var(--accent)"
                        : "var(--icon-box-bg)",
                      border: "1px solid var(--icon-box-border)",
                    }}
                  >
                    <ArrowUpRight
                      size={15}
                      strokeWidth={2.4}
                      style={{
                        color: isHovered
                          ? "var(--text-on-accent)"
                          : "var(--text-primary)",
                      }}
                    />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}