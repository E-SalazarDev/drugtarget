class InvalidPredictionError(Exception):
    pass

class Prediction:
    def __init__(self,molecule_id, protein_id, predicted_affinity, model_version):
        self.molecule_id= molecule_id
        self.protein_id= protein_id
        self.predicted_affinity= predicted_affinity
        self.model_version= model_version
        self.validate()
        
    def validate(self):
        
      if(self.molecule_id is None
         or not isinstance(self.molecule_id, str)
         or len(self.molecule_id.strip())==0
         ):
          raise InvalidPredictionError("Valor inválido de molécula")
      
      if(self.protein_id is  None
         or not isinstance(self.protein_id, str)
         or len(self.protein_id.strip())==0
         ):
          raise InvalidPredictionError("Valor inválido de proteína")
      
      if not isinstance(self.predicted_affinity, (int, float)):
        raise InvalidPredictionError("La afinidad predicha debe ser un número (int o float)")
      
      if  self.predicted_affinity< 0:
        raise InvalidPredictionError("La afinidad predicha no puede ser negativa")
    
    
try:
    pred2 = Prediction(molecule_id="mol-123", protein_id="prot-456", predicted_affinity=-3.1, model_version="baseline-v1")
except InvalidPredictionError as e:
    print("error esperado:", e)