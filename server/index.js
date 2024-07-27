// import express
const express = require("express");

// create an instance of express called app
const app = express();

const router = require("./routes");
app.use("/api", router);

// create a port variable
const port = 3050;

// listen to our server on our localhost
app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
