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
    

@router.get("/", response_model=list[MoleculeResponse])
async def list_molecules(session: AsyncSession = Depends(get_session)):
    repository = MoleculeRepository(session)
    molecules = await repository.get_all()
    return [MoleculeResponse(id=str(m.id), smiles=m.smiles, name=m.name) for m in molecules]


@router.get("/{molecule_id}", response_model=MoleculeResponse)
async def get_molecule(molecule_id: int, session: AsyncSession = Depends(get_session)):
    repository = MoleculeRepository(session)
    molecule = await repository.get_by_id(molecule_id)
    if molecule is None:
        raise HTTPException(status_code=404, detail="Molécula no encontrada")
    return MoleculeResponse(id=str(molecule.id), smiles=molecule.smiles, name=molecule.name)