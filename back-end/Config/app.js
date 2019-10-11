const express = require("express");
const bodyParser = require("body-parser");
const cros = require('cors');

require("dotenv").config();

global.Env = process.env;

const app = express();

//parseJson
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(cros());

app.use(bodyParser.json());

app.use("/static", express.static("Uploads"));

const http = require("http").Server(app);

// For http
http.listen(Env.PORT, () => {
  console.log("Server is running: " + Env.PORT);
});

module.exports = app;
