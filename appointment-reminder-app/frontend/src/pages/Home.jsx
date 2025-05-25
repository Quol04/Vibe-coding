import React from 'react';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Welcome to the Appointment Reminder App</h1>
      <p className="text-lg mb-6">We help doctors and patients keep track of appointments effortlessly.</p>
      <p className="text-md">Get started by scheduling your first appointment!</p>
    </div>
  );
};

export default Home;