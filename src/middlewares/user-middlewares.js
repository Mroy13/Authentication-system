const { StatusCodes } = require('http-status-codes');
const { SuccessResponse, ErrorResponse } = require('../utils/common');
const { userService } = require('../services');
const Apperror = require('../utils/error/App-error');


function validateUser(req, res, next) {
    if (!req.body.email) {
        ErrorResponse.reset();
        ErrorResponse.message = "[email required]";
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse);
    }
    if (!req.body.password) {
        ErrorResponse.reset();
        ErrorResponse.message = "[password required]";
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse);
    }

    next();
}



async function checkAuth(req, res, next) {

    const authCookies = req.headers['cookie'];

    if (!authCookies) {
        ErrorResponse.reset();
        ErrorResponse.message = "[cookie not present]";
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse);
    }
    const cookiePattern = new RegExp('SessionID' + "=([^;]*)");
    const match = cookiePattern.exec(authCookies);
    if (!match) {
        ErrorResponse.reset();
        ErrorResponse.message = "[jwt-token not present]";
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse);
    }

    const token = match[1];

    try {
        const userId = await userService.isAuthenticated(token);
        if (userId) {
            req.userId = userId;
            next();
        }
        if (!res) {
            throw error;
        }
    }
    catch (error) {
        ErrorResponse.reset();
        ErrorResponse.error = error
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse);
    }
}


//Role-Based Access Control

function setRole(role){
    return (req, res, next) => {
        req.requiredRole = role;
        next();
    };
}

async function hasRoleAccess(req,res,next){
        try{
           const hasAccess=await userService.checkAccess(req.userId,req.requiredRole);
           if(hasAccess){
              next();
           }
        }
        catch(error){
                 ErrorResponse.reset();
                 ErrorResponse.error = error
                 return res
                     .status(StatusCodes.UNAUTHORIZED)
                     .json(ErrorResponse);
                }
}



module.exports = {
    validateUser,
    checkAuth,
    setRole,
    hasRoleAccess
    
}
