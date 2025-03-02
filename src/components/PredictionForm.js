// PredictionForm.js
import React, { useState } from "react";
import "./PredictionForm.css"; // Import the CSS file
import { predictCalories } from "../api";

function PredictionForm() {
  const [formData, setFormData] = useState({
    duration: "",
    heart_rate: "",
    age: "",
    height: "",
    weight: "",
  });

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);
    try {
      const response = await predictCalories(formData);
      setResult(response.predicted_calories);
    } catch (err) {
      setError("Failed to fetch prediction. Please try again.");
    }
  };

  return (
    <div className="prediction-container">
      <h2 className="title">Calories Prediction</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>Duration (minutes): </label>
          <input
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Heart Rate (bpm): </label>
          <input
            type="number"
            name="heart_rate"
            value={formData.heart_rate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Age (years): </label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Height (cm): </label>
          <input
            type="number"
            name="height"
            value={formData.height}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Weight (kg): </label>
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-button">Predict</button>
      </form>

      {result && <div className="result">Predicted Calories: {result}</div>}
      {error && <div className="error">{error}</div>}
    </div>
  );
}

export default PredictionForm;
