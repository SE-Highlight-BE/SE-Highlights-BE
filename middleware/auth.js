const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (req, res, next) => {

    try{
        const clientToken = req.cookies.userID;
        if (!clientToken){
            res.status(404).json({ error : '로그인이 필요합니다.'});
        }

        const decoded = jwt.verify(clientToken, process.env.JWT_TOKEN);

        if (decoded) {
            res.locals.userID = decoded.userID;
            next();
        }
        else {
            res.status(401).json({ error : '로그인이 필요합니다.'});
        }

    } catch (err){
        res.status(401).json({ error : '로그인이 필요합니다. (로그인 기한 만료)'});
        next(err);
    }
};
