const express = require('express');
const router = express.Router();

const coursesController = require('../controllers/courses.controller');
const validationSchema = require('../middlewares/validationSchema');
const verifyToken = require('../middlewares/verifyToken');
const userRoles = require('../utilities/userRoles');
const allowedTo = require('../middlewares/allowedTo');

router.route('/')
    .get(coursesController.getAllCourses)
    .post(verifyToken, allowedTo(userRoles.MANAGER),
        validationSchema(),
        coursesController.createCourse
    );

router.route('/:id')
    .get(coursesController.getCourse)
    .patch(verifyToken, allowedTo(userRoles.MANAGER), coursesController.updateCourse) 
    .delete(verifyToken ,allowedTo(userRoles.ADMIN, userRoles.MANAGER), coursesController.deleteCourse);

module.exports = router;
