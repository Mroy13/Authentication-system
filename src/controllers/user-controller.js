const { StatusCodes } = require('http-status-codes');
const { SuccessResponse, ErrorResponse } = require('../utils/common');
const {userService}=require('../services');
async function createUser(req, res) {
    try {
           const userInfo = await userService.createUser({
                  userName: req.body.userName,
                  email: req.body.email,
                  password:req.body.password
           });
           SuccessResponse.reset();
           SuccessResponse.data = userInfo.userName;
           return res
                  .status(StatusCodes.CREATED)
                  .json(SuccessResponse);
    }
    catch (error) {
           ErrorResponse.reset();
           ErrorResponse.error = error;
           return res
                  .status(error.statusCode)
                  .json(ErrorResponse);
    }


}
async function userSignin(req, res) {
       try {
              const response = await userService.userSignin({
                     userName: req.body.userName,
                     email: req.body.email,
                     password:req.body.password
              },res);
              SuccessResponse.reset();
              SuccessResponse.data = response;
              return res
                     .status(StatusCodes.CREATED)
                     .json(SuccessResponse);
       }
       catch (error) {
              ErrorResponse.reset();
              ErrorResponse.error = error;
              return res
                     .status(error.statusCode)
                     .json(ErrorResponse);
       }
   
   
   }


     function userSignout(req,res){
       try {
           userService.userSignout(res);
           SuccessResponse.reset();
           SuccessResponse.message="logout successfully"
           return res
                  .status(StatusCodes.OK)
                  .json(SuccessResponse);
    }
    catch (error) {
           ErrorResponse.reset();
           ErrorResponse.error = error;

           return res
                  .status(error.statusCode)
                  .json(ErrorResponse);
    }
}
   
module.exports={
    createUser,
    userSignin,
    userSignout
}