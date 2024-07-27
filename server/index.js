// create an instance of express called app

const app = require("./routes");

// create a port variable
const port = 3050;

// listen to our server on our localhost
app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
