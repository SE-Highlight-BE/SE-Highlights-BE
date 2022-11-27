const express = require("express");
const { body, check } = require("express-validator");

const signController = require("../controller/signController");

const router = express.Router();

router.get("/signIn", signController.signin);

router.post(
  "/signUp",
  [
    body("userName"),
    body("userNickName"),
    body("userPwd")
      .trim()
      .isLength({ min: 5 })
      .isAlphanumeric()
      .withMessage("Invalid password"),
  ],
  signController.signup
);

module.exports = router;