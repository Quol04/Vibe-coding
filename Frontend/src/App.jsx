import React,{useState,useEffect} from 'react'
import './App.css'

function App() {
  const [reminder, setReminder] = useState('');

  const handleInputChange = (event) => {
    setReminder(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Logic to send reminder via chosen channel
  };

  return (
    <>
  <h1>Clinics and private doctors often lose track of patient follow-ups</h1>
      
 {/* Challenge: Develop a tool that automatically reminds both doctors and patients of appointments via SMS, WhatsApp, or other channels. */}

    </>
  )
}

export default App
