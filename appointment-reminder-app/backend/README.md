# Appointment Reminder App - Backend

This project is a backend application for an appointment reminder tool that automatically reminds both doctors and patients of appointments via SMS, WhatsApp, or other channels.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- dotenv (for environment variables)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/appointment-reminder-app.git
   ```

2. Navigate to the backend directory:
   ```
   cd appointment-reminder-app/backend
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Create a `.env` file in the `backend` directory and add your MongoDB connection string:
   ```
   MONGODB_URI=your_mongodb_connection_string
   ```

## Usage

To start the backend server, run:
```
npm start
```

The server will run on `http://localhost:5000` by default.

## API Endpoints

- `POST /api/appointments`: Create a new appointment.
- `GET /api/appointments`: Retrieve all appointments.
- `GET /api/appointments/:id`: Retrieve a specific appointment by ID.
- `PUT /api/appointments/:id`: Update an existing appointment.
- `DELETE /api/appointments/:id`: Delete an appointment.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or features.

## License

This project is licensed under the MIT License.