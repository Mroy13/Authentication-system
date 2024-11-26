const express=require('express');
const {userController}=require ('../../controllers');
const {userMiddleware}=require('../../middlewares');
const router=express.Router();

const adminMiddlewares = [
    userMiddleware.setRole('admin'),
    userMiddleware.checkAuth,
    userMiddleware.hasRoleAccess,
  ];

router.post('/signup',userMiddleware.validateUser,userController.createUser);
router.post('/signin',userMiddleware.validateUser,userController.userSignin);
router.get('/signout',userMiddleware.checkAuth,userController.userSignout);

//add specific role to user(admin level feature)
router.patch('/role',adminMiddlewares,userController.addRoleTouser);


module.exports=router