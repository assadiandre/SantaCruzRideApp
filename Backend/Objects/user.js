import mongoose from 'mongoose';
import Route from './route.js';

// change username to First Name and Last Name later
const user = new mongoose.Schema({
  googleId: {
    required: true,
    type: String,
  },
  username: {
    required: true,
    type: String,
  },
  lastname: {
    // required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
  },
  // Flag to check if the account has been set up for routing purposes. Initialized to false.
  setupFlag: {
    required: true,
    type: Boolean,
  },
  phoneNumber: {
    type: String,
  },
  bio: {
    type: String,
  },
  routes: {
    required: true,
    type: [Route],
  },
  userType: {
    type: String,
  },
  address: {
    type: String,
  },
});

export default mongoose.model('User', user);
