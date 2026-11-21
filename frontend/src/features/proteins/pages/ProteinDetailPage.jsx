import { Link, useParams } from "react-router-dom";
import { motion } from "motion/react";
import {
  ArrowLeft,
  Trash2,
  FlaskConical,
  ArrowRight,
  Dna,
  Hash,
} from "lucide-react";
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

const cardStyle = {
  background: "var(--card-bg)",
  border: "1px solid var(--card-border)",
  boxShadow: "var(--shadow-md)",
};

const backLinkStyle = {
  color: "var(--link)",
  border: "1px solid var(--icon-box-border)",
  background: "var(--icon-box-bg)",
};

function shortIdFromSeq(seq) {
  if (!seq) return "PROT-—";
  return `PROT-${seq.slice(0, 6)}`;
}

// Peso molecular aproximado (≈ 110 Da por residuo)
function estimateWeight(seq) {
  if (!seq) return 0;
  return Math.round(seq.length * 110);
}

function StatCard({ label, value, note, dot, mono16 = false }) {
  return (
    <div className="rounded-xl px-5 py-4" style={cardStyle}>
      <p
        className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em]"
        style={{ color: "var(--text-secondary)" }}
      >
        <span
          className="inline-block h-1.5 w-1.5 rounded-full"
          style={{ background: dot }}
        />
        {label}
      </p>
      <p
        className={`mt-2.5 font-mono font-bold tabular-nums leading-none ${
          mono16 ? "text-[18px]" : "text-[24px]"
        }`}
        style={{ color: "var(--text-primary)" }}
      >
        {value}
      </p>
      <p
        className="mt-2 text-[12px]"
        style={{ color: "var(--text-secondary)" }}
      >
        {note}
      </p>
    </div>
  );
}

export default function ProteinDetailPage() {
  const { id } = useParams();
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
          className="group inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12.5px] font-semibold transition-colors hover:bg-(--hover-overlay)"
          style={backLinkStyle}
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
            style={{ color: "var(--text-primary)" }}
          >
            {displayName}
          </h1>

          <div className="mt-3.5 flex flex-wrap items-center gap-3">
            <span
              className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider"
              style={{
                background: "var(--chip-pink-bg)",
                color: "var(--chip-text)",
              }}
            >
              <Dna size={11} strokeWidth={2.4} />
              Proteína
            </span>

            {protein.uniprot_id && (
              <>
                <span
                  className="font-mono text-[13px] font-semibold"
                  style={{ color: "var(--text-primary)" }}
                >
                  UniProt {protein.uniprot_id}
                </span>
                <span
                  className="text-[13px]"
                  style={{ color: "var(--text-quaternary)" }}
                >
                  ·
                </span>
              </>
            )}

            <span
              className="font-mono text-[13px]"
              style={{ color: "var(--text-secondary)" }}
            >
              ID #{protein.id}
            </span>

            <span
              className="text-[13px]"
              style={{ color: "var(--text-quaternary)" }}
            >
              ·
            </span>

            <span
              className="text-[13px]"
              style={{ color: "var(--text-secondary)" }}
            >
              Registrada el {protein.created_at}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg px-3.5 py-2.5 text-[13px] font-semibold transition-colors"
            style={{
              background: "transparent",
              color: "var(--text-primary)",
              border: "1px solid var(--border-medium)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--accent-danger-soft)";
              e.currentTarget.style.color = "var(--accent-danger)";
              e.currentTarget.style.borderColor = "var(--accent-danger)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "var(--text-primary)";
              e.currentTarget.style.borderColor = "var(--border-medium)";
            }}
          >
            <Trash2 size={14} strokeWidth={2.2} />
            Eliminar
          </button>

          <Link
            to="/app/predictions"
            className="group inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-[13px] font-semibold transition-all hover:opacity-95"
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
        <StatCard
          label="Longitud"
          value={protein.length}
          note="residuos"
          dot="var(--chip-pink-bg)"
        />
        <StatCard
          label="Peso aprox."
          value={weight >= 1000 ? `${(weight / 1000).toFixed(1)}k` : weight}
          note="daltons"
          dot="var(--chip-lilac-bg)"
        />
        <StatCard
          label="UniProt"
          value={protein.uniprot_id || "—"}
          note="identificador"
          dot="var(--chip-lime-bg)"
          mono16
        />
      </motion.div>

      {/* Secuencia */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.12, ease: SOFT_EASE }}
        className="rounded-2xl p-6"
        style={cardStyle}
      >
        <div className="mb-4 flex items-center gap-2.5">
          <span
            className="flex h-6 w-6 items-center justify-center rounded-md"
            style={{ background: "var(--chip-pink-bg)" }}
          >
            <Hash size={13} strokeWidth={2.4} style={{ color: "var(--chip-text)" }} />
          </span>
          <h2
            className="text-[11.5px] font-bold uppercase tracking-[0.14em]"
            style={{ color: "var(--text-secondary)" }}
          >
            Secuencia de aminoácidos
          </h2>
        </div>

        <ProteinSequenceViewer sequence={protein.sequence} />
      </motion.div>
    </div>
  );
}