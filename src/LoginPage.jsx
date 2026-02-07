import React, { useState } from "react";
import WomenSafetyHome from "./WomenSafetyHome";
import "./LoginPage.css"; // <-- IMPORTANT

export default function LoginPage() {
  const [step, setStep] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (email === "user@example.com" && password === "123456") {
      setStep("home");
    } else {
      setError("Invalid email or password");
    }
  };

  if (step === "home") return <WomenSafetyHome />;

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <h1 className="login-title">SafeHer Login</h1>
        <p className="login-subtitle">Enter your credentials to continue</p>

        {error && <div className="error-box">{error}</div>}

        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="user@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="login-btn" onClick={handleLogin}>
          Login
        </button>

        <p className="demo-title">Demo Login:</p>
        <p className="demo-info">
          Email: <b>user@example.com</b> • Password: <b>123456</b>
        </p>
      </div>
    </div>
  );
}
