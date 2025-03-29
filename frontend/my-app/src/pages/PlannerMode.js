import React, { useState } from 'react';
import { planGuidance } from '../services/api'; // Import from api.js
import './Chat.css'; // Optional styling
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation


function PlannerMode() {
  const [userInput, setUserInput] = useState('');
  const [responseText, setResponseText] = useState('');
  const navigate = useNavigate();

  const handlePlan = async () => {
    try {
      // Retrieve user data from localStorage
      const storedUser = localStorage.getItem('user');
      if (!storedUser) {
        alert('User not logged in.');
        navigate('/login'); // Redirect to login if user is not logged in
        return;
      }
      const user = JSON.parse(storedUser);

      // Call planGuidance with user.id and the input message
      const data = await planGuidance(user.id, userInput);
      setResponseText(data.reply);
    } catch (error) {
      console.error('Error planning guidance:', error);
      setResponseText('An error occurred while providing guidance.');
    }
  };

  return (
    <div className="mode-container">
      <h2>Planner Mode</h2>
      <div className="input-container">
        <input
          type="text"
          placeholder="What would you like guidance on?"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <button onClick={handlePlan}>Get Guidance</button>
      </div>

      <div className="response-box">
        {responseText && responseText.replace(/\*/g, '').split('\n').map((line, idx) => (
          <p key={idx}>{line}</p>
        ))}
      </div>
    </div>
  );
}

export default PlannerMode;
