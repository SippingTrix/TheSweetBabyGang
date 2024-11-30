const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();
const cors = require("cors");
const routes = require("./routes/api");
const mkroutes = require("./routes/mkapi");
const akroutes = require("./routes/akapi");
const miscroutes = require("./routes/miscapi");

const videoRoutes = require("./routes/video"); // Import video routes

// Port
const port = process.env.PORT || 9000;

app.use(
  cors({
    origin: "*", // Allow all origins
    methods: "GET,POST,PUT,DELETE", // Allow common HTTP methods
    allowedHeaders:
      "Origin, X-Requested-With, Content-Type, Accept, Authorization" // Allow common headers
  })
);

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", routes);
app.use("/api", mkroutes);
app.use("/api", miscroutes);
app.use("/api", akroutes);

app.use("/api", videoRoutes); // Add video routes to the API

app.use((err, req, res, next) => {
  console.log(err);
  next();
});

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
