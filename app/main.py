from fastapi import FastAPI
from app.api.v1 import molecules, proteins

app = FastAPI(title="DrugTarget API")

app.include_router(molecules.router, prefix="/api/v1")
app.include_router(proteins.router, prefix="/api/v1")

@app.get("/health")
def health_check():
    return {"status": "ok"}