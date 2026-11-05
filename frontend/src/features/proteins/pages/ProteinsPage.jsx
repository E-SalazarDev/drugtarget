import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Plus, Search, ArrowUpRight, X, Dna } from "lucide-react";

const SOFT_EASE = [0.22, 1, 0.36, 1];

// Columnas de la lista (la secuencia ocupa el centro)
const COLS =
  "lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.6fr)_150px_120px_32px]";

const PINK_GRADIENT = "linear-gradient(135deg, #FF7FB0 0%, #E8458A 100%)";

const MOCK_PROTEINS = [
  { id: 1, name: "Hemoglobina", uniprot_id: "P69905", length: 142, created_at: "2025-06-12", sequence: "MVLSPADKTNVKAAWGKVGAHAGEYGAEALERMFLSFPTTKTYFPHFDLSHGSAQVKGHGKKVADALTNAVAHVDDMPNALSALSDLHAHKLRVDPVNFKLLSHCLLVTLAAHLPAEFTPAVHASLDKFLASVSTVLTSKYR" },
  { id: 2, name: "Lisozima", uniprot_id: "P00698", length: 129, created_at: "2025-06-10", sequence: "KVFGRCELAAAMKRHGLDNYRGYSLGNWVCAAKFESNFNTQATNRNTDGSTDYGILQINSRWWCNDGRTPGSRNLCNIPCSALLSSDITASVNCAKKIVSDGNGMNAWVAWRNRCKGTDVQAWIRGCRL" },
  { id: 3, name: "Quimotripsina", uniprot_id: "P00766", length: 245, created_at: "2025-06-08", sequence: "CGVPAIQPVLSGLSRIVNGEEAVPGSWPWQVSLQDKTGFHFCGGSLINENWVVTAAHCGVTTSDVVVAGEFDQGSSSEKIQKLKIAKVFKNSKYNSLTINNDITLLKLSTAASFSQTVSAVCLPSASDDFAAGTTCVTTGWGLTRYTNANTPDRLQQASLPLLSNTNCKKYWGTKIKDAMICAGASGVSSCMGDSGGPLVCKKNGAWTLVGIVSWGSSTCSTSTPGVYARVTALVNWVQQTLAAN" },
  { id: 4, name: "Insulina", uniprot_id: "P01308", length: 110, created_at: "2025-06-05", sequence: "MALWMRLLPLLALLALWGPDPAAAFVNQHLCGSHLVEALYLVCGERGFFYTPKTRREAEDLQVGQVELGGGPGAGSLQPLALEGSLQKRGIVEQCCTSICSLYQLENYCN" },
  { id: 5, name: "Albúmina sérica", uniprot_id: "P02768", length: 609, created_at: "2025-06-03", sequence: "MKWVTFISLLFLFSSAYSRGVFRRDAHKSEVAHRFKDLGEENFKALVLIAFAQYLQQCPFEDHVKLVNEVTEFAKTCVADESAENCDKSLHTLFGDKLCTVATLRETYGEMADCCAKQEPERNECFLQHKDDNPNLPRLVRPEVDVMCTAFHDNEETFLKKYLYEIARRHPYFYAPELLFFAKRYKAAFTECCQAADKAACLLPKLDELRDEGKASSAKQRLKCASLQKFGERAFKAWAVARLSQRFPKAEFAEVSKLVTDLTKVHTECCHGDLLECADDRADLAKYICENQDSISSKLKECCEKPLLEKSHCIAEVENDEMPADLPSLAADFVESKDVCKNYAEAKDVFLGMFLYEYARRHPDYSVVLLLRLAKTYETTLEKCCAAADPHECYAKVFDEFKPLVEEPQNLIKQNCELFEQLGEYKFQNALLVRYTKKVPQVSTPTLVEVSRNLGKVGSKCCKHPEAKRMPCAEDYLSVVLNQLCVLHEKTPVSDRVTKCCTESLVNRRPCFSALEVDETYVPKEFNAETFTFHADICTLSEKERQIKKQTALVELVKHKPKATKEQLKAVMDDFAAFVEKCCKADDKETCFAEEGKKLVAASQAALGL" },
  { id: 6, name: "Mioglobina", uniprot_id: "P02185", length: 154, created_at: "2025-06-01", sequence: "MGLSDGEWQLVLNVWGKVEADIPGHGQEVLIRLFKGHPETLEKFDKFKHLKSEDEMKASEDLKKHGATVLTALGGILKKKGHHEAEIKPLAQSHATKHKIPVKYLEFISECIIQVLQSKHPGDFGADAQGAMNKALELFRKDMASNYKELGFQG" },
];

