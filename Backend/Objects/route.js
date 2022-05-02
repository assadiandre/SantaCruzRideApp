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
    type: String,
  },
  offCampusLocation: {
    required: true,
    type: String,
  },
  onCampusLocation: {
    required: true,
    type: String,
  },
};

export default Route;
