from sqlalchemy import ForeignKey
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column

class Base(DeclarativeBase):
    pass


class ProteinModel(Base):
    __tablename__ = "proteins"

    id: Mapped[int] = mapped_column(primary_key=True)
    sequence: Mapped[str]
    name: Mapped[str | None]
    uniprot_id: Mapped[str | None]


class MoleculeModel(Base):
    __tablename__ = "molecules"

    id: Mapped[int] = mapped_column(primary_key=True)
    smiles: Mapped[str]
    name: Mapped[str | None]


class PredictionModel(Base):
    __tablename__ = "predictions"

    id: Mapped[int] = mapped_column(primary_key=True)
    molecule_id: Mapped[int] = mapped_column(ForeignKey("molecules.id"))
    protein_id: Mapped[int] = mapped_column(ForeignKey("proteins.id"))
    predicted_affinity: Mapped[float]
    model_version: Mapped[str | None]