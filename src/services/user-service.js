const {StatusCodes}= require('http-status-codes');
const { userRepository } = require('../repositories');
const Apperror = require('../utils/error/App-error');
const { ServerConfig } = require('../config');
const { Auth } = require('../utils/common');
const bcrypt = require('bcrypt');

const UserRepository = new userRepository();


async function createUser(data) {
    // console.log(data);
    try {
        const user = await UserRepository.create(data);
        await UserRepository.addroleTouser(user);
        return user;
    }
    //client side errorHandling
    catch (error) {
        //  console.log(error);
        if (error.name == 'SequelizeValidationError' || error.name == 'SequelizeUniqueConstraintError') {
            const explanation = [];
            error.errors.forEach(err => {
                explanation.push(err.message);
            });

            throw new Apperror(explanation, StatusCodes.BAD_REQUEST);
        }
        //server side error handling
        else {
            throw new Apperror("request not resolved due to server side probelem", StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }
}

async function userSignin(data) {
    try {
        const userData = await UserRepository.findUser(data.email);
        // console.log(userData);
        if (!userData) {
            throw new Apperror("[user not found]", StatusCodes.NOT_FOUND);
        }
        const res = bcrypt.compareSync(data.password, userData.password);
        if (!res) {
            throw new Apperror("[invalid password]", StatusCodes.UNAUTHORIZED);
        }
        //data.id=userData.id;
        // const jwtToken= createJwttoken(data,ServerConfig.SECRET_KEY); 
        const jwtToken = Auth.createJwttoken({ id: userData.id, email: userData.email }, ServerConfig.SECRET_KEY);
        //  console.log(jwtToken);
        return jwtToken;
    } catch (error) {
        // console.log(error);
        throw error;
    }
}

async function isAuthenticated(token) {
    try {
        const res = Auth.verifyToken(token, ServerConfig.SECRET_KEY);
        if (res) {
            const user = await UserRepository.get(res.data.id);
            if (!user) {
                throw new Apperror("user not found", StatusCodes.BAD_REQUEST);
            }
            return user.id;
        }

    } catch (error) {
        //console.log(error);
        throw error;
    }
}


async function checkAdmin(id){
    try {
        const res=await UserRepository.checkAdmin(id);
        if(!res){
            throw new Apperror("ivalid authorization",StatusCodes.UNAUTHORIZED);
        }
        return res;
    } catch (error) {
        if(error instanceof Apperror){
            throw error;
        }
        else{
            console.log(error);
            throw new Apperror("request not resolved due to server side_checkAdminrepo probelem", StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }
}

module.exports = {
    createUser,
    userSignin,
    isAuthenticated,
    checkAdmin
}