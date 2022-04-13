const express = require('express');
// Require dotenv so that we can load values from our .env file
require('dotenv').config();

const cors = require('cors');
const session = require('express-session');
const passport = require('passport');

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
app.use(cors({ origin: `https://localhost:3000`, credentials: true }));
app.use(
  session({
    secret: 'secretcode',
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

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
