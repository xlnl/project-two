'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tip extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.tip.belongsTo(models.user)
      models.tip.belongsTo(models.county)
      models.tip.hasMany(models.comment)
    }
  };
  tip.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    address: DataTypes.STRING,
    countyName: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    countyId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'tip',
  });
  return tip;
};