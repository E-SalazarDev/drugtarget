from pydantic import BaseModel, Field

class ProteinCreate(BaseModel):
    sequence: str = Field(min_length=1)
    name: str | None = None
    uniprot_id: str | None = None


class ProteinResponse(BaseModel):
    id: str
    sequence: str
    name: str | None = None
    uniprot_id: str | None = None