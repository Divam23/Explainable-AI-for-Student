from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from app.schemas.request import PredictionRequest
from app.core.encoder import encode_input

app = FastAPI(title="Explainable AI Backend")

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,          
    allow_credentials=True,         
    allow_methods=["*"],            
    allow_headers=["*"],            
)


class DummyModel:
    def predict(self, X):
        return [1]

model = DummyModel()

@app.get("/")
def read_root():
    return {"message": "Hello World"}

class Prediction(BaseModel):
    name: str
    description: str | None



@app.post("/generate")
async def generate_result(Prediction : Prediction):
    print(Prediction)
    return Prediction

@app.post("/predict")
def predict(data: PredictionRequest):
    features = encode_input(data)
    return {
        "message": "Schema Accepted successfully",
        "recieved_input": features
    }