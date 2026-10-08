import { Link, useParams } from "react-router-dom";
import { motion } from "motion/react";
import {
  ArrowLeft,
  Calendar,
  Trash2,
  FlaskConical,
  ArrowRight,
  Dna,
  Hash,
} from "lucide-react";
import { useTheme } from "../../../providers/ThemeProvider";
import ProteinSequenceViewer from "../components/ProteinSequenceViewer";

const SOFT_EASE = [0.22, 1, 0.36, 1];

const MOCK_PROTEINS = {
  1: {
    id: 1, name: "Hemoglobina", uniprot_id: "P69905",
    created_at: "2025-06-12", length: 142,
    sequence: "MVLSPADKTNVKAAWGKVGAHAGEYGAEALERMFLSFPTTKTYFPHFDLSHGSAQVKGHGKKVADALTNAVAHVDDMPNALSALSDLHAHKLRVDPVNFKLLSHCLLVTLAAHLPAEFTPAVHASLDKFLASVSTVLTSKYR",
  },
  2: {
    id: 2, name: "Lisozima", uniprot_id: "P00698",
    created_at: "2025-06-10", length: 129,
    sequence: "KVFGRCELAAAMKRHGLDNYRGYSLGNWVCAAKFESNFNTQATNRNTDGSTDYGILQINSRWWCNDGRTPGSRNLCNIPCSALLSSDITASVNCAKKIVSDGNGMNAWVAWRNRCKGTDVQAWIRGCRL",
  },
  3: {
    id: 3, name: "Quimotripsina", uniprot_id: "P00766",
    created_at: "2025-06-08", length: 245,
    sequence: "CGVPAIQPVLSGLSRIVNGEEAVPGSWPWQVSLQDKTGFHFCGGSLINENWVVTAAHCGVTTSDVVVAGEFDQGSSSEKIQKLKIAKVFKNSKYNSLTINNDITLLKLSTAASFSQTVSAVCLPSASDDFAAGTTCVTTGWGLTRYTNANTPDRLQQASLPLLSNTNCKKYWGTKIKDAMICAGASGVSSCMGDSGGPLVCKKNGAWTLVGIVSWGSSTCSTSTPGVYARVTALVNWVQQTLAAN",
  },
  4: {
    id: 4, name: "Insulina", uniprot_id: "P01308",
    created_at: "2025-06-05", length: 110,
    sequence: "MALWMRLLPLLALLALWGPDPAAAFVNQHLCGSHLVEALYLVCGERGFFYTPKTRREAEDLQVGQVELGGGPGAGSLQPLALEGSLQKRGIVEQCCTSICSLYQLENYCN",
  },
  5: {
    id: 5, name: "Albúmina sérica", uniprot_id: "P02768",
    created_at: "2025-06-03", length: 609,
    sequence: "MKWVTFISLLFLFSSAYSRGVFRRDAHKSEVAHRFKDLGEENFKALVLIAFAQYLQQCPFEDHVKLVNEVTEFAKTCVADESAENCDKSLHTLFGDKLCTVATLRETYGEMADCCAKQEPERNECFLQHKDDNPNLPRLVRPEVDVMCTAFHDNEETFLKKYLYEIARRHPYFYAPELLFFAKRYKAAFTECCQAADKAACLLPKLDELRDEGKASSAKQRLKCASLQKFGERAFKAWAVARLSQRFPKAEFAEVSKLVTDLTKVHTECCHGDLLECADDRADLAKYICENQDSISSKLKECCEKPLLEKSHCIAEVENDEMPADLPSLAADFVESKDVCKNYAEAKDVFLGMFLYEYARRHPDYSVVLLLRLAKTYETTLEKCCAAADPHECYAKVFDEFKPLVEEPQNLIKQNCELFEQLGEYKFQNALLVRYTKKVPQVSTPTLVEVSRNLGKVGSKCCKHPEAKRMPCAEDYLSVVLNQLCVLHEKTPVSDRVTKCCTESLVNRRPCFSALEVDETYVPKEFNAETFTFHADICTLSEKERQIKKQTALVELVKHKPKATKEQLKAVMDDFAAFVEKCCKADDKETCFAEEGKKLVAASQAALGL",
  },
  6: {
    id: 6, name: "Mioglobina", uniprot_id: "P02185",
    created_at: "2025-06-01", length: 154,
    sequence: "MGLSDGEWQLVLNVWGKVEADIPGHGQEVLIRLFKGHPETLEKFDKFKHLKSEDEMKASEDLKKHGATVLTALGGILKKKGHHEAEIKPLAQSHATKHKIPVKYLEFISECIIQVLQSKHPGDFGADAQGAMNKALELFRKDMASNYKELGFQG",
  },
};

