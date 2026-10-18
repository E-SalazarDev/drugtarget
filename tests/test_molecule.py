import pytest
from app.domain.molecule import Molecule, InvalidMoleculeError

def test_molecule_valida_se_crea():
    mol = Molecule(smiles="CC(=O)O", name="acido acetico")
    assert mol.smiles == "CC(=O)O"

def test_molecule_vacia_lanza_error():
    with pytest.raises(InvalidMoleculeError):
        Molecule(smiles="", name="vacia")