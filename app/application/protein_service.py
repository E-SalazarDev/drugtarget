from app.schemas.protein import ProteinCreate, ProteinResponse
from app.domain.protein import Protein
from app.infrastructure.db.models import ProteinModel
from app.infrastructure.db.repositories import ProteinRepository




class ProteinService:
    def __init__(self, repository: ProteinRepository):
        self.repository= repository
        
        
    async def create_protein(self, data: ProteinCreate)->ProteinResponse:
        protein = Protein(sequence= data.sequence, name= data.name, uniprot_id= data.uniprot_id)
        
        is_valid, message = protein.validate_structure()
        if not is_valid:
            raise ValueError(message)
        
        protein_model = ProteinModel(sequence= protein.sequence.upper(), name= protein.name, uniprot_id=protein.uniprot_id)
        saved = await self.repository.add(protein_model)
        
        return  ProteinResponse(id= str(saved.id), sequence= saved.sequence, name= saved.name, uniprot_id= saved.uniprot_id )