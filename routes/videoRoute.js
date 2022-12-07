const express = require("express");

const videoController = require("../controller/videoController");
const router = express.Router();
const auth = require("../middleware/auth");

// router.post("/create", videoController.create);
router.get("/", auth, videoController.findAll);
router.get("/search", auth, videoController.findAllTitle);
router.get("/random", auth, videoController.findSome);
router.get("/one", auth, videoController.findOne);
router.post("/create", auth, videoController.create);

module.exports = router;
