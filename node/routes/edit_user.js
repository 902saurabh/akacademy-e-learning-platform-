const express = require('express');

const {addToCart,
    removeFromCart,
    getCartCourses,
    getMyCourses,
    addToMycourse} = require('./../controllers/edit_user');

const router = express.Router();
router.post('/addToCart',addToCart);
router.post('/removeFromCart',removeFromCart)
router.post('/addToMycourse',addToMycourse);
router.post('/getCartCourses',getCartCourses);
router.post('/getMyCourses',getMyCourses);
module.exports = router;