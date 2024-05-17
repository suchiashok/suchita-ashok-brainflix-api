const express = require("express");
const video = require("./routes/video");
const cors = require("cors");
require("dotenv").config();
const { PORT } = process.env;
const app = express();

app.use(cors());

app.use(express.json());

app.use("/videos", video);


app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
