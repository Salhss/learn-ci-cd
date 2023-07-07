if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 3000;
const errorHandler = require("./middleware/errorHandler");
const router = require("./routes/route");

// -- MIDDLEWARE --
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(router);
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

module.exports = { app, PORT };
