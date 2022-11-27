const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        userID: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true,
        },
        userName: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        userNickName: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        userPwd: {
          type: Sequelize.STRING,
          allowNull: false,
        },
      }, {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: 'User',
        tableName: 'user',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      });
  }
  static associate(db) {
    db.User.hasMany(db.Comment, { foreignKey: 'userID', sourceKey: 'userID' });
  }
};
