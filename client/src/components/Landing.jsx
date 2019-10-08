import React from "react";
import PlacesAutocomplete from "react-places-autocomplete";
import { GoogleApiWrapper } from "google-maps-react";

const Landing = ({
  address,
  setAddress,
  handleSelect,
  placeId,
  coordinates
}) => {
  return (
    <PlacesAutocomplete
      value={address}
      onChange={setAddress}
      onSelect={handleSelect}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div>
          <p>Place ID: {placeId}</p>
          <p>Latitude: {coordinates.lat}</p>
          <p>Longitude: {coordinates.lng}</p>

          <input {...getInputProps({ placeholder: "Type address" })} />

          <div>
            {loading ? <div>...loading</div> : null}
            {suggestions.map(suggestion => {
              const style = {
                backgroundColor: suggestion.active ? "#41b6e6" : "#fff"
              };
              return (
                <div {...getSuggestionItemProps(suggestion, { style })}>
                  {suggestion.description}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyDHoSSopykjcVtpJm-Xzn4KeViNp1rgjGQ"
})(Landing);
