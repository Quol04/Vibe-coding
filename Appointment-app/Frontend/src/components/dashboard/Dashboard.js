import React, { useState, useEffect } from 'react';
import AppointmentList from './AppointmentList';
import AppointmentForm from './AppointmentForm';

function Dashboard({ user }) {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAppointments();
    if (user.role === 'patient') {
      fetchDoctors();
    }
  }, [user.role]);

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/appointments/user/${user.id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch appointments');
      }

      const data = await response.json();
      setAppointments(data);
    } catch (err) {
      setError('Failed to load appointments');
    } finally {
      setLoading(false);
    }
  };

  const fetchDoctors = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/users/doctors');
      if (!response.ok) {
        throw new Error('Failed to fetch doctors');
      }
      const data = await response.json();
      setDoctors(data);
    } catch (err) {
      setError('Failed to load doctors');
    }
  };

  const handleAppointmentCreate = async (appointmentData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...appointmentData,
          patientId: user.role === 'patient' ? user.id : appointmentData.patientId
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create appointment');
      }

      fetchAppointments();
    } catch (err) {
      setError('Failed to create appointment');
    }
  };

  const handleAppointmentCancel = async (appointmentId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/appointments/${appointmentId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to cancel appointment');
      }

      fetchAppointments();
    } catch (err) {
      setError('Failed to cancel appointment');
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">My Appointments</h2>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        <AppointmentList
          appointments={appointments}
          onCancel={handleAppointmentCancel}
          userRole={user.role}
        />
      </div>
      
      {user.role === 'patient' && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">Schedule Appointment</h2>
          <AppointmentForm
            doctors={doctors}
            onSubmit={handleAppointmentCreate}
          />
        </div>
      )}
    </div>
  );
}

export default Dashboard; 