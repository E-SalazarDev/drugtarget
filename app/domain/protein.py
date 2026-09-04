class InvalidProteinError(Exception):
    pass

class Protein:
    def __init__ (self, sequence, name, uniprot_id):
        self.sequence= sequence
        self.name= name
        self.uniprot_id= uniprot_id
        self.validate()
    
    def validate(self):
        if not isinstance(self.sequence, str):
            raise InvalidProteinError("No es un texto")
        
        if len(self.sequence.strip()) == 0:
            raise InvalidProteinError("Sin valores")
       
    def validate_structure(self):
        data_validate = {"A","R","N","D","C","Q","E","G","H","I","L","K","M","F","P","S","T","W","Y","V"}
        normalize = self.sequence.upper()
        
        for i, letra in enumerate(normalize):
            
            if not letra in data_validate:
                return (False, f"Aminoácido inválido '{letra}' en posición {i}")
            
        return (True, "Secuencia de aminoácidos válida")
          
                
        
try:
    p  = Protein(sequence="MENFQKVEK", name="Test Kinase", uniprot_id="P12345")
    print(p.validate_structure())
except InvalidProteinError as e:
    print(f"Error", e)