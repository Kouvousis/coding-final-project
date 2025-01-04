# Use the official Python image from the Docker Hub
FROM python:3.13.0-slim

# Set the working directory in the container to /backend
WORKDIR /backend

# Copy the requirements file into the container at /backend/
COPY requirements.txt /backend/

# Install any dependencies specified in requirements.txt
RUN pip install -r requirements.txt

# Copy the rest of the application code to /backend/
COPY . /backend/

# Set the working directory to /backend/taskmanager
WORKDIR /backend/taskmanager

# Make port 8000 available to the world outside this container
EXPOSE 8000

# Run the migrations and start the Django development server
CMD ["sh", "-c", "python manage.py migrate && python manage.py makemigrations && python manage.py runserver 0.0.0.0:8000"]