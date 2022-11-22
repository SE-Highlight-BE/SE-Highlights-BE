const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/config')[process.env];

module.exports = (sequelize, Sequelize) => {
  const user = sequelize.define( "user",
    {
      userID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      userName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userNickName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userPwd: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
};
