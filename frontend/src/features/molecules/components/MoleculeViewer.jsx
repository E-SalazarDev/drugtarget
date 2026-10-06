import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { AlertCircle, RefreshCw, RotateCw } from "lucide-react";
import * as $3Dmol from "3dmol";
import { getRdkitModule } from "../../../lib/rdkit";

/**
 * Parsea un molblock y devuelve { formula, atomCount }.
 *
 * Formato molblock (estándar SDF):
 *  - Línea 0: nombre
 *  - Línea 1: programa
 *  - Línea 2: comentario
 *  - Línea 3: conteo "  aaabbb... V2000"
 *            aaa = cantidad de átomos, bbb = cantidad de enlaces
 *  - Líneas 4 a 4+aaa: cada línea es un átomo
 *            columnas 31-34: símbolo del elemento
 */
function parseMolblock(molblock) {
  if (!molblock) return { formula: "", atomCount: 0 };

  const lines = molblock.split("\n");

  // Línea 3: conteo
  const countsLine = lines[3] || "";
  const numAtoms = parseInt(countsLine.substring(0, 3).trim(), 10) || 0;

  if (numAtoms === 0) {
    return { formula: "", atomCount: 0 };
  }

  // Contar elementos leyendo las primeras `numAtoms` líneas de átomos
  const elementCounts = {};
  for (let i = 0; i < numAtoms; i++) {
    const atomLine = lines[4 + i];
    if (!atomLine || atomLine.length < 34) continue;

    // Columna 31-34 (índice 31-33) tiene el símbolo del elemento
    const sym = atomLine.substring(31, 34).trim();
    if (sym) {
      elementCounts[sym] = (elementCounts[sym] || 0) + 1;
    }
  }

  // Construir fórmula molecular en orden estándar (Hill system):
  // Carbono primero, Hidrógeno segundo, resto alfabético
  const parts = [];

  if (elementCounts.C) {
    parts.push("C" + (elementCounts.C > 1 ? elementCounts.C : ""));
  }
  if (elementCounts.H) {
    parts.push("H" + (elementCounts.H > 1 ? elementCounts.H : ""));
  }

  const otherElements = Object.keys(elementCounts)
    .filter((el) => el !== "C" && el !== "H")
    .sort();

  for (const el of otherElements) {
    const n = elementCounts[el];
    parts.push(el + (n > 1 ? n : ""));
  }

  return {
    formula: parts.join(""),
    atomCount: numAtoms,
  };
}

