const express = require('express');
// Require dotenv so that we can load values from our .env file
require('dotenv').config();

const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const app = express();
const port = process.env.PORT || 5000;

// All of the MongoDB code below was taken from the tutorial provided in the Readme document
const mongoose = require('mongoose');
// Make sure to put your database connection string below
const uri = process.env.DB_CONNECTION_STRING;
mongoose.connect(uri, {}, () => {
  console.log('Connected to mongoose successfully');
});

// Middleware
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000', credentials: true })); // Frontend Port.
app.use(
  session({
    secret: 'secretcode',
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => done(null, user));

passport.deserializeUser((user, done) => done(null, user));

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
      // scope: [ 'profile' ],
      // state: true
    },
    (accessToken, refreshToken, profile, cb) => {
      // Called on successful authentication
      // Inset into Database (TODO)
      console.log(profile);
      cb(null, profile);
    }
  )
);

app.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile'] })
);

app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, redirect home
    res.redirect('http://localhost:3000');
  }
);

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.get('/getuser', (req, res) => {
  res.send(req.user);
});

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`));

// // Example GET route
// app.get('/express_backend', (req, res) => {
//   res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
// });

// // Example GET route with MongoDB
// app.get('/mongodbtest', (req, res) => {
//   run()
//     .then((response) => res.send({ data: response }))
//     .catch(console.dir);
// });
