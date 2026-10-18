AMINO_ACIDS = "ACDEFGHIKLMNPQRSTVWY"

def protein_features(sequence: str) -> list[float]:
    sequence = sequence.upper()
    length = len(sequence)
    if length == 0:
        raise ValueError("La secuencia no puede estar vacía")

    frequencies = [sequence.count(aa) / length for aa in AMINO_ACIDS]
    return frequencies + [float(length)]