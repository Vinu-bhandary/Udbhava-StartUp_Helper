// src/services/api.js

// Adjust the BASE_URL if your Django server runs on a different host or uses /api prefix.
const API_BASE_URL = 'http://127.0.0.1:8000';

//
// 1. Login
//
export async function login(email, password) {
  // Using a GET request with query parameters
  const response = await fetch(`${API_BASE_URL}/login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`);
  if (!response.ok) {
    throw new Error('Login failed');
  }
  return response.json(); // Expected to return { id, name, email } or 400
}

//
// 2. Register
//
export async function register(userData) {
  // userData = { name, email, password } or whatever your schema requires
  const response = await fetch(`${API_BASE_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    throw new Error('Registration failed');
  }
  return response.json(); // Expected to return { id, name, email } (UserSchema)
}

//
// 3. Validate Idea
//
export async function validateIdea(user_id, message) {
  const response = await fetch(`${API_BASE_URL}/validate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user_id, message }),
  });
  if (!response.ok) {
    throw new Error('Idea validation failed');
  }
  return response.json(); // Expected to return { reply: "...", ... }
}

//
// 4. Analyze Risks
//
export async function analyzeRisks(user_id, message) {
  const response = await fetch(`${API_BASE_URL}/risks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user_id, message }),
  });
  if (!response.ok) {
    throw new Error('Risk analysis failed');
  }
  return response.json(); // Expected to return { reply: "...", ... }
}

//
// 5. Plan Guidance
//
export async function planGuidance(user_id, message) {
  const response = await fetch(`${API_BASE_URL}/plan`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user_id, message }),
  });
  if (!response.ok) {
    throw new Error('Planner guidance failed');
  }
  return response.json(); // Expected to return { reply: "...", ... }
}

//
// 6. Get Chat History
//
export async function getHistory(user_id) {
  const response = await fetch(`${API_BASE_URL}/history?user_id=${user_id}`);
  if (!response.ok) {
    throw new Error('Fetching chat history failed');
  }
  return response.json(); // Expected to return an array of chats
}
