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
    type: Number,
  },
  offCampusLocation: {
    required: true,
    type: Place, // change to Place
  },
  onCampusLocation: {
    required: true,
    type: Place, // change to Place
  },
};

export default Route;
