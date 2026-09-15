from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.infrastructure.db.session import get_session
from app.infrastructure.db.repositories import ProteinRepository
from app.application.protein_service import ProteinService
from app.schemas.protein import ProteinResponse, ProteinCreate

router = APIRouter(prefix="/proteins", tags=["proteins"])

@router.post("/", response_model=ProteinResponse)
async def create_protein(data: ProteinCreate, session: AsyncSession = Depends(get_session)):
    repository= ProteinRepository(session)
    service = ProteinService(repository)
    
    try:
        return await service.create_protein(data)
    except ValueError as error:
        raise HTTPException(status_code=400, detail=str(error))

@router.get("/", response_model = list[ProteinResponse])
async def list_protein(session: AsyncSession = Depends(get_session)):
    repository = ProteinRepository(session)
    protein = await repository.get_all()
    
    return [ProteinResponse(id=str(p.id), sequence= p.sequence, name= p.name, uniprot_id= p.uniprot_id ) for p in protein]
    
    
@router.get("/{protein_id}", response_model = ProteinResponse )
async def get_protein(protein_id: int ,session: AsyncSession = Depends(get_session)):
    repository = ProteinRepository(session)
    protein = await repository.get_by_id(protein_id)
    
    if protein is None:
        raise HTTPException(status_code=404, detail="Proteina no encontrada")
    
    return ProteinResponse(id= str(protein.id), sequence=protein.sequence, name= protein.name, uniprot_id= protein.uniprot_id)