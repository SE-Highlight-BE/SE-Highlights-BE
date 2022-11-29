const Video = require('../models/video');
const User = require('../models/user');

const Sequelize = require("sequelize");

exports.getVideo = async(req, res, next) => {
    try{
        const videoID = req.params.videoID;
        const video = await Video.findOne({ where: { videoID: videoID}});
        if(!video){
            const error = new Error("해당 영상이 없습니다.");
            error.statusCode = 403;
            throw error;
        }
        res.status(200).json({ video });
    } catch (error){next(error);}
}