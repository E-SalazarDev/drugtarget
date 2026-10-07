/**
 * Mock data para Predicciones.
 *
 * Simula el response de:
 *  - GET /predictions/ranking?protein_id=X
 *
 * Forma esperada:
 *   {
 *     protein_id: number,
 *     ranking: [
 *       { molecule_id, molecule_name, smiles, formula, pKd }
 *     ]
 *   }
 */

export const MOCK_PROTEINS = [
  {
    id: 1,
    name: "EGFR — Epidermal Growth Factor Receptor",
    uniprot_id: "P00533",
    sequence_length: 1210,
  },
  {
    id: 2,
    name: "Hemoglobina",
    uniprot_id: "P69905",
    sequence_length: 142,
  },
  {
    id: 3,
    name: "Lisozima",
    uniprot_id: "P00698",
    sequence_length: 129,
  },
  {
    id: 4,
    name: "Quimotripsina",
    uniprot_id: "P00766",
    sequence_length: 245,
  },
  {
    id: 5,
    name: "Insulina",
    uniprot_id: "P01308",
    sequence_length: 110,
  },
];

// Lista de moléculas conocidas para el mock (farmacéuticas + compuestos comunes)
const DRUG_POOL = [
  { name: "Imatinib", smiles: "CC1=C(C(=CC=C1)NC(=O)C2=CN=CN2C3=CC=CC=C3)C", formula: "C29H31N7O" },
  { name: "Dasatinib", smiles: "CC1=C(C(=CC=C1)NC(=O)C2=CN=C(S2)N3CCN(CC3)CCO)C", formula: "C22H26ClN7O2S" },
  { name: "Nilotinib", smiles: "CC1=C(C(=CC=C1)NC(=O)C2=CC(=NC=C2)C3=CN=CC=C3)C", formula: "C28H22F3N7O" },
  { name: "Erlotinib", smiles: "COCCOC1=C(C=C2C(=C1)C(=NC=N2)NC3=CC=CC(=C3)C#C)OCCOC", formula: "C22H23N3O4" },
  { name: "Gefitinib", smiles: "COC1=C(C=C2C(=C1)N=CN=C2NC3=CC(=C(C=C3)F)Cl)OCCCN4CCOCC4", formula: "C22H24ClFN4O3" },
  { name: "Lapatinib", smiles: "CS(=O)(=O)CCNCC1=CC=C(O1)C2=CC3=C(C=C2)N=CN=C3NC4=CC(=C(C=C4)OCC5=CC=CC=C5)Cl", formula: "C29H26ClFN4O4S" },
  { name: "Sorafenib", smiles: "CNC(=O)C1=CC(=CC=C1)OC2=CC=C(C=C2)NC(=O)NC3=CC(=C(C=C3)Cl)C(F)(F)F", formula: "C21H16ClF3N4O3" },
  { name: "Sunitinib", smiles: "CCN(CC)CCNC(=O)C1=C(NC(=C1C)C=C2C3=C(C=CC(=C3)F)NC2=O)C", formula: "C22H27FN4O2" },
  { name: "Vandetanib", smiles: "COC1=CC2=C(C=C1N3CCC(CC3)N(C)C)N=CN=C2NC4=CC=C(C=C4)Br", formula: "C22H24BrFN4O2" },
  { name: "Pazopanib", smiles: "CN1C=NC2=C1C=C(C=C2)NC3=CC=CC(=C3)NC4=NC=CC(=N4)N(C)C", formula: "C21H23N7O2S" },
  { name: "Cabozantinib", smiles: "COC1=CC2=C(C=C1OC3=CC=C(C=C3)F)NC=CC2=O", formula: "C28H24FN3O5" },
  { name: "Axitinib", smiles: "CNC(=O)C1=CC=CC=C1SC2=CC=CC=C2NC3=NC=CC(=N3)C=C", formula: "C22H18N4OS" },
  { name: "Aspirina", smiles: "CC(=O)Oc1ccccc1C(=O)O", formula: "C9H8O4" },
  { name: "Ibuprofeno", smiles: "CC(C)Cc1ccc(cc1)C(C)C(=O)O", formula: "C13H18O2" },
  { name: "Cafeína", smiles: "CN1C=NC2=C1C(=O)N(C(=O)N2C)C", formula: "C8H10N4O2" },
  { name: "Paracetamol", smiles: "CC(=O)Nc1ccc(O)cc1", formula: "C8H9NO2" },
  { name: "Metformina", smiles: "CN(C)C(=N)NC(=N)N", formula: "C4H11N5" },
  { name: "Etanol", smiles: "CCO", formula: "C2H6O" },
  { name: "Capsaicina", smiles: "COC1=CC(CNC(=O)CCCC/C=C/C(C)C)=CC=C1O", formula: "C18H27NO3" },
  { name: "Naproxeno", smiles: "COc1ccc2cc(ccc2c1)C(C)C(=O)O", formula: "C14H14O3" },
];

/**
 * Genera un ranking mock con la cantidad de candidatos que queramos.
 * Los primeros 3 tienen pKd altos y van decreciendo gradualmente.
 */
function buildRanking(proteinId, count = 68) {
  const seed = proteinId * 7;
  const ranking = [];

  for (let i = 0; i < count; i++) {
    // Tomamos moléculas cíclicamente del pool
    const base = DRUG_POOL[i % DRUG_POOL.length];

    // pKd decreciente: el top empieza en ~8.4 y baja gradualmente
    // Variación pseudo-aleatoria determinística por seed
    const pseudo = ((seed + i * 13) % 100) / 100;
    const decay = Math.pow(i / count, 0.85); // cae suave al principio, luego rápido
    const pKd = Math.round((8.9 - decay * 3.5 + pseudo * 0.4) * 100) / 100;

    // Nombre único si se repite la molécula base
    const suffix = i >= DRUG_POOL.length ? ` v${Math.floor(i / DRUG_POOL.length) + 1}` : "";

    ranking.push({
      molecule_id: i + 1,
      molecule_name: `${base.name}${suffix}`,
      smiles: base.smiles,
      formula: base.formula,
      pKd: Math.max(5.0, pKd),
    });
  }

  // Ordenar descendente por pKd
  return ranking.sort((a, b) => b.pKd - a.pKd);
}

export const MOCK_RANKINGS = {
  1: buildRanking(1, 68),
  2: buildRanking(2, 24),
  3: buildRanking(3, 32),
  4: buildRanking(4, 18),
  5: buildRanking(5, 40),
};

export function generateMockRanking(proteinId, _molecules) {
  return buildRanking(proteinId, 68);
}

export const PKd_MIN = 5.0;
export const PKd_MAX = 11.0;