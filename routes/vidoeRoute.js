const express = require("express");

const videoController = require("../controller/videoController");

const router = express.Router();

router.get("/:videoID", videoController.getVideo);

module.exports = router;