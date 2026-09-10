from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.infrastructure.db.session import get_session
from app.infrastructure.db.repositories import MoleculeRepository
from app.application.molecule_service import MoleculeService
from app.schemas.molecule import MoleculeCreate, MoleculeResponse


router =  APIRouter(prefix="/molecules", tags=["molecules"])


@router.post("/", response_model= MoleculeResponse)
async def create_molecule(data: MoleculeCreate, session: AsyncSession = Depends(get_session)):
    repository = MoleculeRepository(session)
    service = MoleculeService(repository)
    
    try:
        return await service.create_molecule(data)
    except ValueError as  e:
        raise HTTPException(status_code=400, detail=str(e))
