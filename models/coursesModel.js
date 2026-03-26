const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    title: {
        type : String,
        required: true
    },
    price: {
        type : Number,
        required: true
    },
})

module.exports = mongoose.model('Course', schema); // 'Course' is the model name, mongoose will create a collection named 'courses' in lowercase and plural form automatic.













