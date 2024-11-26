const { StatusCodes } = require('http-status-codes');
const { SuccessResponse, ErrorResponse } = require('../utils/common');

function isAdmin(req, res) {
    SuccessResponse.reset();
    SuccessResponse.message=["user has admin level access"];
    return res.status(StatusCodes.OK).json(SuccessResponse);
}
function isCompany(req, res) {
    SuccessResponse.reset();
    SuccessResponse.message=["user has company level access"];
    return res.status(StatusCodes.OK).json(SuccessResponse);
}
module.exports = {
    isAdmin,
    isCompany

}                      