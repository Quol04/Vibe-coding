# Appointment Reminder App

This project is a web application designed to help clinics and private doctors manage patient appointments effectively. It automatically reminds both doctors and patients of appointments via SMS, WhatsApp, or other communication channels.

---

## Project Structure

The project is divided into two main parts: the backend and the frontend.

---

### Backend

The backend is built using Node.js and Express, and it connects to a MongoDB database. The structure is as follows:

- **src/app.js**: Entry point of the backend application. Initializes the Express app, sets up middleware, and connects to the MongoDB database.

- **src/controllers/appointmentController.js**: Handles appointment-related requests such as creating, updating, and retrieving appointments.

- **src/models/appointment.js**: Defines the Mongoose schema for appointments, specifying the structure of appointment documents in the MongoDB database.

- **src/routes/appointmentRoutes.js**: Exports the routes for appointment-related API endpoints, linking them to the appropriate controller functions.

- **src/services/notificationService.js**: Contains functions for sending notifications via SMS, WhatsApp, or other channels, handling the logic for communicating with external services.

- **package.json**: Configuration file for the backend, listing dependencies and scripts for running the server.

---

### Frontend

The frontend is built using React.js and styled with Tailwind CSS. The structure is as follows:

- **public/index.html**: Main HTML file for the frontend application, serving as the entry point for the React app.

- **src/App.jsx**: Main component of the React application, rendering the overall structure and routing of the app.

- **src/components/AppointmentForm.jsx**: React component for the appointment form, allowing users to input appointment details.

- **src/pages/Home.jsx**: React component for the home page of the application, displaying relevant information and links.

- **src/index.js**: Entry point of the React application, rendering the App component into the DOM.

- **src/App.css**: CSS styles for the React application, including styles for Tailwind CSS.

- **tailwind.config.js**: Configuration file for Tailwind CSS, specifying customizations and settings for the utility-first CSS framework.

- **package.json**: Configuration file for the frontend, listing dependencies and scripts for building and running the React app.

---

## Getting Started

To get started with the project, follow these steps:

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the backend directory and install dependencies:
   ```
   cd backend
   npm install
   ```

3. Set up your MongoDB database and update the connection string in `src/app.js`.

4. Start the backend server:
   ```
   npm start
   ```

5. Navigate to the frontend directory and install dependencies:
   ```
   cd ../frontend
   npm install
   ```

6. Start the frontend application:
   ```
   npm start
   ```

---

## Features

- Automatic reminders for appointments via SMS and WhatsApp.

- User-friendly interface for managing appointments.

- Secure and scalable backend using Node.js and MongoDB.

