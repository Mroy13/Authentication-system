const { StatusCodes } = require('http-status-codes');
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

async function userSignin(data, res) {
    try {
        const userData = await UserRepository.findUser(data.email);
        if (!userData) {
            throw new Apperror("[user not found]", StatusCodes.NOT_FOUND);
        }
        const passwordMatch = bcrypt.compareSync(data.password, userData.password);
        if (!passwordMatch) {
            throw new Apperror("[invalid password]", StatusCodes.UNAUTHORIZED);
        }

        const jwtToken = Auth.createJwttoken({ id: userData.id, email: userData.email }, ServerConfig.SECRET_KEY);

        let options = {
            maxAge: 5 * 60 * 1000, // would expire in 5minutes
            httpOnly: true, // The cookie is only accessible by the web server
            secure: true,
            sameSite: 'None',
        };

        res.cookie('SessionID', jwtToken, options);
        return userData.userName;

    } catch (error) {
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
        throw error;
    }
}


function userSignout(res) {
    try {
        res.clearCookie("SessionID", { path: '/' });
        //console.log("successfully logout");
    } catch (error) {
        throw error;
    }
}


async function checkAccess(id, role) {
    try {
        const isMatch = await UserRepository.checkRole(id, role);
        if (!isMatch) {
            throw new Apperror("ivalid authorization", StatusCodes.UNAUTHORIZED);
        }
        return isMatch;
    }
    catch (error) {

        if (error instanceof Apperror) {
            throw error;
        }
        else {
            throw new Apperror("request not resolved due to server side probelem", StatusCodes.INTERNAL_SERVER_ERROR);
        }

    }
}




module.exports = {
    createUser,
    userSignin,
    isAuthenticated,
    checkAccess,
    userSignout
}