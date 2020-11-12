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
      models.tip.belongsTo(models.province)
      models.tip.hasMany(models.comment)
    }
  };
  tip.init({
    username: DataTypes.STRING,
    address: DataTypes.STRING,
    provinceName: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    provinceId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'tip',
  });
  return tip;
};