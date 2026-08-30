from rdkit import Chem

class InvalidMoleculeError(Exception):
    pass


class Molecule:
    def __init__(self, smiles, name):
        self.smiles = smiles
        self.name = name
        self.validate()

    def validate(self):
        if not isinstance(self.smiles, str):
            raise InvalidMoleculeError("No es un texto")
        if len(self.smiles.strip()) == 0:
            raise InvalidMoleculeError("no se resivio la formula")

    def validate_structure(self):
       
        pila = []
        for i, text in enumerate(self.smiles):
            if text == "(":
                pila.append(i)
            elif text == ")":
                if not pila:
                    return (False, f"Error: Paréntesis de cierre ')' sin apertura en la posición {i}")
                pila.pop()
        if pila:
            pos_error = pila.pop()
            return (False, f"Error: Paréntesis de apertura '(' sin cerrar en la posición {pos_error}")

 
        mol = Chem.MolFromSmiles(self.smiles)
        if mol is None:
            return (False, "SMILES químicamente inválido")

        return True, "SMILES válido"


try:
    print(Molecule("CC(=O)O", "Ácido acético").validate_structure())
except InvalidMoleculeError as e:
    print(f"Falló como se esperaba: {e}")