const { StatusCodes } = require('http-status-codes');
const { SuccessResponse, ErrorResponse } = require('../utils/common');
const { userService } = require('../services');


function validateUser(req, res, next) {
    if (!req.body.email) {
        ErrorResponse.message = "[email required]"
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse);
    }
    if (!req.body.password) {
        ErrorResponse.message = "[password required]"
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse);
    }

    next();
}



async function checkAuth(req, res, next) {

    const authCookies = req.headers['cookie'];
    if (!authCookies) {
        ErrorResponse.message = "[cookie not present]";
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse);
    }
    const cookiePattern = new RegExp('SessionID' + "=([^;]*)");
    const match = cookiePattern.exec(authCookies);
    if (!match) {
        ErrorResponse.message = "[jwt-token not present]";
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse);
    }

    const token = match[1];

    try {
        const res = await userService.isAuthenticated(token);
        if (res) {
            req.user = res;
            next();
        }
        if (!res) {
            throw error;
        }
    }
    catch (error) {
        ErrorResponse.message = error
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse);
    }
}


//Role-Based Access Control (check for admin access)

async function isAdmin(req, res, next) {
    try {
        const res = await userService.checkAdmin(req.user);
        if (res) {
            next();
        }
        else {
           throw error;
        }
    }
    catch (error) {
     ErrorResponse.message = error
     return res
         .status(StatusCodes.UNAUTHORIZED)
         .json(ErrorResponse);
    }
}



module.exports = {
    validateUser,
    checkAuth,
    isAdmin
}
