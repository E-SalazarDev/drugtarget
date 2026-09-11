from app.schemas.molecule import MoleculeCreate, MoleculeResponse
from app.domain.molecule import Molecule
from app.infrastructure.db.models import MoleculeModel
from app.infrastructure.db.repositories import MoleculeRepository

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
    

