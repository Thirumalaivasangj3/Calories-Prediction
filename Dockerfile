# Use the official Python image
FROM python:3.10-slim

# Set the working directory
WORKDIR /app

# Copy the requirements and application files
COPY requirements.txt ./
COPY app ./app

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Expose the application on port 8011
EXPOSE 8011

# Run the application
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8011"]
