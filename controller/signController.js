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

    if (userName.length > 15){
      res.json({msg: "ID는 15자 이하여야 합니다."});
      return;
    }

    else if (userPwd.length > 15){
      res.json({msg: "비밀번호는 15자 이하여야 합니다."});
      return;
    }

    else if (checkName) {
      res.json({msg: `${userName} 은(는) 중복된 ID 입니다.`});
      return;
    }

    else if (checkNickName) {
      res.json({msg: `${userNickName} 은(는) 중복된 닉네임 입니다.`});
      return;
    }

    else if (userPwd!=userPwdCheck){
      res.json({ error :"입력한 비밀번호가 일치하지 않습니다."});
      return;
    }

    const hashPwd = await bcrypt.hash(userPwd, 12);

    const user = await User.create({
      userName: userName,
      userNickName: userNickName,
      userPwd: hashPwd,
    });

    res.status(201).json({ id: user.id, msg: "정상적으로 회원가입이 완료되었습니다." });
  } catch (error) {
    next(error);
  }
};

exports.signin = async (req, res, next) => {
  try {
    const { userName, userPwd } = req.body;
    const user = await User.findOne({ where: { userName }});
    
    if (!user) {
      res.json({ error :"등록되지 않은 사용자 입니다."});
    }

    const isPwd = await bcrypt.compare(userPwd, user.userPwd);

    if (!isPwd) {
      res.json({ error :"비밀번호가 일치하지 않습니다."});
    }

    const token = jwt.sign(
      { userID: user.userID },
        process.env.JWT_TOKEN,{
          expiresIn: '3h'
        }
    );

    res.cookie('userID', token)
    res
      .status(200)
      .json({ msg: "정상적으로 로그인 되었습니다.", token: token })
  } catch (err){
    next(err);
  }
};

exports.signout = async (req, res, next) => {
  try {
    res.clearCookie('userID')
      .json({ msg: "정상적으로 로그아웃 되었습니다." });
  } catch (err){
    next(err);
  }
};

exports.deleteAccount = async (req, res, next) => {
  try {

    const clientToken = req.cookies.userID;
    const decodedID = jwt.verify(clientToken, process.env.JWT_TOKEN);

    const userID = decodedID.userID;

    const { userPwd } = req.body;
    const user = await User.findOne({ where: { userID }});
    
    const isPwd = await bcrypt.compare(userPwd, user.userPwd);

    if (!isPwd) {
      res.json({ error :"비밀번호가 일치하지 않습니다."})
    }

    const deleteUser = await User.destroy({where: { userID: userID }});
    deleteUser;
    res.json({msg : "정상적으로 탈퇴 되었습니다."});
    
  } catch (err){
    next(err);
  }
};