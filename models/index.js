const Sequelize = require('sequelize'); 
const User = require('./user');
const Comment = require('./comment');
const Video = require('./video');
const Eval = require('./eval');
const Bookmark = require('./bookmark');

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
db.Bookmark = Bookmark;

User.init(sequelize);
Comment.init(sequelize);
Video.init(sequelize);
Eval.init(sequelize);
Bookmark.init(sequelize);

User.associate(db);
Comment.associate(db);
Video.associate(db);
Eval.associate(db);
Bookmark.associate(db);

module.exports = db;