export default function MoleculeViewer({
  smiles,
  height = 520,
  style = "ballstick",
}) {
  const containerRef = useRef(null);
  const viewerRef = useRef(null);

  const [status, setStatus] = useState("loading");
  const [atomCount, setAtomCount] = useState(0);
  const [formula, setFormula] = useState("");
  const [retryKey, setRetryKey] = useState(0);
  const [spinning, setSpinning] = useState(true);

  const bgColor = "#0B0E14";

  useEffect(() => {
    if (!smiles) return;

    let cancelled = false;
    const container = containerRef.current;

    setStatus("loading");
    setFormula("");
    setAtomCount(0);

    async function loadAndRender() {
      try {
        const rdkit = await getRdkitModule();
        if (cancelled) return;

        const mol = rdkit.get_mol(smiles);
        if (!mol || !mol.is_valid()) throw new Error("SMILES inválido");

        mol.set_new_coords(true);
        mol.add_hs_in_place();

        const molblock = mol.get_molblock();

        // Parsear molblock para extraer fórmula y cantidad de átomos
        const parsed = parseMolblock(molblock);
        if (parsed.formula) setFormula(parsed.formula);
        if (parsed.atomCount) setAtomCount(parsed.atomCount);

        mol.delete();

        if (!container || cancelled) return;
        container.innerHTML = "";

        const viewer = $3Dmol.createViewer(container, {
          backgroundColor: bgColor,
          backgroundAlpha: 1,
          antialias: true,
        });
        viewerRef.current = viewer;
        viewer.resize();
        viewer.addModel(molblock, "sdf");

        if (style === "stick") {
          viewer.setStyle({}, { stick: { radius: 0.15, colorscheme: "default" } });
        } else if (style === "sphere") {
          viewer.setStyle({}, { sphere: { scale: 0.9, colorscheme: "default" } });
        } else {
          viewer.setStyle({}, {
            stick: { radius: 0.14, colorscheme: "default" },
            sphere: { scale: 0.28, colorscheme: "default" },
          });
        }

        viewer.zoomTo();
        viewer.render();
        viewer.spin("y", 0.6);

        if (!cancelled) setStatus("ready");
      } catch (err) {
        console.error("[MoleculeViewer] Error interno:", err);
        if (!cancelled) setStatus("error");
      }
    }

    loadAndRender();

    return () => {
      cancelled = true;
      try {
        if (viewerRef.current) {
          viewerRef.current.spin(false);
          viewerRef.current.clear();
          viewerRef.current = null;
        }
        if (container) container.innerHTML = "";
      } catch {}
    };
  }, [smiles, style, bgColor, retryKey]);

  useEffect(() => {
    const onResize = () => {
      if (viewerRef.current) {
        viewerRef.current.resize();
        viewerRef.current.render();
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleRetry = () => setRetryKey((k) => k + 1);

  const toggleSpin = () => {
    if (!viewerRef.current) return;
    if (spinning) {
      viewerRef.current.spin(false);
      setSpinning(false);
    } else {
      viewerRef.current.spin("y", 0.6);
      setSpinning(true);
    }
  };

  return (
    <div
      className="relative overflow-hidden rounded-2xl"
      style={{
        height,
        background: bgColor,
        border: "1px solid var(--border-subtle)",
      }}
    >
      {/* Canvas */}
      <div ref={containerRef} style={{ position: "absolute", inset: 0 }} />

      {/* Header dentro del canvas */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between px-5 py-4"
        style={{ zIndex: 4 }}
      >
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2 w-2">
            <span
              className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
              style={{
                background: status === "error" ? "#F87171" : "#22D3E6",
              }}
            />
            <span
              className="relative inline-flex h-2 w-2 rounded-full"
              style={{
                background: status === "error" ? "#F87171" : "#22D3E6",
              }}
            />
          </span>
          <span
            className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em]"
            style={{ color: "rgba(220, 230, 255, 0.75)" }}
          >
            Vista molecular
          </span>
        </div>

        <span
          className="font-mono text-[11px] tabular-nums tracking-wider"
          style={{ color: "rgba(220, 230, 255, 0.55)" }}
        >
          {status === "loading" && "procesando…"}
          {status === "ready" && `${atomCount} átomos`}
          {status === "error" && "sin datos"}
        </span>
      </div>

      {/* Footer */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-center px-5 py-4"
        style={{ zIndex: 3 }}
      >
        <span
          className="font-mono text-[10.5px] tracking-wider"
          style={{ color: "rgba(220, 230, 255, 0.38)" }}
        >
          Arrastra para rotar · scroll para zoom
        </span>
      </div>

      {/* Botón de rotación */}
      {status === "ready" && (
        <motion.button
          type="button"
          onClick={toggleSpin}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="absolute bottom-3 left-4 flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[11px] font-medium backdrop-blur transition-colors"
          style={{
            zIndex: 5,
            background: "rgba(255, 255, 255, 0.06)",
            color: "rgba(220, 230, 255, 0.85)",
            border: "1px solid rgba(255, 255, 255, 0.10)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.12)";
            e.currentTarget.style.color = "#FFFFFF";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.06)";
            e.currentTarget.style.color = "rgba(220, 230, 255, 0.85)";
          }}
        >
          <RotateCw size={12} strokeWidth={2.2} />
          {spinning ? "Detener" : "Reanudar"}
        </motion.button>
      )}

      {/* Fórmula molecular */}
      {status === "ready" && formula && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="pointer-events-none absolute bottom-3 right-4"
          style={{ zIndex: 5 }}
        >
          <span
            className="rounded-md px-2 py-1 font-mono text-[10.5px] font-semibold tracking-wider"
            style={{
              color: "rgba(220, 230, 255, 0.75)",
              background: "rgba(255, 255, 255, 0.06)",
              border: "1px solid rgba(255, 255, 255, 0.10)",
            }}
          >
            {formula}
          </span>
        </motion.div>
      )}

      {/* Loading */}
      <AnimatePresence>
        {status === "loading" && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-4"
            style={{ zIndex: 5 }}
          >
            <div
              className="text-[12.5px] font-medium"
              style={{ color: "rgba(220, 230, 255, 0.55)" }}
            >
              Generando estructura 3D…
            </div>
            <div
              className="h-0.5 w-32 overflow-hidden rounded-full"
              style={{ background: "rgba(255,255,255,0.08)" }}
            >
              <motion.div
                className="h-full w-1/3 rounded-full"
                style={{ background: "#22D3E6" }}
                animate={{ x: ["-100%", "300%"] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error */}
      <AnimatePresence>
        {status === "error" && (
          <motion.div
            key="error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6"
            style={{ zIndex: 5 }}
          >
            <div
              className="flex h-11 w-11 items-center justify-center rounded-full"
              style={{
                background: "rgba(248, 113, 113, 0.08)",
                border: "1px solid rgba(248, 113, 113, 0.20)",
              }}
            >
              <AlertCircle size={18} strokeWidth={2} style={{ color: "#F87171" }} />
            </div>
            <div className="text-center">
              <p
                className="text-[13.5px] font-medium"
                style={{ color: "var(--text-primary)" }}
              >
                No se pudo cargar la estructura
              </p>
              <p
                className="mt-1.5 max-w-xs text-[12px]"
                style={{ color: "rgba(220, 230, 255, 0.5)" }}
              >
                El servicio de visualización no está disponible en este momento.
              </p>
            </div>
            <button
              type="button"
              onClick={handleRetry}
              className="mt-2 inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-[12.5px] font-medium transition-colors"
              style={{
                background: "rgba(255, 255, 255, 0.06)",
                color: "#F0F2F5",
                border: "1px solid rgba(255, 255, 255, 0.10)",
              }}
            >
              <RefreshCw size={13} strokeWidth={2} />
              Reintentar
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}