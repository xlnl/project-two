'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class county extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.county.hasMany(models.tip)
    }
  };
  county.init({
    name: DataTypes.STRING,
    tipId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'county',
  });
  return county;
};