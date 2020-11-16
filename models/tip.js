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
    userId: DataTypes.INTEGER,
    provinceId: DataTypes.INTEGER,
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lat: DataTypes.FLOAT,
    lng: DataTypes.FLOAT,
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: {
          args: [2,500],
          msg: 'Description must be between 2 and 500 characters.'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'tip', 
  });
  
  return tip;
}