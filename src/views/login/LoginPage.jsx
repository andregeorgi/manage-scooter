import React, { useState } from "react";
import InputField from "../../components/InputField/InputField";
import Button from "../../components/BasicButton/BasicButton";

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not log in");
      }
      console.log("Login successful:", data);
      onLogin();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <div className="header">
        <h1>Login</h1>
      </div>
      <div className="form-content">
        <InputField
          value={username}
          label="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <InputField
          value={password}
          label="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button onClick={handleLogin} text="Log in" />
      </div>
    </div>
  );
};

export default LoginPage;
