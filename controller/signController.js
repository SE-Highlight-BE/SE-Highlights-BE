const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
require("dotenv").config();


const User = require("../models/user");
const { errorMonitor } = require("events");

exports.signup = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const error = new Error("Invalid Data");
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }
    const { userName, userNickName, userPwd, userPwdCheck } = req.body;

    const checkNickName = await User.findOne({ where: { userNickName } });

    if (checkNickName) {
      const error = new Error(`${userNickName} 은(는) 중복된 ID 입니다.`);
      error.statusCode = 422;
      throw error;
    }

    else if (userPwd!=userPwdCheck){
        const error = new Error("입력하신 비밀번호가 일치하지 않습니다.");
        error.statusCode = 400;
        throw error;
    }

    const hashPwd = await bcrypt.hash(userPwd, 12);

    const user = await User.create({
      userName: userName,
      userNickName: userNickName,
      userPwd: hashPwd,
    });

    res.status(201).json({ id: user.id, msg: "회원가입 완료" });
  } catch (error) {
    next(error);
  }
};
