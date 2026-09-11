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
    