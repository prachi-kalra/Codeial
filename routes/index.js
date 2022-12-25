const express=require('express');
const router=express.Router();
// we have linked our router and controller ;
const homeController=require('../controllers/home_controller');
router.get('/',homeController.home);
router.use('/users',require('./users'));
router.use('/posts',require('./posts'));
router.use('/comments',require('./comments'));
module.exports=router;
