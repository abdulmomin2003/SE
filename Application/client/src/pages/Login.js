// client/src/pages/Login.js
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../api/auth";
import Header from "../components/Header";
import "../styles/Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser({ email, password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      alert("Login Successful!");
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
    <>
      <Header />
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
        <div className="or-separator">OR</div>
        <a href="http://localhost:5000/api/auth/google" className="google-btn">
          Sign in with Google
        </a>
        <p>
          Don't have an account? <Link to="/register">Register Here</Link>
        </p>
      </div>
    </>
  );
}

export default Login;