export default function ProteinsPage() {
  const [query, setQuery] = useState("");
  const [hoveredId, setHoveredId] = useState(null);
  const proteins = MOCK_PROTEINS;

  const maxLength = Math.max(...proteins.map((p) => p.length));

  const filtered = proteins.filter((p) => {
    const q = query.toLowerCase();
    return (
      (p.name || "").toLowerCase().includes(q) ||
      (p.uniprot_id || "").toLowerCase().includes(q) ||
      p.sequence.toLowerCase().includes(q)
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
            Proteínas
          </h1>
          <p
            className="mt-2 text-[14px]"
            style={{ color: "var(--text-secondary)" }}
          >
            Explora y administra las proteínas registradas.
          </p>
        </div>

        <Link
          to="/app/proteins/new"
          className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-[13.5px] font-medium transition-all hover:opacity-95"
          style={{
            background: "var(--accent)",
            color: "var(--text-on-accent)",
          }}
        >
          <Plus size={15} strokeWidth={2.4} />
          Nueva proteína
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
            placeholder="Buscar por nombre, UniProt ID o secuencia…"
            className="w-full rounded-lg py-2.5 pl-10 pr-10 text-[13.5px] outline-none transition-colors"
            style={{
              background: "var(--card-bg)",
              border: "1px solid var(--card-border)",
              color: "var(--text-primary)",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "var(--accent-violet)";
              e.target.style.boxShadow = "0 0 0 3px var(--accent-violet-soft)";
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

        {/* Ej.: "6 de 6 proteínas" = mostradas / total */}
        <span
          className="shrink-0 rounded-full px-3.5 py-2 text-[12.5px] font-semibold tabular-nums"
          style={{
            color: "var(--text-primary)",
            background: "var(--icon-box-bg)",
            border: "1px solid var(--icon-box-border)",
          }}
        >
          {filtered.length} de {proteins.length} proteínas
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
              : "Todavía no hay proteínas registradas"}
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
            <span>Proteína</span>
            <span>Secuencia</span>
            <span>Longitud</span>
            <span>Registrada</span>
            <span />
          </div>

          {filtered.map((p, i) => {
            const isHovered = hoveredId === p.id;
            const pct = Math.round((p.length / maxLength) * 100);

            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: Math.min(i * 0.03, 0.25),
                  ease: SOFT_EASE,
                }}
              >
                <Link
                  to={`/app/proteins/${p.id}`}
                  onMouseEnter={() => setHoveredId(p.id)}
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
                      background: "var(--chip-pink-bg)",
                    }}
                    initial={false}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.15 }}
                  />

                  {/* Proteína: icono + nombre + UniProt */}
                  <div className="flex min-w-0 items-center gap-3.5">
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                      style={{ background: PINK_GRADIENT }}
                    >
                      <Dna size={18} strokeWidth={2.2} color="#FFFFFF" />
                    </div>
                    <div className="flex min-w-0 flex-col gap-1.5">
                      <span
                        className="truncate text-[15px] font-bold"
                        style={{
                          color: "var(--text-primary)",
                          letterSpacing: "-0.01em",
                        }}
                      >
                        {p.name || "Sin nombre"}
                      </span>
                      {p.uniprot_id && (
                        <span
                          className="w-fit rounded-md px-2 py-0.5 font-mono text-[11px] font-bold tracking-wide"
                          style={{
                            background: "var(--chip-pink-bg)",
                            color: "var(--chip-text)",
                          }}
                        >
                          {p.uniprot_id}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Secuencia (centro) */}
                  <div
                    className="min-w-0 truncate rounded-lg px-3 py-2 font-mono text-[12.5px] tracking-tight"
                    title={p.sequence}
                    style={{
                      color: "var(--text-primary)",
                      background: "var(--icon-box-bg)",
                      border: "1px solid var(--row-border)",
                    }}
                  >
                    {p.sequence}
                  </div>

                  {/* Longitud + fecha (en pantallas chicas van en una fila) */}
                  <div className="flex items-center gap-8 lg:contents">
                    <div className="flex min-w-32.5 flex-col gap-1.5">
                      <div className="flex items-baseline gap-1.5">
                        <span
                          className="font-mono text-[16px] font-bold tabular-nums"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {p.length}
                        </span>
                        <span
                          className="text-[11px] font-semibold"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          residuos
                        </span>
                      </div>
                      <div
                        className="h-1.5 w-full overflow-hidden rounded-full"
                        style={{ background: "var(--bar-track)" }}
                      >
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${pct}%`, background: PINK_GRADIENT }}
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
                        {p.created_at}
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