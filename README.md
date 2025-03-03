# Calories Prediction API (FastAPI + Docker + React)

This project is a **calories prediction system** built using **FastAPI** for the backend and **React** for the frontend. The model predicts the number of calories burned based on input parameters like duration, heart rate, age, height, and weight. The backend is containerized using **Docker**.

---

## 🚀 Features
- **FastAPI Backend** for model inference
- **React Frontend** for user interaction
- **Material UI** for modern UI components
- **Machine Learning Model** trained using Python
- **Docker Containerization** for deployment
- **CSV Datasets** for training the model

---

## 📂 Project Structure

```
📦 project-root
├── app
│   ├── __init__.py
│   ├── main.py         # FastAPI application
│   ├── model.py        # Model loading & prediction logic
│   ├── model.pkl       # Trained ML model
│   └── __pycache__
├── data
│   ├── calories.csv    # Dataset for training
│   ├── exercise.csv    # Additional dataset
├── train_model.py      # Script for training the model
├── requirements.txt    # Python dependencies
├── Dockerfile          # Docker setup for backend
├── docker-compose.yml  # Container orchestration
└── frontend            # React frontend
```

---

## 🔧 Setup & Installation

### 1️⃣ Prerequisites
Make sure you have installed:
- **Docker & Docker Compose**
- **Python 3.8+**
- **Node.js & npm** (for frontend)

### 2️⃣ Clone the Repository
```sh
git clone https://github.com/yourusername/calories-prediction.git
cd calories-prediction
```

### 3️⃣ Install Backend Dependencies
```sh
cd app
pip install -r requirements.txt
```

### 4️⃣ Run the FastAPI Server
```sh
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

Backend will be live at: **`http://localhost:8000`**

### 5️⃣ Run the Frontend
```sh
cd frontend
npm install
npm start
```

Frontend will be available at: **`http://localhost:3000`**

---

## 🐳 Running with Docker

### Build and Start Containers
```sh
docker-compose up --build
```

### Stop Containers
```sh
docker-compose down
```

API will be available at **`http://localhost:8000`** inside the container.

---

## 📡 API Endpoints

| Method | Endpoint        | Description           |
|--------|----------------|-----------------------|
| POST   | `/predict`     | Predict calories      |
| GET    | `/docs`        | OpenAPI Documentation |

### Example Prediction Request (JSON):
```json
{
  "duration": 30,
  "heart_rate": 120,
  "age": 25,
  "height": 175,
  "weight": 70
}
```

### Example Response:
```json
{
  "predicted_calories": 200
}
```

---

## 🛠 Technologies Used
- **FastAPI** (Backend)
- **React.js** (Frontend)
- **Material UI** (UI Components)
- **Python** (Machine Learning)
- **Docker & Docker Compose** (Containerization)
- **Uvicorn** (ASGI Server)

---

## 📜 License
This project is licensed under the MIT License.

---

## 🤝 Contributing
Feel free to fork this repository, make changes, and submit a pull request!

---

Happy Coding! 🚀
