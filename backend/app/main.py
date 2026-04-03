from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.schemas.request import PredictionRequest
from app.core.encoder import encode_input
from app.utils.explaination_generator import generate_explanation
from pathlib import Path
import numpy as np
import shap as shap
import pandas as pd
import joblib
from app.gemini.genai import get_ai_suggestions

BACKEND_DIR = Path(__file__).resolve().parents[1]

background_csv = BACKEND_DIR/"dataset"/"background_data.csv"

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

model = joblib.load("models/my_model.pkl")
background = pd.read_csv(background_csv)

explainer = shap.LinearExplainer(model, background)

FEATURE_NAMES = ['Hours Studied', 'Attendance', 'Parental Involvement', 'Access to Resources', 'Extracurricular Activities', 'Sleep Hours', 'Previous Scores', 'Motivation Level', 'Internet Access', 'Tutoring Sessions', 'Family Income', 'Teacher Quality', 'School Type', 'Peer Influence', 'Physical Activity', 'Learning Disabilities', 'Parental Education Level', 'Distance from Home', 'Gender']

@app.get("/")
def read_root():
    return {"message": "Hello World"}

@app.post("/predict")
def predict(data: PredictionRequest):
    features = encode_input(data)

    
    if model is None:
        raise RuntimeError("Model not loaded")

    
    prediction = float(model.predict([features])[0])
    prediction = max(0, min(prediction, 100))

    input_df = pd.DataFrame([features], columns=FEATURE_NAMES)

    raw_shap = explainer.shap_values(input_df)[0]
    if isinstance(raw_shap, list):
        raw_shap = raw_shap[0]

    shap_arr = np.array(raw_shap)

    if shap_arr.ndim == 2 and shap_arr.shape[0] == 1:
        shap_values = shap_arr[0]
    else:
        shap_values = shap_arr

    explanation = generate_explanation(shap_values, FEATURE_NAMES)

    contributions = dict(zip(FEATURE_NAMES, shap_values))

    top_features = dict(
        sorted(contributions.items(), key=lambda x: abs(x[1]), reverse=True)[:6]
    )

    ai_suggestions = get_ai_suggestions(prediction, top_features) or {
        "suggestions": [],
        "weaknesses": [],
        "strengths": []
    }

    return {
        "message": "Schema Accepted successfully",
        "received_input": features,
        "prediction": prediction,
        "explaination": explanation,
        "contribution": contributions,
        "aiSuggestions": ai_suggestions
    }