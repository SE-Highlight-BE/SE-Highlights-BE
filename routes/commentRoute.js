const express = require("express");

const commentController = require("../controller/commentController");
const router = express.Router();
const auth = require("../middleware/auth");

router.post("/comment", auth, commentController.addComment);

router.delete("/comment", auth, commentController.deleteComment);

router.get("/getUserComment", auth, commentController.getUserComment);

router.get(
  "/getVideoComment/:videoID",
  auth,
  commentController.getVideoComment
);

module.exports = router;
