const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

// All of the MongoDB code below was taken from the tutorial provided in the Readme document
const { MongoClient } = require("mongodb");
// Make sure to put your database connection string below
const uri = "<YOUR_DATABASE_CONNECTION_STRING>";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const database = client.db("sample_mflix");
    const movies = database.collection("movies");
    // Query for a movie that has the title 'Back to the Future'
    const query = { title: "Back to the Future" };
    const movie = await movies.findOne(query);
    return movie;
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`));

// Example GET route
app.get("/express_backend", (req, res) => {
  res.send({ express: "YOUR EXPRESS BACKEND IS CONNECTED TO REACT" });
});

// Example GET route with MongoDB
app.get("/mongodbtest", (req, res) => {
  run()
    .then((response) => res.send({ data: response }))
    .catch(console.dir);
});
