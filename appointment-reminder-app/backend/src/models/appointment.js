import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  patientName: {
    type: String,
    required: true,
  },
  doctorName: {
    type: String,
    required: true,
  },
  appointmentDate: {
    type: Date,
    required: true,
  },
  appointmentTime: {
    type: String,
    required: true,
  },
  contactMethod: {
    type: String,
    enum: ['SMS', 'WhatsApp', 'Email'],
    required: true,
  },
  notes: {
    type: String,
    default: '',
  },
}, {
  timestamps: true,
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

export default Appointment;