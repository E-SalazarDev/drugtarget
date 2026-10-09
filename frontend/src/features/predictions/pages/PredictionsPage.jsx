import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, TrendingUp, BarChart3, ArrowRight } from "lucide-react";
import { useTheme } from "../../../providers/ThemeProvider";
import ProteinSelector from "../components/ProteinSelector";
import TopCandidate from "../components/TopCandidate";
import RankingRow from "../components/RankingRow";
import RankingPagination from "../components/RankingPagination";
import PredictionLoading from "../components/PredictionLoading";
import {
  MOCK_PROTEINS,
  MOCK_RANKINGS,
  generateMockRanking,
} from "../mock/rankingData";

const ROWS_PER_PAGE = 7;

export default function PredictionsPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [selectedProteinId, setSelectedProteinId] = useState(1);
  const [state, setState] = useState("idle");
  const [ranking, setRanking] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const nameColor = isDark ? "#FFFFFF" : "#0A0F24";
  const labelColor = isDark ? "#9CA3B4" : "#4A5170";
  const helperColor = isDark ? "#7A8494" : "#6B7692";
  const accentCyan = isDark ? "#22D3E6" : "#0A7C85";
  const cardBg = isDark ? "#14171C" : "#FFFFFF";
  const cardBorder = isDark
    ? "rgba(255, 255, 255, 0.08)"
    : "rgba(14, 19, 48, 0.08)";

  const selectedProtein = MOCK_PROTEINS.find(
    (p) => p.id === selectedProteinId
  );

  const handlePredict = () => {
    setState("loading");
    setCurrentPage(1);
  };

  const handlePredictionComplete = () => {
    const data =
      MOCK_RANKINGS[selectedProteinId] ||
      generateMockRanking(selectedProteinId);
    setRanking(data);
    setCurrentPage(1);
    setState("ready");
  };

  const top3 = ranking.slice(0, 3);
  const restOfRanking = ranking.slice(3);

  const totalPages = Math.max(
    1,
    Math.ceil(restOfRanking.length / ROWS_PER_PAGE)
  );
  const pageStart = (currentPage - 1) * ROWS_PER_PAGE;
  const pageItems = restOfRanking.slice(pageStart, pageStart + ROWS_PER_PAGE);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <h1
          className="text-[32px] font-bold leading-none tracking-[-0.03em]"
          style={{ color: "var(--text-primary)" }}
        >
          Predicciones de afinidad
        </h1>
        <p className="mt-2 text-[14px]" style={{ color: "var(--text-secondary)" }}>
          Elige una proteína y obtén el ranking de moléculas candidatas
          ordenadas por afinidad predicha.
        </p>
      </motion.div>

      {/* Selector + botón */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
        className="rounded-2xl p-5"
        style={{ background: cardBg, border: `1px solid ${cardBorder}` }}
      >
        <label
          className="mb-2 block text-[10.5px] font-bold uppercase tracking-[0.14em]"
          style={{ color: labelColor }}
        >
          Proteína objetivo
        </label>

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-6">
          <div className="flex-1">
            <ProteinSelector
              proteins={MOCK_PROTEINS}
              selectedId={selectedProteinId}
              onSelect={(id) => {
                setSelectedProteinId(id);
                setState("idle");
                setRanking([]);
                setCurrentPage(1);
              }}
            />
          </div>

          <div className="shrink-0">
            {/* Botón más delgado: h-10 en lugar de h-11 */}
            <button
              type="button"
              onClick={handlePredict}
              disabled={state === "loading"}
              className="group inline-flex h-10 w-full items-center justify-center gap-2 whitespace-nowrap rounded-lg px-5 text-[13px] font-semibold transition-all hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60 lg:w-50"
              style={{
                background: "var(--accent)",
                color: "var(--text-on-accent)",
              }}
            >
              <Sparkles size={14} strokeWidth={2.4} className="shrink-0" />
              <span className="shrink-0">
                {state === "ready" ? "Recalcular" : "Calcular ranking"}
              </span>
              <ArrowRight
                size={13}
                strokeWidth={2.4}
                className="shrink-0 transition-transform group-hover:translate-x-0.5"
              />
            </button>
          </div>
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        {state === "idle" && (
          <motion.div
            key="idle"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4 }}
            className="rounded-2xl p-12 text-center"
            style={{ background: cardBg, border: `1px solid ${cardBorder}` }}
          >
            <div
              className="mx-auto flex h-14 w-14 items-center justify-center rounded-full"
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
              <BarChart3 size={22} strokeWidth={2} style={{ color: accentCyan }} />
            </div>
            <h2
              className="mt-5 text-[18px] font-bold tracking-[-0.01em]"
              style={{ color: nameColor }}
            >
              Sin predicciones todavía
            </h2>
            <p
              className="mx-auto mt-2 max-w-md text-[13px] leading-relaxed"
              style={{ color: labelColor }}
            >
              Selecciona una proteína objetivo y presiona{" "}
              <span style={{ color: nameColor, fontWeight: 600 }}>
                Calcular ranking
              </span>{" "}
              para obtener el listado de moléculas ordenadas por afinidad.
            </p>
          </motion.div>
        )}

        {state === "loading" && (
          <PredictionLoading
            key="loading"
            onComplete={handlePredictionComplete}
          />
        )}

        {state === "ready" && ranking.length > 0 && (
          <motion.div
            key="ready"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            <div
              className="flex flex-wrap items-center justify-between gap-4 rounded-2xl px-5 py-4"
              style={{ background: cardBg, border: `1px solid ${cardBorder}` }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="flex h-8 w-8 items-center justify-center rounded-lg"
                  style={{
                    background: isDark
                      ? "rgba(34, 211, 230, 0.10)"
                      : "rgba(10, 124, 133, 0.08)",
                  }}
                >
                  <TrendingUp
                    size={14}
                    strokeWidth={2.2}
                    style={{ color: accentCyan }}
                  />
                </div>
                <div>
                  <p
                    className="text-[12.5px] font-semibold"
                    style={{ color: nameColor }}
                  >
                    {selectedProtein.name}
                  </p>
                  <p
                    className="mt-0.5 font-mono text-[10.5px]"
                    style={{ color: helperColor }}
                  >
                    {ranking.length} moléculas evaluadas
                  </p>
                </div>
              </div>

              <span
                className="font-mono text-[11px] tabular-nums tracking-wider"
                style={{ color: helperColor }}
              >
                Página {currentPage} de {totalPages}
              </span>
            </div>

            <div>
              <h2
                className="mb-4 text-[14px] font-bold uppercase tracking-[0.14em]"
                style={{ color: labelColor }}
              >
                Top candidatos
              </h2>
              <div className="grid gap-4 lg:grid-cols-3 lg:items-start">
                {top3[1] && (
                  <TopCandidate
                    key={top3[1].molecule_id}
                    rank={2}
                    item={top3[1]}
                    featured={false}
                  />
                )}
                {top3[0] && (
                  <TopCandidate
                    key={top3[0].molecule_id}
                    rank={1}
                    item={top3[0]}
                    featured={true}
                  />
                )}
                {top3[2] && (
                  <TopCandidate
                    key={top3[2].molecule_id}
                    rank={3}
                    item={top3[2]}
                    featured={false}
                  />
                )}
              </div>
            </div>

            {restOfRanking.length > 0 && (
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <h2
                    className="text-[14px] font-bold uppercase tracking-[0.14em]"
                    style={{ color: labelColor }}
                  >
                    Resto del ranking
                  </h2>
                  <span
                    className="font-mono text-[11px] tabular-nums tracking-wider"
                    style={{ color: helperColor }}
                  >
                    {pageStart + 1}–{pageStart + pageItems.length} de{" "}
                    {restOfRanking.length}
                  </span>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={`page-${currentPage}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-2"
                  >
                    {pageItems.map((item, i) => (
                      <RankingRow
                        key={item.molecule_id}
                        rank={pageStart + i + 4}
                        item={item}
                        topPKd={top3[0]?.pKd}
                        index={i}
                      />
                    ))}
                  </motion.div>
                </AnimatePresence>

                {totalPages > 1 && (
                  <div className="mt-6 flex justify-center">
                    <RankingPagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                    />
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}