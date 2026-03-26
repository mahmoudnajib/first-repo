const {validationResult, query} = require('express-validator');
const asyncWrapper =  require('../middlewares/asyncWrapper');
const Course = require('../models/coursesModel');
const httpStatusText = require('../utilities/HttpStatusText');
const appError = require('../utilities/appError');
const { Query } = require('mongoose');

// get all courses
const getAllCourses = asyncWrapper(async(req, res)=>{
    
    
    const query = req.query;
    const limit = query.limit || 2;
    const page = query.page || 1;
    const skip = (page - 1) * limit;
 
    const courses = await Course.find({},{"__v": 0}).limit(limit).skip(skip);
    res.json({status: httpStatusText.SUCCESS, data: {courses}});
});

// get single course
const getCourse = asyncWrapper( async (req, res, next)=>{

        
    const course = await Course.findById(req.params.id);
        if (!course){ // if id not Found
            const error = appError.create('course not found', 404, httpStatusText.FAIL);
            return next(error);
        }   
    return res.json({status: httpStatusText.SUCCESS, data: {course}});
        
});

// create new course
const createCourse = asyncWrapper ( async (req, res, next)=>{


    const errors = validationResult(req);
    if (!errors.isEmpty()) // if there are errors
        return res.status(400).json({
            status: httpStatusText.FAIL,
            data: {"Errors": errors.array()}
        }); 

        const newCourse = new Course(req.body);
        await newCourse.save();
        res.status(201).json({
            status: httpStatusText.SUCCESS,
            data: {newCourse}
        });
        
        
    });

// partially update
const updateCourse = asyncWrapper( async (req, res)=>{

    const courseId = req.params.id;  
    
    const updatedCourse = await Course.updateOne({_id: courseId},{$set: {...req.body}});

        res.status(200).json({
            status: httpStatusText.SUCCESS,
            data: {updatedCourse}
        });
    });


// delete
const deleteCourse = asyncWrapper(async (req, res)=>{

    const courseId = req.params.id;
    
        const deletedCourse = await Course.deleteOne({_id: courseId});
        res.status(200).json({
            status: httpStatusText.SUCCESS, 
            data:null
        });
});

module.exports = {
    getAllCourses,
    getCourse, 
    createCourse,
    updateCourse,
    deleteCourse   
}