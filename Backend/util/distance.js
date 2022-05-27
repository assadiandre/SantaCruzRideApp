import axios from 'axios';
import qs from 'qs';

// https://stackoverflow.com/questions/49944387/how-to-correctly-use-axios-params-with-arrays

async function getDistances(O, D) {
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/distancematrix/json`,
    {
      params: {
        origins: [O],
        destinations: [D],
        travelMode: 'driving',
        units: 'imperial',
        key: process.env.API_KEY,
      },
      paramsSerializer: (params) => {
        return qs.stringify(params, { arrayFormat: 'repeat' });
      },
    }
  );

  if (typeof response !== 'undefined') {
    let rows = response.data.rows;
    return rows[0].elements[0].distance.text;
  }
}

export default getDistances;
