import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function Home() {
  const navigate = useNavigate();

  // Function to check if the user is logged in.
  // This example assumes a token stored in localStorage indicates an authenticated user.
  const isLoggedIn = () => {
    return !!localStorage.getItem('token');
  };

  // Handles button click for different modes.
  const handleModeClick = (mode) => {
    if (isLoggedIn()) {
      // Navigate to the specific mode page if logged in.
      navigate(`/${mode}`);
    } else {
      // Redirect to the login page if not logged in.
      navigate('/login');
    }
  };

  return (
    <div className="home-container">
      <h1 className="welcome-text">WELCOME TO UDBHAVA</h1>
      <p className="tagline">Where Ideas Earn Their Wings</p>
      
      <div className="mode-buttons">
        <button className="mode-button" onClick={() => handleModeClick('validator')}>
          Validator mode
        </button>
        <button className="mode-button" onClick={() => handleModeClick('risk')}>
          Risk mode
        </button>
        <button className="mode-button" onClick={() => handleModeClick('planner')}>
          Planner mode
        </button>
      </div>
    </div>
  );
}

export default Home;
