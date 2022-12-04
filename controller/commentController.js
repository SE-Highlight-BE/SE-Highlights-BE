const User = require("../models/user");
const Comment = require("../models/comment");
const jwt = require("jsonwebtoken");
const express = require("express");
require("dotenv").config();
let cookieParser = require("cookie-parser");
let app = express();
app.use(cookieParser());
exports.addComment = async (req, res, next) => {
  try {
    const userID = req.decoded;
    const comment = req.body.comment;
    const videoID = req.body.videoID;

    const comments = await Comment.create({
      userID: userID,
      videoID: videoID,
      comment: comment,
    });
    res.status(201).json(comments);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

exports.deleteComment = async (req, res, next) => {
  try {
    // const clientToken = req.cookies.userID;
    // const decodedID = jwt.verify(clientToken, process.env.JWT_TOKEN);
    console.log("@@@@@", req.body.commentID);
    const commentID = req.body.commentID;
    const userID = req.decoded;
    const authorID = await Comment.findOne({
      attributes: ["userID"],
      where: {
        id: commentID,
      },
    });
    if (!commentID) {
      res.json({ error: "존재하지 않는 댓글입니다." });
    } else if (userID != authorID.userID) {
      res.json({ error: "자신의 댓글만 삭제 가능합니다." });
    } else {
      const result = await Comment.destroy({
        where: { id: req.body.commentID },
      });
      res.json({ msg: "댓글이 삭제되었습니다." });
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};

exports.getUserComment = async (req, res, next) => {
  try {
    // const clientToken = req.cookies.userID;
    // const decodedID = jwt.verify(clientToken, process.env.JWT_TOKEN);

    const comments = await Comment.findAll({
      where: { userID: req.decoded },
    });
    console.log(comments);
    res.json({ comments });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

exports.getVideoComment = async (req, res, next) => {
  try {
    const results = [];
    const comments = await Comment.findAll({
      where: { videoID: req.params.videoID },
    });
    for (let i = 0; i < comments.length; i++) {
      const user = await User.findOne({
        attributes: ["userNickName"],
        where: {
          userID: comments[i].dataValues.userID,
        },
      });
      results.push({
        ...comments[i].dataValues,
        userNickName: user.dataValues.userNickName,
      });
    }

    console.log(results);
    res.json(results);
  } catch (err) {
    console.error(err);
    next(err);
  }
};
