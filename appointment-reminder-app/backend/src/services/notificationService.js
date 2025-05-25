import nodemailer from 'nodemailer';
import twilio from 'twilio';

// Configure Twilio for SMS notifications
const twilioClient = twilio('TWILIO_ACCOUNT_SID', 'TWILIO_AUTH_TOKEN');

// Configure Nodemailer for email notifications
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'YOUR_EMAIL@gmail.com',
    pass: 'YOUR_EMAIL_PASSWORD',
  },
});

// Function to send SMS notifications
export const sendSMSNotification = (to, message) => {
  return twilioClient.messages.create({
    body: message,
    from: 'YOUR_TWILIO_PHONE_NUMBER',
    to: to,
  });
};

// Function to send email notifications
export const sendEmailNotification = (to, subject, text) => {
  const mailOptions = {
    from: 'YOUR_EMAIL@gmail.com',
    to: to,
    subject: subject,
    text: text,
  };

  return transporter.sendMail(mailOptions);
};

// Function to send WhatsApp notifications
export const sendWhatsAppNotification = (to, message) => {
  return twilioClient.messages.create({
    body: message,
    from: 'whatsapp:YOUR_TWILIO_WHATSAPP_NUMBER',
    to: `whatsapp:${to}`,
  });
};