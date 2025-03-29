import React, { useState } from 'react';
import { analyzeRisks } from '../services/api'; // Import from api.js
import './Chat.css'; // Optional styling
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

function RiskMode() {
  const [userInput, setUserInput] = useState('');
  const [responseText, setResponseText] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

  const handleAnalyze = async () => {
    try {
      // Retrieve user data from localStorage
      const storedUser = localStorage.getItem('user');
      if (!storedUser) {
        alert('User not logged in.');
        navigate('/login'); // Redirect to login if user is not logged in
        return;
      }
      const user = JSON.parse(storedUser);

      // Call analyzeRisks with user.id and the input message
      const data = await analyzeRisks(user.id, userInput);
      setResponseText(data.reply);
    } catch (error) {
      console.error('Error analyzing risks:', error);
      setResponseText('An error occurred while analyzing startup risks.');
    }
  };

  return (
    <div className="mode-container">
      <h2>Risk Mode</h2>
      <div className="input-container">
        <input
          type="text"
          placeholder="Describe your startup concern or question"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <button onClick={handleAnalyze}>Analyze Risks</button>
      </div>

      <div className="response-box">
        {responseText && responseText.replace(/\*/g, '').split('\n').map((line, idx) => (
          <p key={idx}>{line}</p>
        ))}
      </div>
    </div>
  );
}

export default RiskMode;
