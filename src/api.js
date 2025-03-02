import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8011", // Backend URL
});

export const predictCalories = async (payload) => {
  try {
    const response = await api.post("/predict/", payload);
    return response.data;
  } catch (error) {
    console.error("Error predicting calories:", error.message);
    throw error;
  }
};
