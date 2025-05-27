import React from 'react';

function AppointmentList({ appointments, onCancel, userRole }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (appointments.length === 0) {
    return (
      <div className="text-gray-500 text-center py-4">
        No appointments found.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {appointments.map((appointment) => (
        <div
          key={appointment._id}
          className="border rounded-lg p-4 hover:shadow-md transition-shadow"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-lg">
                {userRole === 'patient' 
                  ? `Dr. ${appointment.doctor.name}`
                  : `Patient: ${appointment.patient.name}`}
              </h3>
              <p className="text-gray-600">
                {formatDate(appointment.date)} at {appointment.time}
              </p>
              {appointment.notes && (
                <p className="text-gray-600 mt-2">
                  Notes: {appointment.notes}
                </p>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <span
                className={`px-2 py-1 rounded text-sm ${
                  appointment.status === 'scheduled'
                    ? 'bg-green-100 text-green-800'
                    : appointment.status === 'completed'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
              </span>
              {appointment.status === 'scheduled' && (
                <button
                  onClick={() => onCancel(appointment._id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AppointmentList; 