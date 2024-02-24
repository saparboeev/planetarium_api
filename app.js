const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");

const connectDb = require("./config/db");

//Initialize env variables
dotenv.config();

//Connect to Database //
connectDb();

//App instance from express
const app = express();

//Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
}

app.use("/api/v1/auth", require("./routes/auth.route"));
app.use("/api/v1/star", require("./routes/star.route"));
app.use("/api/v1/planet", require("./routes/planet.route"));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(
    `Server listening on ${process.env.NODE_ENV} mode, on PORT: ${PORT}`.white
      .bold
  );
});
