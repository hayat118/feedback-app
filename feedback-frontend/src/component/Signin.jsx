// SignIn.js

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../state/auth";
import { BASE_URL } from "../utils/constant";

const SignIn = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/employees/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        login(data.user);

        navigate("/list");
      } else {
        console.error("Failed to sign in");
      }
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  return (
    <div>
      <h2 className="h2">Sign In</h2>
      <form className="signin" onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;
