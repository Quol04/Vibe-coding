import express from 'express';
import { createAppointment, getAppointments, updateAppointment, deleteAppointment } from '../controllers/appointmentController.js';

const router = express.Router();

// Route to create a new appointment
router.post('/appointments', createAppointment);

// Route to get all appointments
router.get('/appointments', getAppointments);

// Route to update an existing appointment
router.put('/appointments/:id', updateAppointment);

// Route to delete an appointment
router.delete('/appointments/:id', deleteAppointment);

export default router;