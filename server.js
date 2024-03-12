import app from "./app.js";
import mongoose from "mongoose";

const port = process.env.PORT || 3000;
const compassDB = process.env.COMPASS;

//Connection to mongodb
mongoose
  .connect(compassDB)
  .then((con) => {
    console.log("Db connection sucessfull");
  })
  .catch((err) => {
    console.log("Db connection error", err);
  });

//Start the server--------
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
