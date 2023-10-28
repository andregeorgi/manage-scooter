import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const ScooterMap = ({ scooters }) => {
  console.log(scooters);

  const mapStyles = {
    height: "100vh",
    width: "100%",
  };

  const defaultCenter = {
    lat: 45.76,
    lng: 21.22,
  };

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
            />
          );
        })}
      </GoogleMap>
    </LoadScript>
  );
};

export default ScooterMap;
