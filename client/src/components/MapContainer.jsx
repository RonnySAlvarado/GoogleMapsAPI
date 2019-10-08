import React, { useEffect, useState } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
// import { geocodeByAddress, getLatLng } from "react-places-autocomplete";

const mapStyles = {
  width: "100%",
  height: "80%"
};

const MapContainer = ({
  coordinates,
  placeId,
  locations,
  setLocations,
  google
}) => {
  const fetchPlaces = (mapProps, map) => {
    const { google } = mapProps;
    let service = new google.maps.places.PlacesService(map);

    let request = {
      location: coordinates,
      id: placeId,
      // rating: result.rating,
      // icon: result.icon,
      // photos: result.photos,
      radius: "500",
      query: "Cafe"
    };
    let callback = (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        let nearbyCafes = results.map(place => {
          let nearbyCafeObj = {
            name: place.name,
            icon: !place.photos // Loads an img if it has one, if not it uses default google icon
              ? place.icon
              : place.photos[0].getUrl({
                  maxWidth: 100
                }),
            id: place.place_id,
            address: place.formatted_address,
            rating: place.rating,
            pos: {
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng()
            }
          };
          return nearbyCafeObj;
        });
        setLocations(nearbyCafes);
        console.log(nearbyCafes);
      }
    };
    // PlaceService has the `textSearch` method
    service.textSearch(request, callback);
  };

  useEffect(() => {
    console.log(locations);
  }, [locations]);

  return (
    <Map
      google={google}
      onReady={fetchPlaces}
      zoom={8}
      style={mapStyles}
      initialCenter={coordinates}
    >
      {locations.map(loc => {
        return <Marker position={loc.pos} />;
      })}
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyDHoSSopykjcVtpJm-Xzn4KeViNp1rgjGQ"
})(MapContainer);
