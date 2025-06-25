"use client";

import React, { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log("Posting to:", `${API_BASE_URL}/api/auth/login`);
      const res = await axios.post(`${API_BASE_URL}/api/auth/login`, {
        username,
        password,
      });
      setToken(res.data.token);
      setMessage('Logged in successfully!');
    } catch (err) {
      setMessage('Login failed.');
      console.error(err);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Login to Your App</h1>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        /><br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br />
        <button type="submit">Login</button>
      </form>

      <br />

      <button disabled={!token}>
        Access /read
      </button>

      <button disabled={!token}>
        Access /read
      </button>

      <p>{message}</p>
    </div>
  );
}

export default App;