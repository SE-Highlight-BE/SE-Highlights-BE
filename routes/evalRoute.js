const express = require('express');

const evalController = require("../controller/evalController");
const router = express.Router();
const auth = require("../middleware/auth");

router.post("/:videoID", auth, evalController.likeVideo);

module.exports = router;