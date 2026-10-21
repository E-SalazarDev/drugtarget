import pytest

from ml.features.protein_features import protein_features


def test_siempre_devuelve_21_valores():
    # el bug original: proteínas con letras distintas daban vectores de distinto tamaño
    assert len(protein_features("MENFQKVEK")) == 21
    assert len(protein_features("AAAAAA")) == 21


def test_las_frecuencias_suman_uno():
    features = protein_features("MENFQKVEKIGEGTYGVVYK")
    assert sum(features[:20]) == pytest.approx(1.0)


def test_ultimo_valor_es_la_longitud():
    assert protein_features("MENFQKVEK")[-1] == 9


def test_posiciones_tienen_significado_fijo():
    # orden fijo: A en la posición 0, C en la posición 1
    features = protein_features("AAC")
    assert features[0] == pytest.approx(2 / 3)
    assert features[1] == pytest.approx(1 / 3)
    assert features[20] == 3


def test_minusculas_equivalen_a_mayusculas():
    assert protein_features("menfqk") == protein_features("MENFQK")


def test_secuencia_vacia_lanza_error():
    with pytest.raises(ValueError):
        protein_features("")