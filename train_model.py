import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
import pickle

# Load datasets
calories = pd.read_csv('data/calories.csv')
exercise = pd.read_csv('data/exercise.csv')

# Merge datasets
data = pd.merge(calories, exercise, on="User_ID")

# Prepare data for training
X = data[['Duration', 'Heart_Rate', 'Age', 'Height', 'Weight']]
y = data['Calories']

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train the model
model = LinearRegression()
model.fit(X_train, y_train)

# Save the model
with open('app/model.pkl', 'wb') as f:
    pickle.dump(model, f)

print("Model training complete. Model saved as 'app/model.pkl'.")
