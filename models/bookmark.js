const Sequelize = require("sequelize");

module.exports = class Bookmark extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        bookmarkID: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        modelName: "Bookmark",
        tableName: "bookmark",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }
  static associate(db) {
    db.Bookmark.belongsTo(db.User, {
      foreignKey: "userID",
      targetKey: "userID",
    });
  }
  static associate(db) {
    db.Bookmark.belongsTo(db.Video, {
      foreignKey: "videoID",
      targetKey: "videoID",
    });
  }
};