function shortIdFromSeq(seq) {
  if (!seq) return "PROT-—";
  return `PROT-${seq.slice(0, 6)}`;
}

// Calcula el peso molecular aproximado (masa media de aminoácidos en Da)
// Peso medio de un residuo ≈ 110 Da (aproximación estándar para proteínas)
function estimateWeight(seq) {
  if (!seq) return 0;
  return Math.round(seq.length * 110);
}

export default function ProteinDetailPage() {
  const { id } = useParams();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const mock = MOCK_PROTEINS[id];

  const protein = mock ?? {
    id,
    name: null,
    uniprot_id: null,
    created_at: "2025-06-01",
    length: 0,
    sequence: "ACDEFGHIKLMNPQRSTVWY",
  };

  const displayName = protein.name || shortIdFromSeq(protein.sequence);
  const weight = estimateWeight(protein.sequence);

  // Colores de alto contraste
  const nameColor = isDark ? "#FFFFFF" : "#0A0F24";
  const valueColor = isDark ? "#FFFFFF" : "#0A0F24";
  const labelColor = isDark ? "#9CA3B4" : "#4A5170";
  const cardBg = isDark ? "#14171C" : "#FFFFFF";
  const cardBorder = isDark
    ? "rgba(255, 255, 255, 0.08)"
    : "rgba(14, 19, 48, 0.08)";

  const accentViolet = isDark ? "#A78BFA" : "#7C3AED";

  // Pill
  const pillBg = isDark ? "#0F1219" : "#F5F7FA";
  const pillBorder = isDark
    ? "rgba(255, 255, 255, 0.08)"
    : "rgba(14, 19, 48, 0.06)";

  return (
    <div className="space-y-6">
      {/* Volver */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: SOFT_EASE }}
      >
        <Link
          to="/app/proteins"
          className="group inline-flex items-center gap-1.5 text-[12.5px] font-medium transition-opacity hover:opacity-80"
          style={{ color: "var(--accent)" }}
        >
          <ArrowLeft
            size={14}
            strokeWidth={2.2}
            className="transition-transform group-hover:-translate-x-0.5"
          />
          Volver a proteínas
        </Link>
      </motion.div>

      {/* Header — título + acciones */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.04, ease: SOFT_EASE }}
        className="flex flex-wrap items-end justify-between gap-6"
      >
        <div>
          <h1
            className="text-[36px] font-bold leading-none tracking-[-0.03em] sm:text-[40px]"
            style={{ color: nameColor }}
          >
            {displayName}
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-3">
            <span
              className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-[10.5px] font-medium uppercase tracking-wider"
              style={{
                background: isDark
                  ? "rgba(167, 139, 250, 0.12)"
                  : "rgba(124, 58, 237, 0.10)",
                color: accentViolet,
                border: `1px solid ${
                  isDark
                    ? "rgba(167, 139, 250, 0.22)"
                    : "rgba(124, 58, 237, 0.20)"
                }`,
              }}
            >
              <Dna size={10} strokeWidth={2.2} />
              Proteína
            </span>

            {protein.uniprot_id && (
              <>
                <span
                  className="font-mono text-[12.5px]"
                  style={{ color: labelColor }}
                >
                  UniProt {protein.uniprot_id}
                </span>
                <span
                  className="text-[12.5px]"
                  style={{ color: isDark ? "#6B7285" : "#A5AEC4" }}
                >
                  ·
                </span>
              </>
            )}

            <span
              className="font-mono text-[12.5px]"
              style={{ color: labelColor }}
            >
              ID #{protein.id}
            </span>

            <span
              className="text-[12.5px]"
              style={{ color: isDark ? "#6B7285" : "#A5AEC4" }}
            >
              ·
            </span>

            <span
              className="text-[12.5px]"
              style={{ color: labelColor }}
            >
              Registrada el {protein.created_at}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg px-3.5 py-2.5 text-[13px] font-medium transition-colors"
            style={{
              background: "transparent",
              color: isDark ? "#C4C9D4" : "#3F4866",
              border: `1px solid ${
                isDark ? "rgba(255, 255, 255, 0.10)" : "rgba(14, 19, 48, 0.10)"
              }`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = isDark
                ? "rgba(255, 255, 255, 0.05)"
                : "rgba(14, 19, 48, 0.04)";
              e.currentTarget.style.color = nameColor;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = isDark ? "#C4C9D4" : "#3F4866";
            }}
          >
            <Trash2 size={14} strokeWidth={2.2} />
            Eliminar
          </button>

          <Link
            to="/app/predictions"
            className="group inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-[13px] font-medium transition-all hover:opacity-95"
            style={{
              background: "var(--accent)",
              color: "var(--text-on-accent)",
            }}
          >
            <FlaskConical size={14} strokeWidth={2.2} />
            Usar en predicción
            <ArrowRight
              size={13}
              strokeWidth={2.2}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </motion.div>

      {/* Propiedades rápidas */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.08, ease: SOFT_EASE }}
        className="grid gap-3 sm:grid-cols-3"
      >
        <div
          className="rounded-xl px-4 py-3.5"
          style={{ background: cardBg, border: `1px solid ${cardBorder}` }}
        >
          <p
            className="text-[10.5px] font-bold uppercase tracking-[0.14em]"
            style={{ color: labelColor }}
          >
            Longitud
          </p>
          <p
            className="mt-2 font-mono text-[22px] font-bold tabular-nums leading-none"
            style={{ color: valueColor }}
          >
            {protein.length}
          </p>
          <p
            className="mt-1.5 text-[11.5px]"
            style={{ color: isDark ? "#7A8494" : "#6B7692" }}
          >
            residuos
          </p>
        </div>

        <div
          className="rounded-xl px-4 py-3.5"
          style={{ background: cardBg, border: `1px solid ${cardBorder}` }}
        >
          <p
            className="text-[10.5px] font-bold uppercase tracking-[0.14em]"
            style={{ color: labelColor }}
          >
            Peso aprox.
          </p>
          <p
            className="mt-2 font-mono text-[22px] font-bold tabular-nums leading-none"
            style={{ color: valueColor }}
          >
            {weight >= 1000 ? `${(weight / 1000).toFixed(1)}k` : weight}
          </p>
          <p
            className="mt-1.5 text-[11.5px]"
            style={{ color: isDark ? "#7A8494" : "#6B7692" }}
          >
            daltons
          </p>
        </div>

        <div
          className="rounded-xl px-4 py-3.5"
          style={{ background: cardBg, border: `1px solid ${cardBorder}` }}
        >
          <p
            className="text-[10.5px] font-bold uppercase tracking-[0.14em]"
            style={{ color: labelColor }}
          >
            UniProt
          </p>
          <p
            className="mt-2 font-mono text-[16px] font-bold leading-none"
            style={{ color: valueColor }}
          >
            {protein.uniprot_id || "—"}
          </p>
          <p
            className="mt-1.5 text-[11.5px]"
            style={{ color: isDark ? "#7A8494" : "#6B7692" }}
          >
            identificador
          </p>
        </div>
      </motion.div>

      {/* Secuencia */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.12, ease: SOFT_EASE }}
        className="rounded-2xl p-6"
        style={{ background: cardBg, border: `1px solid ${cardBorder}` }}
      >
        <div className="mb-4 flex items-center gap-2">
          <Hash
            size={13}
            strokeWidth={2}
            style={{ color: labelColor }}
          />
          <h2
            className="text-[11px] font-bold uppercase tracking-[0.14em]"
            style={{ color: labelColor }}
          >
            Secuencia de aminoácidos
          </h2>
        </div>

        <ProteinSequenceViewer sequence={protein.sequence} />
      </motion.div>
    </div>
  );
}