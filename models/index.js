const Sequelize = require('sequelize'); 
const User = require('./user');

const config = require('../config/config'); 
const db = {};

const sequelize = new Sequelize(
    config.database, config.username, config.password, config
);

db.sequelize = sequelize;
db.User = User;

User.init(sequelize);

module.exports = db;
