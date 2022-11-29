const express = require("express");

const videoController = require("../controller/videoController");
const router = express.Router();

// router.post("/create", videoController.create);
router.get("/", videoController.findAll);
router.get("/search", videoController.findAllTitle);

module.exports = router;
