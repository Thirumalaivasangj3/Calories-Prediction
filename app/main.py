from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from app.model import predict_calories

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allow requests from frontend
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

# Request body model
class PredictionRequest(BaseModel):
    duration: float
    heart_rate: float
    age: int
    height: float
    weight: float

@app.get("/")
def read_root():
    return {"message": "Welcome to the Calories Prediction API!"}

@app.post("/predict/")
def predict(data: PredictionRequest):
    prediction = predict_calories(
        data.duration, data.heart_rate, data.age, data.height, data.weight
    )
    return {"predicted_calories": prediction}
