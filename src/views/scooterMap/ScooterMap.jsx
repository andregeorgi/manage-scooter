import React, { useState } from "react";
import Button from "../../components/BasicButton/BasicButton";

import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

const ScooterMap = ({ scooters, onScooterBooked }) => {
  const mapStyles = { height: "100vh", width: "100%" };
  const defaultCenter = { lat: 45.76, lng: 21.22 };

  const [selectedScooter, setSelectedScooter] = useState(null);

  const bookScooter = async (scooterId) => {
    try {
      const userId = "andrea";
      const response = await fetch(
        `http://localhost:5000/api/scooter/${scooterId}/book`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId }),
        }
      );

      if (!response.ok) {
        throw new Error("Could not book the scooter.");
      }

      const data = await response.json();

      onScooterBooked(data.scooter);

      setSelectedScooter(null);
    } catch (error) {
      console.error("Error booking scooter:", error);
    }
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyAyypPijd6Fm4aZaetmRIkfUjRs4Fm5hQY">
      <GoogleMap mapContainerStyle={mapStyles} zoom={13} center={defaultCenter}>
        {scooters.map((scooter) => {
          const latitude = parseFloat(scooter.location.latitude.$numberDecimal);
          const longitude = parseFloat(
            scooter.location.longitude.$numberDecimal
          );

          if (scooter.status === "booked") {
            return null;
          }

          return (
            <Marker
              key={scooter._id}
              position={{ lat: latitude, lng: longitude }}
              onClick={() => {
                setSelectedScooter(scooter);
              }}
            />
          );
        })}

        {selectedScooter && (
          <InfoWindow
            position={{
              lat: parseFloat(selectedScooter.location.latitude.$numberDecimal),
              lng: parseFloat(
                selectedScooter.location.longitude.$numberDecimal
              ),
            }}
            onCloseClick={() => {
              setSelectedScooter(null);
            }}
          >
            <div>
              <h2>{selectedScooter.name}</h2>
              <p>Battery Level: {selectedScooter.batteryLevel}%</p>
              <p>Status: {selectedScooter.status}</p>
              <button onClick={() => bookScooter(selectedScooter._id)}>
                Book this Scooter
              </button>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default ScooterMap;
