'use strict';
const {ENUMS}=require('../utils/common');
const {ADMIN,USER,COMPANY}=ENUMS.role_enums;
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.User, { through: 'User_roles', as:'user',foreignKey:'role_id'});
    }
  }
  Role.init({
    name: {
      type:DataTypes.ENUM,
      allowNull:false,
      values:[ADMIN,USER,COMPANY],
      defaultValue:USER,
    }
  }, {
    sequelize,
    modelName: 'Role',
  });
  return Role;
};