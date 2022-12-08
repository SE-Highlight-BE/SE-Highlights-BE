const express = require("express");

const bookmarkController = require("../controller/bookmarkController");
const router = express.Router();
const auth = require("../middleware/auth");

router.post("/:videoID", auth, bookmarkController.bookmarkVideo);
router.get("/getList", auth, bookmarkController.getBookmark);
router.get("/stateBookmark", auth, bookmarkController.stateBookmark);

module.exports = router;
