const Bookmark = require('../models/bookmark');
const Video = require('../models/video');
const User = require('../models/user');
const jwt = require("jsonwebtoken");
const { sequelize } = require('../models');
require("dotenv").config();

exports.bookmarkVideo = async (req, res, next) => {
    try{
        const clientToken = req.cookies.userID;
        const decodedID = jwt.verify(clientToken, process.env.JWT_TOKEN);

        const userID = decodedID.userID;
        const videoID = req.params.videoID;

        const checkBookmark = await Bookmark.findOne({ where: { userID, videoID } });

        if(checkBookmark){

            const unBookmark = await Bookmark.destroy({
                where: {
                    userID: userID,
                    videoID: videoID
                }
            });
            res.status(201).json({ msg: "북마크가 해제되었습니다." });
        }

        else{
            
            const bookmark = await Bookmark.create({
                userID: userID,
                videoID: videoID
            });
            res.status(201).json({ msg: "북마크에 추가되었습니다." });
        }

    } catch (err) {
        console.error(err);
        next(err);
    }
};

exports.getBookmark = async (req, res, next) => {
    try{
        const clientToken = req.cookies.userID;
        const decodedID = jwt.verify(clientToken, process.env.JWT_TOKEN);

        const userID = decodedID.userID;
        const userName = await User.findOne({
            attributes: ['userName'],
            where: {userID: userID}
        })

        const getBookmark = await Bookmark.findAll({ 
            attributes: ['videoID'],
            where: {userID: userID},
            include: Video } );

        if (!getBookmark){
            res.json({ msg: "북마크로 저장된 영상이 없습니다." });
        }

        else{
            res.send({getBookmark, userName});
        }

    } catch (err) {
        console.error(err);
        next(err);
    }
};
