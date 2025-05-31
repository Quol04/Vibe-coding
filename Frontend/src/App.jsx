import React, { useState, useEffect } from "react";
import axios from "axios";
import './App.css'

function App() {
  const [appointments, setAppointments] = useState([]);
  const [form, setForm] = useState({
    patientName: "",
    doctorName: "",
    date: "",
    phone: "",
    channel: "sms"
  });

  useEffect(() => {
    axios.get("http://localhost:5000/api/appointments")
      .then(res => setAppointments(res.data));
  }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await axios.post("http://localhost:5000/api/appointments", form);
    setAppointments([...appointments, res.data]);
    setForm({ patientName: "", doctorName: "", date: "", phone: "", channel: "sms" });
  };

  return (
    <>
  <h1>Clinics and private doctors often lose track of patient follow-ups</h1>
      
 {/* Challenge: Develop a tool that automatically reminds both doctors and patients of appointments via SMS, WhatsApp, or other channels. */}
 <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Appointment Reminder Tool</h1>
      <form onSubmit={handleSubmit} className="space-y-2 mb-6">
        <input className="border p-2 w-full" name="patientName" placeholder="Patient Name" value={form.patientName} onChange={handleChange} required />
        <input className="border p-2 w-full" name="doctorName" placeholder="Doctor Name" value={form.doctorName} onChange={handleChange} required />
        <input className="border p-2 w-full" name="date" type="datetime-local" value={form.date} onChange={handleChange} required />
        <input className="border p-2 w-full" name="phone" placeholder="Phone (+1234567890)" value={form.phone} onChange={handleChange} required />
        <select className="border p-2 w-full" name="channel" value={form.channel} onChange={handleChange}>
          <option value="sms">SMS</option>
          <option value="whatsapp">WhatsApp</option>
        </select>
        <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">Add Appointment</button>
      </form>
      <h2 className="font-semibold mb-2">Upcoming Appointments</h2>
      <ul>
        {appointments.map((a, i) => (
          <li key={i} className="border-b py-2">
            <strong>{a.patientName}</strong> with Dr. {a.doctorName} on {new Date(a.date).toLocaleString()} via {a.channel.toUpperCase()}
          </li>
        ))}
      </ul>
    </div>
    </>
  )
}

export default App
