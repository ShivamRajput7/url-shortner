const express = require("express");
const cookieParser = require("cookie-parser");
const { connectMongoDb } = require("./connection");
const urlRouter = require("./routes/url");
const staticUrl = require("./routes/staticRoutes");
const userRouter = require("./routes/user");
const authRequirePages = require("./routes/authRequirePage");
const path = require("path");
const { port } = require("./url");
const { allowTo, loginCheck } = require("./middleware/auth");
const crypto = require("crypto");
const app = express();

// const port = 8001;

connectMongoDb("mongodb://127.0.0.1:27017/url")
  .then(() => {
    console.log("Mongo DB connected Succesfully");
  })
  .catch((err) => {
    console.log("Connection Failed:", err);
  });
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", staticUrl);
app.use("/analytics", loginCheck, authRequirePages);
app.use("/url", urlRouter);
app.use("/user", userRouter);

app.listen(port, () => {
  console.log("Server is running on Port:", port);
});
