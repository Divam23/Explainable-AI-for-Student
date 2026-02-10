from pydantic import BaseModel
from typing import Literal

class PredictionRequest(BaseModel):
    # Numeric inputs
    hours_studied: float
    attendance: float
    sleep_hours: float
    previous_scores: float
    tutoring_sessions: float
    physical_activity: float
    distance_from_home: float

    # Ordered Categorical (LOW/MEDIUM/HIGH)
    parental_involvement: Literal["Low", "Medium", "High"]
    access_to_resources: Literal["Low", "Medium", "High"]
    motivation_level: Literal["Low", "Medium", "High"]
    family_income: Literal["Low", "Medium", "High"]
    teacher_quality: Literal["Low", "Medium", "High"]
    parent_education_level: Literal["High School", "College", "Post Graduate"]

    # Binary
    extracurricular_activities: Literal["Yes", "No"]
    internet_access: Literal["Yes", "No"]
    learning_disabilities: Literal["Yes", "No"]

    #Nominal
    school_type: Literal["Public", "Private"]
    peer_influence: Literal["Positive", "Negative", "Neutral"]
    gender: Literal["Male", "Female"]
