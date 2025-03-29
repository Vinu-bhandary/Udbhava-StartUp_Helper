import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api'; // Ensure you have created this function in your API service file.
import '../App.css'; // Adjust styling as needed.

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call the login API endpoint
      const userData = await login(email, password);
      // Save user data and token (if applicable) in localStorage
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', 'dummy-token'); // Replace with actual token if provided by your backend
      // Redirect to home page or a protected route
      navigate('/');
    } catch (err) {
      console.error('Login error:', err);
      setError('Login failed, please check your credentials and try again.');
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input 
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your.email@example.com"
          required
        />
        <label>Password</label>
        <input 
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          required
        />
        <button type="submit">Login</button>
        <p>Don't have an account? <a href="/signup">Sign Up</a></p>
      </form>
    </div>
  );
}

export default Login;
