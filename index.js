const express = require("express");
const video = require("./routes/video");
const comments = require("./routes/comments");
const cors = require("cors");
require("dotenv").config();
const { PORT } = process.env;
const app = express();


app.use(cors());
app.use(express.json());
app.use("/videos", video);
app.use("/videos", comments);
app.use("/images", express.static(__dirname + "/public/images"));

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
 