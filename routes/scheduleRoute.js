const express = require("express");

const scheduleController = require("../controller/scheduleController");
const router = express.Router();
const auth = require("../middleware/auth");

router.get("/", auth, scheduleController.findAll);
router.get("/date/:date", auth, scheduleController.findDate);

module.exports = router;
