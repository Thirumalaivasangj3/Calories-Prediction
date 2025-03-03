import React, { useState } from "react";
import { predictCalories } from "../api";
import { CircularProgress, TextField, Button, Container, Typography, Paper, Grid } from "@mui/material";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";

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
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    try {
      const response = await predictCalories(formData);
      setResult(response.predicted_calories);
    } catch (err) {
      setError("Failed to fetch prediction. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: "2rem", marginTop: "2rem", textAlign: "center" }}>
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          <Grid item>
            <FitnessCenterIcon style={{ fontSize: 40, color: "#1976d2" }} />
          </Grid>
          <Grid item>
            <Typography variant="h4" gutterBottom>
              Smart Fitness Tracker
            </Typography>
          </Grid>
        </Grid>
        <form onSubmit={handleSubmit}>
          {[
            { label: "Duration (minutes)", name: "duration" },
            { label: "Heart Rate (bpm)", name: "heart_rate" },
            { label: "Age (years)", name: "age" },
            { label: "Height (cm)", name: "height" },
            { label: "Weight (kg)", name: "weight" },
          ].map((field) => (
            <TextField
              key={field.name}
              label={field.label}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              fullWidth
              margin="normal"
              variant="outlined"
              type="number"
              required
            />
          ))}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: "1rem" }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Predict Calories"}
          </Button>
        </form>

        {result && (
          <Typography variant="h6" color="success.main" style={{ marginTop: "1rem" }}>
            Predicted Calories Burned: <strong>{result}</strong>
          </Typography>
        )}
        {error && (
          <Typography variant="body1" color="error" style={{ marginTop: "1rem" }}>
            {error}
          </Typography>
        )}
      </Paper>
    </Container>
  );
}

export default PredictionForm;