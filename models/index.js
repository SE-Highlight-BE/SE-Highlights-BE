const Sequelize = require('sequelize'); 

const env = process.env.NODE_ENV || 'development'; 
const config = require('../config/config')[env]; 
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config); // new Sequelize를 통해 MySQL 연결 객체 생성

db.sequelize = sequelize;

module.exports = db; 