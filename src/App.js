import { useEffect, useState } from "react";
import "./App.css";
import ScooterMap from "./views/scooterMap/ScooterMap";

function App() {
  const [scooters, setScooters] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/scooter");
        const data = await response.json();
        setScooters(data);
      } catch (error) {
        console.error("An error occurred while fetching the scooters:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <ScooterMap scooters={scooters} />
    </div>
  );
}

export default App;
