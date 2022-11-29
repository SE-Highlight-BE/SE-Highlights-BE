const Sequelize = require('sequelize');

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
          allowNull: false
        },
        videoDate: {
          type: Sequelize.DATE,
          allowNull: false
        },
        videoLink: {
          type: Sequelize.STRING,
          allowNull: false
        },
        videoRecommendRate: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0
        },
        videoThumbnail: {
          type: Sequelize.STRING,
          allowNull: false
        }
      }, {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: 'Video',
        tableName: 'video',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      });
  }
  static associate(db) {
    db.Video.hasMany(db.Comment, { foreignKey: 'videoID', sourceKey: 'videoID' });
  }
  static associate(db) {
    db.Video.hasMany(db.Eval, { foreignKey: 'videoID', sourceKey: 'videoID' });
  }
};
