const express = require('express');
const mongoose = require('mongoose');
const appointmentRoutes = require('./routes/appointmentRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use('/api/appointments', appointmentRoutes);

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/appointment-reminder', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});