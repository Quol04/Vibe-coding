const twilio = require('twilio');
const cron = require('node-cron');
const Appointment = require('../models/Appointment');

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

class ReminderService {
    static async sendSMS(to, message) {
        try {
            await client.messages.create({
                body: message,
                to,
                from: process.env.TWILIO_PHONE_NUMBER
            });
            return true;
        } catch (error) {
            console.error('SMS sending failed:', error);
            return false;
        }
    }

    static async sendWhatsApp(to, message) {
        try {
            await client.messages.create({
                body: message,
                to: `whatsapp:${to}`,
                from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`
            });
            return true;
        } catch (error) {
            console.error('WhatsApp message sending failed:', error);
            return false;
        }
    }

    static async sendReminder(appointment) {
        const { doctor, patient } = await appointment.populate(['doctor', 'patient']);
        
        const message = `Reminder: You have an appointment on ${appointment.date.toLocaleDateString()} at ${appointment.time}.
Doctor: ${doctor.name}
Patient: ${patient.name}`;

        if (doctor.preferredContact === 'SMS' || doctor.preferredContact === 'Both') {
            await this.sendSMS(doctor.phone, message);
        }
        if (doctor.preferredContact === 'WhatsApp' || doctor.preferredContact === 'Both') {
            await this.sendWhatsApp(doctor.phone, message);
        }

        if (patient.preferredContact === 'SMS' || patient.preferredContact === 'Both') {
            await this.sendSMS(patient.phone, message);
        }
        if (patient.preferredContact === 'WhatsApp' || patient.preferredContact === 'Both') {
            await this.sendWhatsApp(patient.phone, message);
        }

        appointment.reminderSent = true;
        appointment.lastReminderDate = new Date();
        await appointment.save();
    }

    static initializeReminderCron() {
        // Check for appointments every hour
        cron.schedule('0 * * * *', async () => {
            const now = new Date();
            const twentyFourHoursFromNow = new Date(now.getTime() + 24 * 60 * 60 * 1000);

            const upcomingAppointments = await Appointment.find({
                date: { $gte: now, $lte: twentyFourHoursFromNow },
                status: 'scheduled',
                reminderSent: false
            });

            for (const appointment of upcomingAppointments) {
                await this.sendReminder(appointment);
            }
        });
    }
}

module.exports = ReminderService; 