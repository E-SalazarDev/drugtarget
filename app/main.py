from fastapi import FastAPI

app = FastAPI(title="DrugTarget API")

@app.get("/healt")
def health_check():
    return {"status": "ok"}