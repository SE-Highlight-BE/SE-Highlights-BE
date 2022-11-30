const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (req, res, next) => {

    try{
        const clientToken = req.cookies.userID;
        if (!clientToken){
            const error = new Error("로그인이 필요합니다.")
            throw error;
        }

        const decoded = jwt.verify(clientToken, process.env.JWT_TOKEN);

        if (decoded) {
            res.locals.userID = decoded.userID;
            next();
        }
        else {
            const error = new Error("로그인이 필요합니다.")
            throw error;
        }

    } catch (err){
        res.status(401).json({ error : '로그인이 필요합니다.'});
        next(err);
    }
};