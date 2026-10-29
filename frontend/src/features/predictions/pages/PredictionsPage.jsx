import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, TrendingUp, BarChart3, ArrowRight } from "lucide-react";
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

const cardStyle = {
  background: "var(--card-bg)",
  border: "1px solid var(--card-border)",
  boxShadow: "var(--shadow-sm)",
};

const sectionTitle =
  "text-[13px] font-bold uppercase tracking-[0.14em]";

export default function PredictionsPage() {
  const [selectedProteinId, setSelectedProteinId] = useState(1);
  const [state, setState] = useState("idle");
  const [ranking, setRanking] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

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
        style={cardStyle}
      >
        <label
          className="mb-2.5 block text-[11.5px] font-bold uppercase tracking-[0.14em]"
          style={{ color: "var(--text-secondary)" }}
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
            <button
              type="button"
              onClick={handlePredict}
              disabled={state === "loading"}
              className="group inline-flex h-11 w-full items-center justify-center gap-2 whitespace-nowrap rounded-lg px-5 text-[13px] font-semibold transition-all hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60 lg:w-52"
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
            style={cardStyle}
          >
            <div
              className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl"
              style={{
                background: "linear-gradient(135deg, #9B82FF 0%, #6D4AF2 100%)",
              }}
            >
              <BarChart3 size={22} strokeWidth={2.2} color="#FFFFFF" />
            </div>
            <h2
              className="mt-5 text-[18px] font-bold tracking-[-0.01em]"
              style={{ color: "var(--text-primary)" }}
            >
              Sin predicciones todavía
            </h2>
            <p
              className="mx-auto mt-2 max-w-md text-[13.5px] leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              Selecciona una proteína objetivo y presiona{" "}
              <span style={{ color: "var(--text-primary)", fontWeight: 700 }}>
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
              style={cardStyle}
            >
              <div className="flex items-center gap-3">
                <div
                  className="flex h-9 w-9 items-center justify-center rounded-lg"
                  style={{ background: "var(--chip-lilac-bg)" }}
                >
                  <TrendingUp
                    size={16}
                    strokeWidth={2.4}
                    style={{ color: "var(--chip-text)" }}
                  />
                </div>
                <div>
                  <p
                    className="text-[14px] font-bold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {selectedProtein.name}
                  </p>
                  <p
                    className="mt-0.5 font-mono text-[12px]"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {ranking.length} moléculas evaluadas
                  </p>
                </div>
              </div>

              <span
                className="rounded-full px-3 py-1.5 font-mono text-[12px] font-semibold tabular-nums"
                style={{
                  color: "var(--text-primary)",
                  background: "var(--icon-box-bg)",
                  border: "1px solid var(--icon-box-border)",
                }}
              >
                Página {currentPage} de {totalPages}
              </span>
            </div>

            <div>
              <h2
                className={`mb-5 ${sectionTitle}`}
                style={{ color: "var(--text-secondary)" }}
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
                    className={sectionTitle}
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Resto del ranking
                  </h2>
                  <span
                    className="font-mono text-[12px] font-semibold tabular-nums tracking-wider"
                    style={{ color: "var(--text-secondary)" }}
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