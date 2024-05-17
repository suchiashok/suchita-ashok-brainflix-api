const express = require("express");
const router = express.Router();
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

function getVideos() {
  const videoData = fs.readFileSync("./data/video-details.json");
  const parsedData = JSON.parse(videoData);
  return parsedData;
}

router.get("/", (req, res) => {
  const videos = getVideos();
  res.json(videos);
});

router.get("/:id", (req, res) => {
  const videos = getVideos();
  const requestedId = req.params.id;
  const singleVideo = videos.find((video) => video.id === requestedId);
  res.json(singleVideo);

  if (singleVideo) {
    res.json(singleVideo);
  } else {
    res.status(404).json({ message: "Video not found" });
  }
});

router.post("/", (req,res) => {
    if(!req.body.title) {
       return res.send(400).send("There must be a title");
    }

    if(req.body.title.length < 3) {
       return res.send(400.).send("Title must be greater than 3 characters");
    }

    const newVideo = {
        id: uuidv4(),
        title: req.body.title,
        content: req.body.content,
    }

    const videos = getVideos();
    videos.push(newVideo);

    fs.writeFileSync("./data/video-details.json", JSON.stringify(videos, null, 2));
    res.status(201).json(newVideo);
})

module.exports = router;
