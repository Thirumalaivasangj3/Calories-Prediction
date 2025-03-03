import React, { useState } from "react";
import { predictCalories } from "../api";
import { CircularProgress, TextField, Button, Container, Typography, Paper, Grid, Slider, MenuItem, Select, FormControl, InputLabel, IconButton } from "@mui/material";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import { motion } from "framer-motion";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { LightMode, DarkMode } from "@mui/icons-material";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const lightTheme = createTheme({ palette: { mode: "light" } });
const darkTheme = createTheme({ palette: { mode: "dark" } });

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
  const [theme, setTheme] = useState(lightTheme);
  const [history, setHistory] = useState([]);

  const toggleTheme = () => {
    setTheme(theme.palette.mode === "light" ? darkTheme : lightTheme);
  };

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
      setHistory((prev) => [...prev, { name: prev.length + 1, calories: response.predicted_calories }]);
    } catch (err) {
      setError("Failed to fetch prediction. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm">
        <motion.div initial="hidden" animate="visible" variants={fadeIn}>
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
              <Grid item>
                <IconButton onClick={toggleTheme} color="primary">
                  {theme.palette.mode === "light" ? <DarkMode /> : <LightMode />}
                </IconButton>
              </Grid>
            </Grid>
            <form onSubmit={handleSubmit}>
              <TextField label="Duration (minutes)" name="duration" value={formData.duration} onChange={handleChange} fullWidth margin="normal" variant="outlined" type="number" required />
              <TextField label="Heart Rate (bpm)" name="heart_rate" value={formData.heart_rate} onChange={handleChange} fullWidth margin="normal" variant="outlined" type="number" required />
              <Typography gutterBottom>Age (years)</Typography>
              <Slider value={formData.age} onChange={(e, newValue) => setFormData({ ...formData, age: newValue })} aria-labelledby="age-slider" valueLabelDisplay="auto" min={10} max={100} />
              <TextField label="Height (cm)" name="height" value={formData.height} onChange={handleChange} fullWidth margin="normal" variant="outlined" type="number" required />
              <FormControl fullWidth margin="normal">
                <InputLabel>Weight (kg)</InputLabel>
                <Select name="weight" value={formData.weight} onChange={handleChange}>
                  {[50, 60, 70, 80, 90, 100, 110].map((w) => (
                    <MenuItem key={w} value={w}>{w} kg</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: "1rem" }} disabled={loading}>
                  {loading ? <CircularProgress size={24} color="inherit" /> : "Predict Calories"}
                </Button>
              </motion.div>
            </form>

            {result && (
              <motion.div variants={fadeIn} initial="hidden" animate="visible">
                <Typography variant="h6" color="success.main" style={{ marginTop: "1rem" }}>
                  Predicted Calories Burned: <strong>{result}</strong>
                </Typography>
              </motion.div>
            )}
            {error && (
              <motion.div variants={fadeIn} initial="hidden" animate="visible">
                <Typography variant="body1" color="error" style={{ marginTop: "1rem" }}>
                  {error}
                </Typography>
              </motion.div>
            )}
            {history.length > 0 && (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={history}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="calories" stroke="#8884d8" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            )}
          </Paper>
        </motion.div>
      </Container>
    </ThemeProvider>
  );
}

export default PredictionForm;
