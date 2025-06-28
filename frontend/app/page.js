"use client";

import { useEffect, useState } from "react";
import Link from 'next/link';

const API_URL = "http://localhost:3001"; // Update if needed

// ---- Auth Functions ----

async function register({ name, email, password_hash }) {
  const response = await fetch(`${API_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password_hash }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "Registration failed");
  }

  localStorage.setItem("token", data.token);
  return data;
}

async function login({ username, password }) {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }

  localStorage.setItem("token", data.token);
  return data;
}

function getToken() {
  return localStorage.getItem("token");
}

async function fetchWithAuth(url, options = {}) {
  const token = getToken();
  return fetch(url, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${token}`,
    },
  });
}

// ---- UI Component ----

export default function AuthPage() {
  const [mode, setMode] = useState("login"); // "login" or "register"
  const [token, setToken] = useState('');
  const [form, setForm] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const stored = typeof window !== "undefined" && localStorage.getItem("token");
    setToken(stored);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      if (mode === "login") {
        await login({ username: form.username, password: form.password });
        setMessage("✅ Logged in successfully");
      } else {
        await register({
          name: form.username,
          email: form.email,
          password_hash: form.password,
        });
        setMessage("✅ Registered successfully");
      }
    } catch (err) {
      setMessage(`❌ ${err.message}`);
    }
  };

  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>{mode === "login" ? "Login" : "Register"}</h1>

      <form onSubmit={handleSubmit} style={{ maxWidth: "300px" }}>
        <div style={{ marginBottom: "0.5rem" }}>
          <input
            name="username"
            type="text"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            required
          />
        </div>
        {mode === "register" && (
          <div style={{ marginBottom: "0.5rem" }}>
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
        )}
        <div style={{ marginBottom: "0.5rem" }}>
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" style={{ width: "100%", marginBottom: "1rem" }}>
          {mode === "login" ? "Log In" : "Register"}
        </button>
      </form>

      <button onClick={() => setMode(mode === "login" ? "register" : "login")}>
        Switch to {mode === "login" ? "Register" : "Login"}
      </button>

      <Link href="/auctions">
      <button disabled={!token}>
        Go to auctions service
      </button>
      </Link>

      <Link href="/bids">
      <button disabled={!token}>
        Go to bids service
      </button>
      </Link>

      {message && <p style={{ marginTop: "1rem" }}>{message}</p>}
    </main>
  );
}