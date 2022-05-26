import React, { useEffect, useRef, useState } from 'react';
import { FormControl } from 'react-bootstrap';
const GPlace = ({ onChange, defaultValue }) => {
  const placeInputRef = useRef(null);
  const [place, setPlace] = useState(null);
  useEffect(() => {
    initPlaceAPI();
  }, []);

  // initialize the google place autocomplete
  const initPlaceAPI = () => {
    let autocomplete = new window.google.maps.places.Autocomplete(
      placeInputRef.current
    );
    new window.google.maps.event.addListener(
      autocomplete,
      'place_changed',
      function () {
        let place = autocomplete.getPlace();
        setPlace({
          address: place.formatted_address,
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        });
        onChange(place.formatted_address);
      }
    );
  };
  return (
    <FormControl type="text" defaultValue={defaultValue} ref={placeInputRef} />
  );
};

export default GPlace;
