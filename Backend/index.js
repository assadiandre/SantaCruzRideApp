import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import { createRequire } from 'module';
import User from './Objects/user.js';
import getCoordsForAddress from './util/location.js';
import user from './Objects/user.js';
import url from 'url';

// Define "require"
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
  User.findById(id, (err, doc) => done(null, doc));
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
            lastname: profile.name.familyName,
            email: profile.emails[0].value,
            setupFlag: false,
            routes: [],
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
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Successful authentication, redirect to home

    // redirect after authentication
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
// finds account by ID, then updates the use with that ID with whatever fields
// were specified in req.body
app.put('/account/setup', async (req, res) => {
  if (req.user) {
    let coordinates;

    try {
      coordinates = await getCoordsForAddress(req.body.address);
    } catch (err) {
      console.log(err);
      res.send(err);
      return;
    }

    console.log('Address: ', req.body.address);
    console.log('Coords: ', coordinates);

    User.findByIdAndUpdate(
      req.user.id,
      {
        setupFlag: req.body.setupFlag,
        userType: req.body.userType,
        phoneNumber: req.body.phoneNumber,
        bio: req.body.bio,
        address: {
          address: req.body.address,
          location: coordinates,
        },
      },
      { safe: true, upsert: true, new: true },
      (err, doc) => {
        if (err) {
          // console.log(err);
          res.send(err);
        } else {
          // console.log('Updated User : ', docs);
          res.send(doc);
        }
      }
    );
  }
});

// Replace user's array of routes with the input array
app.put('/account/addroute', async (req, res) => {
  if (req.user) {
    // console.log('testing route adding');

    // Turn each route's location string into a Place object

    const routesToStore = [];

    for (let i = 0; i < req.body.routes.length; i++) {
      let offCampusCoordinates;
      let campusCoordinates;

      try {
        offCampusCoordinates = await getCoordsForAddress(
          req.body.routes[i].offCampusLocation
        );
      } catch (err) {
        console.log(err);
        res.send(err);
        return;
      }

      try {
        campusCoordinates = await getCoordsForAddress(
          req.body.routes[i].campusLocation
        );
      } catch (err) {
        console.log(err);
        res.send(err);
        return;
      }

      routesToStore.push({
        toCampus: req.body.routes[i].toCampus,
        days: req.body.routes[i].days,
        time: req.body.routes[i].time,
        campusLocation: {
          address: req.body.routes[i].campusLocation,
          location: campusCoordinates,
        },
        offCampusLocation: {
          address: req.body.routes[i].offCampusLocation,
          location: offCampusCoordinates,
        },
      });
    }

    // console.log(routesToStore);

    User.findByIdAndUpdate(
      req.user.id,
      {
        routes: routesToStore,
      },
      { safe: true, upsert: true, new: true },
      (err, doc) => {
        if (err) {
          console.log(err);
          res.send(err);
        } else {
          // console.log('Updated User : ', docs);
          res.send(doc);
        }
      }
    );
  }
});

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`));

// Endpoint to get all users filtered data
app.get('/feed/fill', (req, res) => {
  // first arg query: filters the collection were searching in
  // for now we filter by whether they're setup and that they are
  // not the current user

  // second arg projection: filters the fields that are returned
  // Here, we want to filter for the person's first name, phone number, bio
  // later we will also get their home location and routes

  // test route is the following:
  // to campus: false
  // days: 024
  // time: 8 am = 8 * 3600 = 28800

  // {$and: [{ setupFlag: true }, { _id: { $ne: req.user.id }]}
  // username: 1, phoneNumber: 1, bio: 1
  // console.log(req.user);
  if (req.user) {
    //console.log(req.query.route_index);
    User.find(
      {
        $and: [
          { setupFlag: true },
          { _id: { $ne: req.user.id } },
          { userType: { $ne: req.user.userType } },
        ],
      },
      { username: 1, phoneNumber: 1, bio: 1, routes: 1, email: 1, address: 1 }
    ).then((doc, err) => {
      if (err) throw err;

      // store scores in a dict with user's emails as the key
      // calculate the score as we itterate
      if (typeof req.query.route_index !== 'undefined') {
        var req_tocampus = req.user.routes[req.query.route_index].toCampus;
        var req_days = req.user.routes[req.query.route_index].days;
        var req_time = req.user.routes[req.query.route_index].time;
      } else {
        var req_tocampus = false;
        var req_days = [1, 3, 5];
        var req_time = 2800;
      }

      var scores = {};
      var saved = [0, 0];
      var curr_score = 0;
      var time_diff = 0;
      for (var i = 0; i < doc.length; i++) {
        saved = [0, 0];

        // itterate through the current user's routes
        for (var j = 0; j < doc[i].routes.length; j++) {
          curr_score = 0;

          // check if going the right way
          if (doc[i].routes[j].toCampus != req_tocampus) {
            continue;
          }

          // get number of matching days
          for (var k = 0; k < req_days.length; k++) {
            var found = doc[i].routes[j].days.indexOf(req_days[k]);
            if (found != -1) {
              curr_score++;
            }
          }

          // calculate time diff
          var time_diff = Math.abs(doc[i].routes[j].time - req_time);

          // calculate score if within some bounds, 24 for now lol
          if (time_diff < 3600 * 24) {
            // divide by the time diff it isn't 0, by 0.01 if it is
            curr_score = curr_score / (time_diff != 0 ? time_diff : 0.01);
          }

          // store score if it is higher
          if (curr_score > saved[0]) {
            saved[0] = curr_score;
            saved[1] = j;
          }
        }

        scores[doc[i].email] = saved; // store the best score
      }

      //console.log(scores);

      doc.sort((a, b) => scores[b.email][0] - scores[a.email][0]); // sort maximally

      // find first instance of zero
      var zero_index = doc.findIndex((user) => scores[user.email][0] === 0);

      // now filter out for the best route from each
      var route_index = 0;
      for (var i = 0; i < doc.length; i++) {
        route_index = scores[doc[i].email][1];
        doc[i].routes.splice(route_index, route_index + 1);
      }

      //console.log(zero_index);
      res.send(doc.splice({}, zero_index));
    });
  }
});
