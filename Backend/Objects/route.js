const Route = {
  toCampus: {
    required: true,
    type: Boolean,
  },
  days: {
    required: true,
    type: [String],
  },
  time: {
    required: true,
    type: Date,
  },
  offCampusLocation: {
    required: true,
    type: String,
  },
  campusLocation: {
    required: true,
    type: String,
  },
};

export default Route;
