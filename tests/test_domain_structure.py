from app.domain.molecule import Molecule
from app.domain.protein import Protein


# ---------- Molecule.validate_structure ----------

def test_molecula_valida_pasa_ambos_chequeos():
    mol = Molecule(smiles="CC(=O)O", name="acido acetico")
    is_valid, message = mol.validate_structure()
    assert is_valid is True


def test_parentesis_de_cierre_sin_apertura_indica_posicion():
    mol = Molecule(smiles="C)C", name="mala")
    is_valid, message = mol.validate_structure()
    assert is_valid is False
    assert "posición 1" in message


def test_parentesis_de_apertura_sin_cerrar_indica_posicion():
    mol = Molecule(smiles="C(C", name="mala")
    is_valid, message = mol.validate_structure()
    assert is_valid is False
    assert "posición 1" in message


def test_parentesis_balanceados_pero_quimica_invalida_falla_en_rdkit():
    # pasa tu chequeo barato, pero RDKit la rechaza
    mol = Molecule(smiles="XYZ123", name="basura")
    is_valid, message = mol.validate_structure()
    assert is_valid is False
    assert "químicamente" in message


# ---------- Protein.validate_structure ----------

def test_proteina_valida():
    prot = Protein(sequence="MENFQKVEK", name=None, uniprot_id=None)
    assert prot.validate_structure()[0] is True


def test_aminoacido_invalido_indica_letra_y_posicion():
    prot = Protein(sequence="MENFXQKVEK", name=None, uniprot_id=None)
    is_valid, message = prot.validate_structure()
    assert is_valid is False
    assert "'X'" in message
    assert "posición 4" in message


def test_proteina_en_minusculas_es_valida():
    prot = Protein(sequence="menfqkvek", name=None, uniprot_id=None)
    assert prot.validate_structure()[0] is True