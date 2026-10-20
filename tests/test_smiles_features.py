import numpy as np
import pytest

from ml.features.smiles_features import smiles_to_morgan


def test_vector_tiene_tamano_y_valores_binarios():
    vector = smiles_to_morgan("CC(=O)O")
    assert vector.shape == (2048,)
    assert set(np.unique(vector)) <= {0, 1}


@pytest.mark.parametrize("n_bits", [256, 1024, 2048])
def test_n_bits_se_respeta(n_bits):
    vector = smiles_to_morgan("CC(=O)O", n_bits=n_bits)
    assert len(vector) == n_bits


def test_es_determinista():
    a = smiles_to_morgan("CC(=O)O")
    b = smiles_to_morgan("CC(=O)O")
    assert np.array_equal(a, b)


def test_smiles_invalido_lanza_error():
    with pytest.raises(ValueError):
        smiles_to_morgan("C(((C")


def test_moleculas_parecidas_comparten_mas_bits():
    acetico = smiles_to_morgan("CC(=O)O")
    propionico = smiles_to_morgan("CCC(=O)O")
    benceno = smiles_to_morgan("c1ccccc1")

    parecidas = int((acetico & propionico).sum())
    distintas = int((acetico & benceno).sum())
    assert parecidas > distintas