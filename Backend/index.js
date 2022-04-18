import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import User from './User.js';

// Define "require"
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// load values from our .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// All of the MongoDB code below was taken from the tutorial provided in the Readme document

// Make sure to put your database connection string below
const uri = process.env.DB_CONNECTION_STRING;
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
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
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // One week
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// only serialize ID
passport.serializeUser((user, done) => done(null, user._id));

passport.deserializeUser((id, done) => {
  User.findById(id, (err, doc) => {
    return done(null, doc);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
    },
    (_, __, profile, cb) => {
      // Called on successful authentication
      // console.log(profile);

      // Insert into Database
      User.findOne({ googleId: profile.id }, async (err, doc) => {
        // return an error if there is one
        if (err) {
          return cb(err, null);
        }

        if (!doc) {
          // If no user created yet, create one
          const newUser = new User({
            googleId: profile.id,
            username: profile.name.givenName,
            setupFlag: false,
          });

          await newUser.save();
          cb(null, newUser);
        } else {
          cb(null, doc);
        }
      });
    }
  )
);

// Auth endpoints
app.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile'] })
);

app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, redirect to home
    res.redirect('http://localhost:3000');
  }
);

app.get('/auth/logout', (req, res) => {
  if (req.user) {
    req.logout();
    res.send('Logout successful');
  }
});

// Dummy endpoint
app.get('/', (req, res) => {
  res.send('Hello world');
});

app.get('/getuser', (req, res) => {
  res.send(req.user);
});

// Account setup endpoint
app.put('/account/setup', (req, res) => {
  console.log(req.body);
  console.log(req.user);
  if (req.user) {
    User.findByIdAndUpdate(req.user.id, req.body).then(() => {
      // res.send(user);
    });
  }
});

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`));
