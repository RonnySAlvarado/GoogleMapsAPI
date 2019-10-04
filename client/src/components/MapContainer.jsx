import React from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

const mapStyles = {
  width: "100%",
  height: "100%"
};

const MapContainer = props => {
  return (
    <Map
      google={props.google}
      zoom={8}
      style={mapStyles}
      initialCenter={{ lat: 47.444, lng: -122.176 }}
    />
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyDHoSSopykjcVtpJm-Xzn4KeViNp1rgjGQ"
})(MapContainer);
