const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const ReminderService = require('../services/reminderService');

// Get all appointments
router.get('/', async (req, res) => {
    try {
        const appointments = await Appointment.find()
            .populate('doctor', 'name specialization')
            .populate('patient', 'name');
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get appointments by user (doctor or patient)
router.get('/user/:userId', async (req, res) => {
    try {
        const appointments = await Appointment.find({
            $or: [
                { doctor: req.params.userId },
                { patient: req.params.userId }
            ]
        })
        .populate('doctor', 'name specialization')
        .populate('patient', 'name');
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create new appointment
router.post('/', async (req, res) => {
    const appointment = new Appointment({
        doctor: req.body.doctorId,
        patient: req.body.patientId,
        date: req.body.date,
        time: req.body.time,
        duration: req.body.duration,
        notes: req.body.notes
    });

    try {
        const newAppointment = await appointment.save();
        // Send immediate confirmation
        await ReminderService.sendReminder(newAppointment);
        res.status(201).json(newAppointment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update appointment
router.patch('/:id', async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        Object.keys(req.body).forEach(key => {
            if (key in appointment) {
                appointment[key] = req.body[key];
            }
        });

        const updatedAppointment = await appointment.save();
        res.json(updatedAppointment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Cancel appointment
router.delete('/:id', async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }
        appointment.status = 'cancelled';
        await appointment.save();
        res.json({ message: 'Appointment cancelled' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router; 