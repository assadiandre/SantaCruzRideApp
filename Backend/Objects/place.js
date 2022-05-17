// https://github.com/ozgunabanoz/maps-project/blob/master/backend/model/place.js

const Place = {
  address: {
    type: String,
    required: true,
  },
  location: {
    lat: {
      type: Number,
      required: true,
    },
    lng: {
      type: Number,
      required: true,
    },
  },
};

export default Place;
