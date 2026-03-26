const {body} = require('express-validator');

const postMiddleware = () =>{
    return [
        body('title')
            .notEmpty() 
            .withMessage('Title is inappropriate')
            .isLength({min: 2}) // same as above
            .withMessage('at least is 2 letters for Title'),
        
        body('price')
            .notEmpty()
            .withMessage('price is required')
    ];
};     

module.exports = postMiddleware;