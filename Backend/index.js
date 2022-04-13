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
app.use(cors({ origin: `https://localhost:3000`, credentials: true })); // Frontend Port?
app.use(
  session({
    secret: 'secretcode',
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: 'https://www.example.com/oauth2/redirect/google',
  scope: [ 'profile' ],
  state: true
},
function(accessToken, refreshToken, profile, cb) {
  db.get('SELECT * FROM federated_credentials WHERE provider = ? AND subject = ?', [
    'https://accounts.google.com',
    profile.id
  ], function(err, cred) {
    if (err) { return cb(err); }
    if (!cred) {
      // The account at Google has not logged in to this app before.  Create a
      // new user record and associate it with the Google account.
      db.run('INSERT INTO users (name) VALUES (?)', [
        profile.displayName
      ], function(err) {
        if (err) { return cb(err); }

        var id = this.lastID;
        db.run('INSERT INTO federated_credentials (user_id, provider, subject) VALUES (?, ?, ?)', [
          id,
          'https://accounts.google.com',
          profile.id
        ], function(err) {
          if (err) { return cb(err); }
          var user = {
            id: id,
            name: profile.displayName
          };
          return cb(null, user);
        });
      });
    } else {
      // The account at Google has previously logged in to the app.  Get the
      // user record associated with the Google account and log the user in.
      db.get('SELECT * FROM users WHERE id = ?', [ cred.user_id ], function(err, user) {
        if (err) { return cb(err); }
        if (!user) { return cb(null, false); }
        return cb(null, user);
      });
    }
  };
}
));

// async function run() {
//   try {
//     await client.connect();
//     const database = client.db('sample_mflix');
//     const movies = database.collection('movies');
//     // Query for a movie that has the title 'Back to the Future'
//     const query = { title: 'Back to the Future' };
//     const movie = await movies.findOne(query);
//     return movie;
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/', (req, res) => {
  res.send('Hello world');
});

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
