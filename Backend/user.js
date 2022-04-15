import mongoose from 'mongoose';

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
});

export default mongoose.model('User', user);
