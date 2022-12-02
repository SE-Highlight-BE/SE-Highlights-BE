const Video = require("../models/video");
const Eval = require("../models/eval");
const jwt = require("jsonwebtoken");
const { sequelize } = require("../models");
require("dotenv").config();

exports.likeVideo = async (req, res, next) => {
  try {
    // const clientToken = req.cookies.userID;
    // const decodedID = jwt.verify(clientToken, process.env.JWT_TOKEN);

    const userID = req.decoded;
    const videoID = req.params.videoID;

    const checkLiked = await Eval.findOne({ where: { userID, videoID } });

    if (checkLiked) {
      Video.update(
        { videoRecommendRate: sequelize.literal("videoRecommendRate - 1") },
        { where: { videoID: videoID } }
      );

      const eval = await Eval.destroy({
        where: {
          userID: userID,
          videoID: videoID,
        },
      });
      res.status(201).json({ msg: "좋아요가 취소되었습니다." });
    }

    if (!checkLiked) {
      Video.update(
        { videoRecommendRate: sequelize.literal("videoRecommendRate + 1") },
        { where: { videoID: videoID } }
      );

      const eval = await Eval.create({
        userID: userID,
        videoID: videoID,
      });
      res.status(201).json({ msg: "좋아요가 등록되었습니다." });
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};
