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
