const express = require("express");
const bodyparser = require("body-parser");
const path = require("path");
const cors = require("cors");
const multer = require("multer");

const app = express();
app.use("/uploads", express.static("uploads"));
app.use(bodyparser.urlencoded({ extended: true }));
const jsonparser = bodyparser.json();
app.use(bodyparser.json());
app.use(cors());
app.use(express.json());

// disk storage engine gives you full control on storing files to disk
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    // Normally when using callbacks it's a common practice to make the first argument of a callback an error state.
    callback(null, "./uploads");
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
    console.log("helloooooos");
  },
});
// Below our const storage, we can initialize multer with multer() and pass storage in its storage property.
const upload = multer({ storage: storage });

module.exports = upload;
