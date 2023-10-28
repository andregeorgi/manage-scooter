import React, { useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

const ScooterMap = ({ scooters }) => {
  const mapStyles = { height: "100vh", width: "100%" };
  const defaultCenter = { lat: 45.76, lng: 21.22 };
  console.log(scooters); // Add this in your ScooterMap component to check the received data

  const [selectedScooter, setSelectedScooter] = useState(null);

  return (
    <LoadScript googleMapsApiKey="AIzaSyAyypPijd6Fm4aZaetmRIkfUjRs4Fm5hQY">
      <GoogleMap mapContainerStyle={mapStyles} zoom={13} center={defaultCenter}>
        {scooters.map((scooter) => {
          const latitude = parseFloat(scooter.location.latitude.$numberDecimal);
          const longitude = parseFloat(
            scooter.location.longitude.$numberDecimal
          );
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
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default ScooterMap;
