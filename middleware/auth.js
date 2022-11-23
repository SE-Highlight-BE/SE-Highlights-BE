const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (req, res, next) => {
    try{
        const header = req.get("Authorization");
        if(!header) {
            const error = new Error("로그인이 필요합니다.");
            error.statusCode = 401;
            next(error);
        }
        const token = req.get("Authorization").split(" ")[1];
        let decodedToken;
        if (!token){
            const error = new Error("로그인이 필요합니다.");
            error.statusCode = 401;
            next(error);
        }
        decodedToken = jwt.verify(token, process.env.JWT_TOKEN);
        if(!decodedToken){
            const error = new Error(`유효하지 않은 token: ${token}`);
            error.statusCode = 401;
            next(error);
        }
        req.id = decodedToken.id;
        next();
    } catch (err){
        error.statusCode = 500;
        next(err);
    }
};