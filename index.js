require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');


const statusText = require('./utilities/HttpStatusText');

const mongoose = require('mongoose');
const url = process.env.DATABASE_URL;
const port = process.env.PORT || 4000;

mongoose.connect(url).then(()=> {   
    console.log("mongodb server connected successfully!");  
})

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));


const coursesRouter = require('./routes/courses.routes'); 
app.use('/api/courses', coursesRouter); 

const usersRouter = require('./routes/users.routes');
app.use('/api/users', usersRouter);




// global middleware to handle wrong routes
app.use((req, res) =>{
    return res.status(404).json({
        status: statusText.ERROR,
        message: "Invalid URL"
    });
});

// global error handler
app.use((error, req, res, next)=>{
    const statusCode = error.statusCode || 500; 
   
    res.status(statusCode).json({
        status: error.statusText || statusText.ERROR,
        message: error.message,
        code: statusCode,
        data: null
    });
});



app.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
})






