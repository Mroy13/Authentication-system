const express=require('express');
const {userController}=require ('../../controllers');
const {userMiddleware}=require('../../middlewares');
 const router=express.Router();
 router.post('/signup',userMiddleware.validateUser,userController.createUser);
 router.post('/signin',userMiddleware.validateUser,userController.userSignin);
 router.get('/signout',userMiddleware.checkAuth,userController.userSignout);
module.exports=router