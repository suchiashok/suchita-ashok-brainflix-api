const express = require("express");
const router = express.Router();
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

function getComments() {
  const comment = fs.readFileSync("./data/video-details.json");
  const parsedComment = JSON.parse(comment);
  return parsedComment;
}

router.post("/:id/comments", (req, res) => {
  if (!req.body.comment) {
    return res.status(400).send("There must be a comment");
  }

  const newComment = [
    {
      id: uuidv4(),
      name: "Anonymous",
      comment: req.body.comment,
      likes: "3",
      timestamp: Date.now(),
    },
  ];
  const comments = getComments();
  const video = comments.find((video) => video.id === req.params.id);
  if (!video) {
    return res.status(404).send("Video not found");
  }
  video.comments.push(newComment);

  fs.writeFileSync(
    "./data/video-details.json",
    JSON.stringify(comments, null, 2)
  );
  res.status(201).json(newComment);
});

module.exports = router;