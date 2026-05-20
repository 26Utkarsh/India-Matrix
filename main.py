from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from models import NationalMetric, PrimeMinister, GeopoliticalEvent

app = FastAPI(
    title="India Matrix API",
    description="Backend API for the India Matrix Application",
    version="1.0.0"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify the actual frontend domains
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Welcome to the India Matrix API. Access /docs for Swagger UI."}

@app.get("/api/metrics", response_model=List[NationalMetric])
def get_metrics():
    # Placeholder: Will query TimescaleDB in the future
    return []

@app.get("/api/pm", response_model=List[PrimeMinister])
def get_pms():
    # Placeholder: Will query PostgreSQL in the future
    return []

@app.get("/api/events", response_model=List[GeopoliticalEvent])
def get_events():
    # Placeholder: Will query PostgreSQL in the future
    return []
