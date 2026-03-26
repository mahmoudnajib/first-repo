const User = require('../models/userModel');
const asyncWrapper = require('../middlewares/asyncWrapper');    
const httpStatusText = require('../utilities/HttpStatusText');
const appError = require('../utilities/appError');
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken'); 
const generateToken = require('../utilities/generateToken');

const getAllUsers = asyncWrapper(async(req, res)=>{

        const query = req.query;
        const limit = query.limit || 2;
        const page = query.page || 1;
        const skip = (page - 1) * limit;
     
        const users = await User.find({},{__v: 0, password:0}).limit(limit).skip(skip);
        res.json({status: httpStatusText.SUCCESS, data: {users}});
    });
        

const register = asyncWrapper(async(req, res, next)=>{
    const {firstName, lastName, email, password, role} = req.body;

    const oldUser = await User.findOne({email: email});
    if (oldUser){
        const error = appError.create('user already exists', 400, httpStatusText.FAIL);
            return next(error);  
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        firstName,
        lastName, 
        email,
        password:hashedPassword,
        role, 
        avatar: req.file.filename
    }); 
        
    const token = await generateToken({email: newUser.email, id: newUser._id, role: newUser.role});
    newUser.token = token;


    await newUser.save();
    res.json({status: httpStatusText.SUCCESS, data: {newUser}});

});


const login = asyncWrapper(async(req, res, next)=>{

    const {email, password} = req.body;
    if(!email && !password){
        const error = appError.create('Email and password are required', 400, httpStatusText.FAIL);
        return next(error);
}

    const user = await User.findOne({email: email});

    if(!user){
        const error = appError.create('User not found', 400, httpStatusText.FAIL);
        return next(error);
    }

    const matchedPassword = await bcrypt.compare(password, user.password);    

    if(user && matchedPassword){
        const token = await generateToken({email: user.email, id: user._id, role: user.role});
        return res.json({status: httpStatusText.SUCCESS, data: {token}});
    
    } else {
        const loginError = appError.create('something went wrong', 500, httpStatusText.FAIL);
        return next(loginError);
    }
})

module.exports ={
    getAllUsers,
    register,
    login
};

/*
JWT & Protected Routes
*/