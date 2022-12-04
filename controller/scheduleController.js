const db = require("../models");
const Schedule = db.Schedule;
const Op = db.Sequelize.Op;

exports.findAll = (req, res) => {
  Schedule.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

exports.findDate = (req, res) => {
  // let condition = title ? { videoTitle: { [Op.like]: `%${title}%` } } : null;
  // Video.findAll({ where: condition })
  const date = req.params.date;
  const condition = date ? { scheduleDate: { [Op.like]: `%${date}%` } } : null;

  Schedule.findAll({
    where: condition,
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};
