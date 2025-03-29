import React, { useState } from 'react';
import { validateIdea } from '../services/api'; // Adjust the path to your API service
import './Chat.css'; // Optional CSS for styling
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

function ValidatorMode() {
  const [userInput, setUserInput] = useState('');
  const [responseText, setResponseText] = useState('');
  const navigate = useNavigate();

  const handleValidate = async () => {
    try {
      // Retrieve user data from localStorage
      const storedUser = localStorage.getItem('user');
      if (!storedUser) {
        alert('User not logged in.');
        navigate('/login'); 
        return;
      }
      const user = JSON.parse(storedUser);

      // Call the validateIdea function with user ID and message
      const data = await validateIdea(user.id, userInput);
      // data.reply should contain the AI response text
      setResponseText(data.reply);
    } catch (error) {
      console.error('Error during validation:', error);
      setResponseText('An error occurred while validating your idea.');
    }
  };

  return (
    <div className="mode-container">
      <h2>Validator Mode</h2>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter your startup idea or question"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <button onClick={handleValidate}>Validate</button>
      </div>

      {/* Response display */}
      <div className="response-box">
        {responseText && (
          responseText
          .replace(/\*/g, '')
            // Split the AI response by newline characters
            .split('\n')
            .map((line, index) => (
              <p key={index}>{line}</p>
            ))
        )}
      </div>
    </div>
  );
}

export default ValidatorMode;
