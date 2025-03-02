import pickle
import numpy as np

# Load the model when the module is imported
with open('app/model.pkl', 'rb') as f:
    model = pickle.load(f)

def predict_calories(duration: float, heart_rate: float, age: int, height: float, weight: float) -> float:
    """
    Predict calories burned based on input features.
    """
    features = np.array([[duration, heart_rate, age, height, weight]])
    prediction = model.predict(features)
    return prediction[0]
