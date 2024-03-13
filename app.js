import express from "express";
import morgan from "morgan";
import tourRouter from "./routes/tourRoutes.js";
import userRouter from "./routes/userRoutes.js";
import dotenv from "dotenv";

// Loading the env file
dotenv.config({ path: "./config.env" });

const app = express();

//Middlewares-------
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
/* The express.json() middleware, when added to Express application,
parses the incoming request body containing JSON data and makes it accessible
in the request.body property.This allows you to easily work with the JSON data
in your route handlers. */
app.use(express.json());

//Routes----------
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

export default app;
