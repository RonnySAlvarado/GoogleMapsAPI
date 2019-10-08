import React, { useState } from "react";
import MapContainer from "./components/MapContainer.jsx";
import { Route, Link } from "react-router-dom";
import "./App.css";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import Landing from "./components/Landing.jsx";

function App() {
  const [address, setAddress] = useState(""); //ChIJJ61u3ZsmQYYRwYz9_mgRu2o
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
  const [placeId, setPlaceId] = useState("");
  const [locations, setLocations] = useState([]);

  const handleSelect = async value => {
    const result = await geocodeByAddress(value);
    const latLng = await getLatLng(result[0]);
    console.log(result[0].place_id);
    setPlaceId(result[0].place_id);
    setAddress(value);
    setCoordinates(latLng);
  };

  return (
    <div className="App">
      <Link to="/">Landing Page</Link>
      <Link to="/mapcontainer">Home</Link>
      <Route
        exact
        path="/"
        render={props => (
          <Landing
            {...props}
            handleSelect={handleSelect}
            address={address}
            setAddress={setAddress}
            setCoordinates={setCoordinates}
            setPlaceId={setPlaceId}
            coordinates={coordinates}
            placeId={placeId}
          />
        )}
      />
      <Route
        exact
        path="/mapcontainer"
        render={props => (
          <MapContainer
            {...props}
            address={address}
            coordinates={coordinates}
            placeId={placeId}
            locations={locations}
            setLocations={setLocations}
          />
        )}
      />
    </div>
  );
}

export default App;
