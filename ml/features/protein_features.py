import numpy as np
from rdkit import Chem, DataStructs
from rdkit.Chem import AllChem

def smiles_to_morgan(smiles: str, radius: int = 2, n_bits: int = 2048) -> np.ndarray:
    mol = Chem.MolFromSmiles(smiles)
    if mol is None:
        raise ValueError(f"SMILES inválido: {smiles}")

    fingerprint = AllChem.GetMorganFingerprintAsBitVect(mol, radius=radius, nBits=n_bits)

    vector = np.zeros((n_bits,), dtype=np.int32)
    DataStructs.ConvertToNumpyArray(fingerprint, vector)
    return vector