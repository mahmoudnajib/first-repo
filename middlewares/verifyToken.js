const jwt = require('jsonwebtoken');
const httpStatusText = require('../utilities/HttpStatusText');
const appError = require('../utilities/appError');

const verifyToken = (req, res ,next)=>{
    const authHeader = req.headers['Authorization'] || req.headers['authorization']; 
    if(!authHeader){
        const error = appError.create('Token is required', 401, httpStatusText.ERROR);
        return next(error);
    }
    
    const token = authHeader.split(' ')[1];
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.currentUserData = payload;
        next();
    
    } catch (err){
        const error = appError.create('invalid token', 401, httpStatusText.ERROR);
            return next(error);
    }
};

module.exports = verifyToken;




