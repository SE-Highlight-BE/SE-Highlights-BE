const Sequelize = require('sequelize'); 
const User = require('./user');
const Video = require('./video');
const Comment = require('./comment');
const Eval = require('./eval');

const config = require('../config/config'); 
const { associate } = require('./user');
const db = {};

const sequelize = new Sequelize(
    config.database, config.username, config.password, config
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = User;
db.Video = Video;
db.Comment = Comment;
db.Eval = Eval;

User.init(sequelize);
Video.init(sequelize);
Comment.init(sequelize);
Eval.init(sequelize);

User.associate(db);
Video.associate(db);
Comment.associate(db);
Eval.associate(db);

module.exports = db;
