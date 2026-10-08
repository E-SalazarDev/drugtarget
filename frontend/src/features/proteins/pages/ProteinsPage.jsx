import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Plus, Search, ArrowUpRight, X } from "lucide-react";
import { useTheme } from "../../../providers/ThemeProvider";

const SOFT_EASE = [0.22, 1, 0.36, 1];

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
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const proteins = MOCK_PROTEINS;

  const filtered = proteins.filter((p) => {
    const q = query.toLowerCase();
    return (
      (p.name || "").toLowerCase().includes(q) ||
      (p.uniprot_id || "").toLowerCase().includes(q) ||
      p.sequence.toLowerCase().includes(q)
    );
  });

  const nameColor = isDark ? "#FFFFFF" : "#0A0F24";
  const valueColor = isDark ? "#FFFFFF" : "#0A0F24";
  const monoColor = isDark ? "#B8BFCE" : "#2E3550";
  const labelColor = isDark ? "#9CA3B4" : "#4A5170";

  const cardBg = isDark ? "#14171C" : "#FFFFFF";
  const cardBorder = isDark
    ? "rgba(255, 255, 255, 0.08)"
    : "rgba(14, 19, 48, 0.10)";
  const cardHoverBg = isDark ? "#1A1E24" : "#FAFBFC";
  const cardHoverBorder = isDark
    ? "rgba(167, 139, 250, 0.35)"
    : "rgba(124, 58, 237, 0.35)";

  const accentViolet = isDark ? "#A78BFA" : "#7C3AED";
  const accentColor = "var(--accent)";

  const badgeBg = isDark
    ? "rgba(167, 139, 250, 0.15)"
    : "rgba(124, 58, 237, 0.10)";
  const badgeColor = isDark ? "#C4B5FD" : "#5B21B6";
  const badgeBorder = isDark
    ? "rgba(167, 139, 250, 0.30)"
    : "rgba(124, 58, 237, 0.25)";

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

      {/* Search + contador */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05, ease: SOFT_EASE }}
        className="flex flex-col gap-3 sm:flex-row sm:items-center"
      >
        <div className="relative flex-1">
          <Search
            size={15}
            strokeWidth={2.2}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2"
            style={{ color: labelColor }}
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por nombre, UniProt ID o secuencia…"
            className="w-full rounded-lg py-2.5 pl-10 pr-10 text-[13.5px] outline-none transition-colors"
            style={{
              background: cardBg,
              border: `1px solid ${cardBorder}`,
              color: nameColor,
            }}
            onFocus={(e) => {
              e.target.style.borderColor = accentViolet;
              e.target.style.boxShadow = `0 0 0 3px ${
                isDark ? "rgba(167, 139, 250, 0.12)" : "rgba(124, 58, 237, 0.10)"
              }`;
            }}
            onBlur={(e) => {
              e.target.style.borderColor = cardBorder;
              e.target.style.boxShadow = "none";
            }}
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 transition-colors"
              style={{ color: labelColor }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = nameColor;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = labelColor;
              }}
            >
              <X size={13} strokeWidth={2.2} />
            </button>
          )}
        </div>

        <span
          className="shrink-0 font-mono text-[12px] tabular-nums tracking-wider"
          style={{ color: valueColor, fontWeight: 600 }}
        >
          {filtered.length.toString().padStart(2, "0")} /{" "}
          {proteins.length.toString().padStart(2, "0")}
        </span>
      </motion.div>

      {/* Lista */}
      {filtered.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1, ease: SOFT_EASE }}
          className="rounded-2xl px-6 py-16 text-center"
          style={{ background: cardBg, border: `1px solid ${cardBorder}` }}
        >
          <p className="text-[14px] font-medium" style={{ color: nameColor }}>
            {query
              ? "Sin resultados para esa búsqueda"
              : "Todavía no hay proteínas registradas"}
          </p>
        </motion.div>
      ) : (
        <div className="space-y-2">
          {filtered.map((p, i) => {
            const isHovered = hoveredId === p.id;

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
                  className="group relative flex items-center gap-5 rounded-xl px-5 py-4 transition-all duration-200"
                  style={{
                    background: isHovered ? cardHoverBg : cardBg,
                    border: `1px solid ${
                      isHovered ? cardHoverBorder : cardBorder
                    }`,
                  }}
                >
                  <motion.span
                    className="absolute left-0 top-1/2 -translate-y-1/2 rounded-r-full"
                    style={{
                      width: 3,
                      height: "60%",
                      background: accentViolet,
                    }}
                    initial={false}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.15 }}
                  />

                  <div className="flex min-w-0 flex-1 flex-col gap-2">
                    <div className="flex items-center gap-2.5">
                      <span
                        className="truncate text-[15px] font-bold"
                        style={{ color: nameColor, letterSpacing: "-0.01em" }}
                      >
                        {p.name || "Sin nombre"}
                      </span>
                      {p.uniprot_id && (
                        <span
                          className="shrink-0 rounded-md px-2 py-0.5 font-mono text-[10.5px] font-bold tracking-wide"
                          style={{
                            background: badgeBg,
                            color: badgeColor,
                            border: `1px solid ${badgeBorder}`,
                          }}
                        >
                          {p.uniprot_id}
                        </span>
                      )}
                    </div>
                    <span
                      className="truncate font-mono text-[11.5px] tracking-tight"
                      style={{ color: monoColor, fontWeight: 500 }}
                    >
                      {p.sequence.slice(0, 60)}
                      {p.sequence.length > 60 ? "…" : ""}
                    </span>
                  </div>

                  <div className="hidden shrink-0 flex-col items-end gap-1 sm:flex">
                    <span
                      className="font-mono text-[15px] tabular-nums"
                      style={{
                        color: valueColor,
                        fontWeight: 700,
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {p.length}
                    </span>
                    <span
                      className="text-[10px] font-bold uppercase tracking-[0.12em]"
                      style={{ color: labelColor }}
                    >
                      residuos
                    </span>
                  </div>

                  <div className="hidden shrink-0 flex-col items-end gap-1 md:flex">
                    <span
                      className="font-mono text-[13px] tabular-nums"
                      style={{ color: valueColor, fontWeight: 600 }}
                    >
                      {p.created_at}
                    </span>
                    <span
                      className="text-[10px] font-bold uppercase tracking-[0.12em]"
                      style={{ color: labelColor }}
                    >
                      Registrada
                    </span>
                  </div>

                  <motion.div
                    className="shrink-0"
                    animate={{
                      x: isHovered ? 2 : 0,
                      opacity: isHovered ? 1 : 0.6,
                    }}
                    transition={{ duration: 0.15 }}
                  >
                    <ArrowUpRight
                      size={16}
                      strokeWidth={2.4}
                      style={{
                        color: isHovered ? accentViolet : labelColor,
                      }}
                    />
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}