import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Retrieve the current user's details from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Logout function: clears user data and redirects to login
  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token'); // remove token if you're using it
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="logo">UDBHAVA</Link>
      </div>
      <div className="nav-right">
        <Link to="/validator">Validator mode</Link>
        <Link to="/risk">Risk mode</Link>
        <Link to="/planner">Planner mode</Link>
        <div 
          className="user-dropdown" 
          onClick={() => setDropdownVisible(!dropdownVisible)}
        >
          <span>User Profile</span>
          <div className={`dropdown-content ${dropdownVisible ? "visible" : ""}`}>
            {user ? (
              <>
                <p>Username: {user.name}</p>
                <p>Email: {user.email}</p>
                <button onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <p>No user logged in</p>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
