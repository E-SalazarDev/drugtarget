from sqlalchemy.ext.asyncio import AsyncSession
from app.infrastructure.db.models import MoleculeModel, ProteinModel
from sqlalchemy import select

class MoleculeRepository:
    def __init__(self, session: AsyncSession):
        self.session = session
        
        
    async def add(self, molecule: MoleculeModel)-> MoleculeModel:
        self.session.add(molecule)
        await self.session.commit()
        await self.session.refresh(molecule)
        return molecule
    
    async def get_by_id(self, molecule_id: int)-> MoleculeModel | None:
        return await self.session.get(MoleculeModel, molecule_id)
    
    async def get_all(self)-> list[MoleculeModel]:
        result = await self.session.execute(
            select(MoleculeModel)
        )
        return result.scalars().all()


class ProteinRepository:
    def __init__ (self, session: AsyncSession):
        self.session = session
        
    async def add(self, protein: ProteinModel)-> ProteinModel:
        self.session.add(protein)
        await self.session.commit()
        await self.session.refresh(protein)
        return protein
    
    async def get_by_id(self, protein_id: int) -> ProteinModel | None:
        return await self.session.get(ProteinModel, protein_id)
    
    async def get_all(self)->list[ProteinModel]:
        result = await self.session.execute(
            select(ProteinModel)
        )
        return result.scalars().all()