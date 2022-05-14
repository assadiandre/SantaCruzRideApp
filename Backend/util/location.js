// https://github.com/ozgunabanoz/maps-project/blob/master/backend/util/location.js

import axios from 'axios';

// const HttpError = require('../model/http-error');

async function getCoordsForAddress(address) {
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${process.env.API_KEY}`
  );
  const { data } = response;

  if (!data || !data.results || data.status === 'ZERO_RESULTS') {
    throw 'No location matched input string';
  }

  const coordinates = data.results[0].geometry.location;

  return coordinates;
}

export default getCoordsForAddress;
