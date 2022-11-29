const Sequelize = require("sequelize");

module.exports = class Video extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        videoID: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true,
        },
        videoTitle: {
          type: Sequelize.STRING,
        },
        videoDate: {
          type: Sequelize.DATE,
        },
        videoLink: {
          type: Sequelize.STRING,
        },
        videoRecommendRate: {
          type: Sequelize.STRING,
        },
        videoThumnail: {
          type: Sequelize.STRING,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: "Video",
        tableName: "video",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    db.Video.hasMany(db.Comment, { foreignKey: 'videoID', sourceKey: 'videoID' });
    db.Video.hasMany(db.Eval, { foreignKey: 'videoID', sourceKey: 'videoID' });
  }
};
