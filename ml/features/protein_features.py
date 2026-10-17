from rdkit import Chem
from rdkit.Chem import AllChem
from rdkit import DataStructs
import numpy as np

def smiles_to_morgan(smiles):
    
    radius = 2
    n_bits = 1021
    
    mol = Chem.MolFromSmiles(smiles)
    fb = AllChem.GetMorganFingerprintAsBitVect(
        mol,
        radius= radius,
        nBits=n_bits
    )
    
    vector_numpy= np.zeros((n_bits), dtype=np.int32)
    DataStructs.ConvertToNumpyArray(fb, vector_numpy)
    
    return vector_numpy
    
