const express = require('express');

const commentController = require("../controller/commentController");
const router = express.Router();
const auth = require("../middleware/auth");

router.post("/comment", auth, commentController.addComment);

router.get("/deleteComment/:id", auth, commentController.deleteComment);

router.get("/getComment/:userID", auth, commentController.getComment);

module.exports = router;