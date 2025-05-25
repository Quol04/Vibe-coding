import React, { useState } from 'react';

const AppointmentForm = () => {
    const [patientName, setPatientName] = useState('');
    const [doctorName, setDoctorName] = useState('');
    const [appointmentDate, setAppointmentDate] = useState('');
    const [appointmentTime, setAppointmentTime] = useState('');
    const [notificationMethod, setNotificationMethod] = useState('SMS');

    const handleSubmit = (e) => {
        e.preventDefault();
        const appointmentData = {
            patientName,
            doctorName,
            appointmentDate,
            appointmentTime,
            notificationMethod,
        };

        // Here you would typically send the appointmentData to your backend API
        console.log('Appointment Data:', appointmentData);
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white rounded shadow-md">
            <h2 className="text-xl font-bold mb-4">Schedule an Appointment</h2>
            <div className="mb-4">
                <label className="block text-gray-700">Patient Name</label>
                <input
                    type="text"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded p-2"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Doctor Name</label>
                <input
                    type="text"
                    value={doctorName}
                    onChange={(e) => setDoctorName(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded p-2"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Appointment Date</label>
                <input
                    type="date"
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded p-2"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Appointment Time</label>
                <input
                    type="time"
                    value={appointmentTime}
                    onChange={(e) => setAppointmentTime(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded p-2"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Notification Method</label>
                <select
                    value={notificationMethod}
                    onChange={(e) => setNotificationMethod(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded p-2"
                >
                    <option value="SMS">SMS</option>
                    <option value="WhatsApp">WhatsApp</option>
                    <option value="Email">Email</option>
                </select>
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
                Schedule Appointment
            </button>
        </form>
    );
};

export default AppointmentForm;