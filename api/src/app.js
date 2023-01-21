const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require("morgan");
const routes = require("./routes/index.js");

require("./db.js");

const server = express();

server.name = "API";

server.use(express.json());
server.use(cookieParser());
server.use(morgan("dev"));
server.use(cors());

server.use("/", routes);

// Error catching endware.
server.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
