const { User,Role } = require('../models');
const crudRepository = require('./crud-repository');
const Apperror = require('../utils/error/App-error');
const {StatusCodes} = require('http-status-codes');
class userRepository extends crudRepository {
    constructor() {
        super(User);
    }
    async findUser(data) {
        try {
            const res = await User.findOne({
                where: { email: data }
            });
            return res;
        } catch (error) {
            throw error;
        }
    }
    async addroleTouser(user){
        try {

            const role=await Role.findOne({where:{
                 name:'user'
            }});
             const res=await user.addRole(role);
        } catch (error) {
            throw error;
        }
    }

    async checkRole(id,role){
        try {
            const user=await User.findByPk(id);
            const roleDetails=await Role.findOne({where:{
                name:role
            }});

            const res=await user.hasRole(roleDetails);
            return res;

        } catch (error) {
            throw error;
        }
    }
}

module.exports = userRepository;