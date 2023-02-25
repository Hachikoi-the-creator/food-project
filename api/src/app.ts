import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import { ErrorRequestHandler } from "express";
// import routes from "./routes/index.js";
import morgan from "morgan";
require("dotenv").config();

// const PORT = process.env.PORT || 1313;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(cors());
// app.use("/", routes);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const status: number = err.status || 500;
  const message: string = err.message || err;
  console.error(err);
  res.status(status).send(message);
};

app.use(errorHandler);

app.listen(1313, () => {
  console.log("Server is running on port 1313");
});

export default app;
