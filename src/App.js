import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import ScooterMap from "./views/scooterMap/ScooterMap";
import LoginPage from "./views/login/LoginPage";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [scooters, setScooters] = useState([]);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  useEffect(() => {
    if (isAuthenticated) {
      const fetchData = async () => {
        try {
          const response = await fetch("http://localhost:5000/api/scooter");
          const data = await response.json();
          setScooters(data);
        } catch (error) {
          console.error(
            "An error occurred while fetching the scooters:",
            error
          );
        }
      };

      fetchData();
    }
  }, [isAuthenticated]);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/scooter-map" replace />
            ) : (
              <LoginPage onLogin={handleLogin} />
            )
          }
        />
        <Route
          path="/scooter-map"
          element={
            isAuthenticated ? (
              <ScooterMap scooters={scooters} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;
