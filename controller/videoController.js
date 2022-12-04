const db = require("../models");
// const sequelize = require("sequelize");
// const Op = sequelize.Op;
const Video = db.Video;
const Op = db.Sequelize.Op;

// exports.create = (req, res) => {
//   if (!req.body) {
//     res.status(400).send({
//       message: "Content can not be empty!",
//     });
//     return;
//   }
//   const video = {
//     videoID: req.body.videoID,
//     videoTitle: req.body.videoTitle,
//     videoDate: req.body.videoDate,
//     videoLink: req.body.videoLink,
//     videoRecommendRate: req.body.videoRecommendRate,
//     videoThumnail: req.body.videoThumnail,
//   };

//   Video.create(video)
//     .then((data) => {
//       res.send(data);
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while creating the Tutorial.",
//       });
//     });
// };

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
        res.send({ keyword: title, message: "검색결과 없음" });
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
