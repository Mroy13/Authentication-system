const express=require('express');
const { infoController} = require('../../controllers');
const {userMiddleware}=require('../../middlewares');
const userRoutes=require('./user-routes');
const router=express.Router();
router.use('/user',userRoutes);
router.get('/info',userMiddleware.checkAuth,infoController.info);
module.exports=router;
