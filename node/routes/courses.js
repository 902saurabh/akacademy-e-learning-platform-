const express = require('express');
const {
       
       getCourses,
       getCourse,
       createCourse,
       updateCourse,
       deleteCourse,
       pushContent

    }  = require('../controllers/courses.js');

const router = express.Router();
router.use(require('cookie-parser')());

router.post('/pushContent',pushContent);


router
    .route('/')
    .get(getCourses)
    .get(getCourse)
    .post(createCourse);

router
    .route('/:id')
    .post(updateCourse)
    .put(updateCourse)
    .delete(deleteCourse);

router
    .route('/delete/:id')
    .get(deleteCourse);



module.exports = router;

