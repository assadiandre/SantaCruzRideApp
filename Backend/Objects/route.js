import Place from './place.js';

const Route = {
  toCampus: {
    required: true,
    type: Boolean,
  },
  days: {
    required: true,
    type: [Number],
  },
  time: {
    required: true,
    type: Date,
  },
  offCampusLocation: {
    required: true,
    type: Place, // change to Place
  },
  campusLocation: {
    required: true,
    type: Place, // change to Place
  },
};

export default Route;
