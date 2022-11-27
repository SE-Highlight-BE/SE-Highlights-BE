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

    const checkName = await User.findOne({ where: { userName } });
    const checkNickName = await User.findOne({ where: { userNickName } });

    if (checkName) {
      const error = new Error(`${userName} 은(는) 중복된 ID 입니다.`);
      error.statusCode = 422;
      throw error;
    }

    else if (checkNickName) {
      const error = new Error(`${userNickName} 은(는) 중복된 닉네임 입니다.`);
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

exports.signin = async (req, res, next) => {
  try {
    const { userName, userPwd } = req.body;
    const user = await User.findOne({ where: { userName }});
    
    if (!user) {
      const error = new Error("등록되지 않은 사용자 입니다.");
      error.statusCode = 403;
      throw error;
    }

    const isPwd = await bcrypt.compare(userPwd, user.userPwd);

    if (!isPwd) {
      const error = new Error("비밀번호가 틀렸습니다.");
      error.statusCode = 403;
      throw error;
    }

    const token = jwt.sign(
      { userName: userName },
        process.env.JWT_TOKEN,{
          expiresIn: '3h'
        }
    );

    res.cookie('userName', token)
    res
      .status(200)
      .json({ msg: "로그인 성공", token: token })
  } catch (err){
    next(err);
  }
};