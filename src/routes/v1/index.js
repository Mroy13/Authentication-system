const express=require('express');
const { infoController, authCheckController, userController} = require('../../controllers');
const {userMiddleware}=require('../../middlewares');
const userRoutes=require('./user-routes');
const router=express.Router();
const adminMiddlewares = [
    userMiddleware.setRole('admin'),
    userMiddleware.checkAuth,
    userMiddleware.hasRoleAccess,
  ];
  
  const companyMiddlewares = [
    userMiddleware.setRole('xyz_tech'),
    userMiddleware.checkAuth,
    userMiddleware.hasRoleAccess,
  ];
  
router.use('/user',userRoutes);
router.get('/info',infoController.info);
router.get('/admin', adminMiddlewares, authCheckController.isAdmin);
router.get('/company', companyMiddlewares, authCheckController.isCompany);
  
module.exports=router;
