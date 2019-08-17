const express = require("express");
const bodyParser = require("body-parser");

//create express app
const app = express();

//parse request of content-type - application/x-www-from-urlencode
app.use(bodyParser.urlencoded({ extended: true }));

//par request of content-ype application/josn
app.use(bodyParser.json());

//configguring the database
const dbConfig = require("./config/database.config");
const mongoose = require("mongoose");

mongoose.Promise - global.Promise;

//Connecting to the data base
mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch(err => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });

// Require Notes routes
require("./app/routes/note.routes.js")(app);

// define a simple route
app.get("/", (req, res) => {
  res.json({
    message:
      "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."
  });
});

app.listen(3000, () => {
  console.log("App listening on port 3000!");
});
