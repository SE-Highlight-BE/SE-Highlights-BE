const User = require('../models/user');
const Comment = require('../models/comment');

exports.addComment = async (req, res, next) => {
    try{

        const { userID, comment } = req.body;
        const comments = await Comment.create({
            userID: userID,
            comment: comment,
        });
        console.log(comments);
        res.status(201).json(comments);
    } catch (err) {
        console.error(err);
        next(err);
    }
};

exports.deleteComment = async (req, res, next) => {
    try{
        const commentID = req.params.id;
        const userID = req.body.userID;
        const authorID = await Comment.findOne({
            attributes: ['userID'],
            where:{
                id: commentID
            }
        })

        if(!commentID){
            res.json({ error :"존재하지 않는 댓글입니다."});
        }

        else if(userID!=authorID.userID){
            res.json({ error : '자신의 댓글만 삭제 가능합니다.'});
        }
        
        else{
            const result = await Comment.destroy({where: { id: req.params.id}});
            res.json({msg : "댓글이 삭제되었습니다."});
        }
        
    } catch (err){
        console.error(err);
        next(err);
    }
};

exports.getComment = async (req, res, next) => {
    try{
        const comments = await Comment.findAll({ where: { userID: req.params.userID }});
        console.log(comments);
        res.json({ comments });
    } catch (err){
        console.error(err);
        next(err);
    }
};
