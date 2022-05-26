import axios from 'axios';

// https://stackoverflow.com/questions/49944387/how-to-correctly-use-axios-params-with-arrays

async function getDistances(O, D) {
  const response = await axios
    .get('https://maps.googleapis.com/maps/api/distancematrix/json', {
      params: {
        origins: O,
        destinations: D,
        travelMode: 'driving',
        key: process.env.API_KEY,
      },
      paramsSerializer: (params) => {
        return qs.stringify(params);
      },
    })
    .then((res) => {
      if (res.data) {
        console.log('res data', res.data);
        // var distances = []

        // for (var element = 0; element < distances.rows.lenghth; element++) {
        //     distances.push()
        // }
        return res.data;
      }
    });
}

export default getDistances;
