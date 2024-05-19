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

  const newComment =
    {
      id: uuidv4(),
      name: "Anonymous",
      comment: req.body.comment,
      likes: "3",
      timestamp: Date.now(),
    };
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

router.delete("/:id/comments/:commentId", (req, res) => {
  const comments = getComments();
  const video = comments.find((video) => video.id === req.params.id);
  if (!video) {
    return res.status(404).send("Video not found");
  }
  const commentIndex = video.comments.findIndex((comment) => 
  comment.id === req.params.commentId);

  if(commentIndex === -1) {
    return res.status(404).send("Comment not found");
  }
  video.comments.splice(commentIndex, 1);

  fs.writeFileSync(
    "./data/video-details.json",
    JSON.stringify(comments, null, 2)
  );
  res.send("Comment with ID" + req.params.id + "has been deleted");
});

module.exports = router;
