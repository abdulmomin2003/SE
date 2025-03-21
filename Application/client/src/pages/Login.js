// client/src/pages/Login.js
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../api/auth";
import "../styles/Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Expecting loginUser to return an object with token and role
      const data = await loginUser({ email, password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      alert("Login Successful!");
      // Redirect based on role: if owner, go to Owner Dashboard; else, home page.
      if (data.role === "owner") {
        navigate("/owner-dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      alert(error.message || "Login failed");
    }
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      <form onSubmit={handleLogin} className="login-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="btn">
          Login
        </button>
      </form>
      <p>
        Don't have an account? <Link to="/register">Register Here</Link>
      </p>
    </div>
  );
}

export default Login;
