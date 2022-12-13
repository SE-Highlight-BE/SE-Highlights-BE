const db = require("../models");
// const sequelize = require("sequelize");
// const Op = sequelize.Op;
const Video = db.Video;
const Op = db.Sequelize.Op;
const Eval = require("../models/eval");
exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  const video = {
    videoTitle: req.body.videoTitle,
    videoDate: req.body.videoDate,
    videoLink: req.body.videoLink,
  };

  Video.create(video)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial.",
      });
    });
};

// 전체 비디오 검색
exports.findAll = (req, res) => {
  // fs
  Video.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "video 전체 검색 실패.",
      });
    });
};
exports.findOne = (req, res) => {
  // fs
  const userID = req.decoded;
  let evalID = null;
  Eval.findOne({
    where: { userID: userID },
  }).then((data) => {
    data && (evalID = data.dataValues.evalID);
  });

  Video.findOne({ where: { videoID: req.query.videoID } })
    .then((data) => {
      evalID
        ? res.send({ data, recommend: true })
        : res.send({ data, recommend: false });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "video 전체 검색 실패.",
      });
    });
};

exports.findSome = (req, res) => {
  // fs
  Video.findAll()
    .then((data) => {
      let newData = [];
      if (data.length >= req.query.num) {
        let randomVideo;
        for (let i = 0; i < req.query.num; i++) {
          randomVideo = data.splice(
            Math.floor(Math.random() * data.length),
            1
          )[0];
          newData.push(randomVideo);
        }
        res.send(newData);
      } else
        res.send({
          data: data,
          message: "보유한 동영상보다 요청하는 동영상 개수가 더 많음.",
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "video 전체 검색 실패.",
      });
    });
};
// 타이틀로 비디오 검색
exports.findAllTitle = (req, res) => {
  // fs
  const title = req.query.videoTitle;

  let condition = title ? { videoTitle: { [Op.like]: `%${title}%` } } : null;
  Video.findAll({ where: condition })
    .then((data) => {
      if (data.length === 0)
        return res.send({ keyword: title, message: "검색결과 없음" });
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
