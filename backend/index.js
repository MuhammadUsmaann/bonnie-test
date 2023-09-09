require("dotenv").config();

const PORT = process.env.DATA_API_PORT || 5050;

console.log("Assignment Task PORT : ", PORT);
const compress = require("compression");
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();


require("./db");

//Routers
const routes = require("./routes");
app.use(compress());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(
  express.urlencoded({ limit: "50mb", extended: false, parameterLimit: 50000 })
);

//Path for public static files
app.use("/", express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "uploads")));

// CORS requests
app.use(
  cors({
    origin: "*",
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  })
);

//routers
app.use("/", routes);

// error handler
app.use(async (err, req, res, next) => {
  console.log(err);
  const { code, status, message } = err;
  const xcode = code || status || 500;
  res.status(xcode).send({ code: xcode, message });
});

if (!module.parent) {
  // set port, listen for requests
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
}
module.exports = app;
