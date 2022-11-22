const Sequelize = require('sequelize'); 
const User = require('./user');

const env = process.env.NODE_ENV || 'database'; 
const config = require('../config/config'); 
const db = {};

const sequelize = new Sequelize(
    config.database, config.username, config.password, config
    );

db.sequelize = sequelize;

module.exports = db; 
db.User = User;
