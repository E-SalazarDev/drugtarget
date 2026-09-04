from pydantic import BaseModel, Field

class MoleculeCreate(BaseModel):
    smiles: str = Field(min_length=1)
    name: str | None = None 
    
class MoleculeResponse(BaseModel):
    id: str
    smiles: str
    name: str | None = None
    
    
