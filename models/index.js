const Sequelize = require('sequelize'); 
const User = require('./user');
const Comment = require('./comment');
const Video = require('./video');
const Eval = require('./eval');

const config = require('../config/config'); 
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = User;
db.Comment = Comment;
db.Video = Video;
db.Eval = Eval;

User.init(sequelize);
Comment.init(sequelize);
Video.init(sequelize);
Eval.init(sequelize);

User.associate(db);
Comment.associate(db);
Video.associate(db);
Eval.associate(db);

module.exports = db;
