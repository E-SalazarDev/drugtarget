from app.schemas.molecule import MoleculeCreate, MoleculeResponse
from app.schemas.protein import ProteinCreate, ProteinResponse
from app.domain.molecule import Molecule
from app.domain.protein import Protein
from app.infrastructure.db.models import MoleculeModel
from app.infrastructure.db.models import ProteinModel
from app.infrastructure.db.repositories import MoleculeRepository
from app.infrastructure.db.repositories import ProteinRepository

class MoleculeService:
    def __init__ (self, repository: MoleculeRepository):
        self.repository = repository
        
    async def create_molecule(self, data:MoleculeCreate)->MoleculeResponse:
        molecule = Molecule(smiles=data.smiles, name=data.name)
        is_valid, message =molecule.validate_structure()
        if not is_valid:
            raise ValueError(message)
        
        molecule_model = MoleculeModel(smiles = molecule.smiles, name = molecule.name)
        
        saved = await self.repository.add(molecule_model)
        
        return MoleculeResponse(id= str(saved.id), smiles=saved.smiles, name=saved.name)
    

class ProteinService:
    def __init__(self, repository: ProteinRepository):
        self.repository= repository
        
        
    async def create_protein(self, data: ProteinCreate)->ProteinResponse:
        protein = Protein(sequence= data.sequence, name= data.name, uniprot_id= data.uniprot_id)
        
        is_valid, message = protein.validate_structure()
        if not is_valid:
            raise ValueError(message)
        
        protein_model = ProteinModel(sequence= protein.sequence, name= protein.name, uniprot_id=protein.uniprot_id)
        saved = await self.repository.add(protein_model)
        
        return  ProteinResponse(id= str(saved.id), sequence= saved.sequence, name= saved.name, uniprot_id= saved.uniprot_id )