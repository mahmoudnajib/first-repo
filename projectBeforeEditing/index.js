    // 1- require express
const express = require('express');
const app = express();

    // 2- require validator
const {body, validationResult} = require('express-validator');
    //  لاحظ ان السطر ده هو تمثيل لفكرة الـ destructing

app.use(express.json()); // 3- Body parser - translator 
                        // read the body got from browser as json file 


let courses = [{
        id: 1,
        title: "js course",
        price: 1000
    },
    {
        id: 2,
        title: "react course",
        price: 2000
    },
]

// HTTP CRUD => post, get, put/patch, delete  

    // Api to get all courses
app.get('/api/courses', (req, res)=>{
    res.json(courses);
})

    // Api to get single course 
app.get('/api/courses/:id', (req, res)=>{ 
    const course_id = +req.params.id; // '+' number يعني رجعلي اللي جاي 
    const course = courses.find((course) => course.id === course_id);

    if (!course){ 
        return res.status(404).json({msg: "Course Not Found"});
    }
    res.json(course);
})


    // Post => create new course
app.post('/api/courses',
    [
    body('title')
        .notEmpty() // check if the title is empty, if empty return false / if not empty return true, وعلي اساسها تظهر الرساله او لاء
        .withMessage('Title is not appropriate')
        .isLength({min: 2}) // same as above
        .withMessage('at least is 2 letters for Title'),
    
    body('price')
        .notEmpty()
        .withMessage('price is required')
    ]
    ,(req, res) => { 
        const errors = validationResult(req);
        if (!errors.isEmpty()) // if there are errors
            return res.status(400).json(errors.array());
        
    
    const course = {id :courses.length+1 , ...req.body}; // spreading the body object into course object  
    courses.push(course);
    res.status(201).json(course);
});

    // patch => partially update 
app.patch('/api/courses/:id', (req, res)=>{
    const course_id = +req.params.id;
    let course = courses.find((course) => course.id === course_id);

    if (!course){ // if id not Found
        return res.status(404).json({msg: "Course Not Found"});
    }
    course = {...course, ...req.body}; // merging the current course with the new data from body
    res.status(200).json(course);
}) 


    // delete
app.delete('/api/courses/:id', (req, res)=>{
    const course_id = +req.params.id;
    courses = courses.filter((course)=> course.id !== course_id); // return all courses except the one with the given id
    res.status(200).json({success: true});
})

app.listen(4000, ()=>{
    console.log("Listening on port 4000");
})