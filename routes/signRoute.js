const express = require("express");
const { body, check } = require("express-validator");

const signController = require("../controller/signController");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/signIn", signController.signin);

router.post("/signUp", signController.signup);

router.get("/signOut", auth, signController.signout);

router.post("/deleteAccount", auth, signController.deleteAccount);

module.exports = router;
