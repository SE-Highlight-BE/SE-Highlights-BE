const Sequelize = require("sequelize");

module.exports = class Schedule extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        scheduleID: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true,
        },
        scheduleTitle: {
          type: Sequelize.STRING,
        },
        scheduleDate: {
          type: Sequelize.STRING,
        },
        scheduleTime: {
          type: Sequelize.STRING,
        },
        category: {
          type: Sequelize.STRING,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: "Schedule",
        tableName: "schedule",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {}
};
