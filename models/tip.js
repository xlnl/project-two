'use strict';
const {
  Model
} = require('sequelize');
var geocoder = require("geocoder");
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

  tip.addHook('beforeCreate', (pendingTip, options, cb)=>{
    geocoder.geocode(tip.address, function(err, data) {
      if(err) return cb(err, null);
      tip.lat = data.results[0].geometry.location.lat;
      tip.lng = data.results[0].geometry.location.lng;
      cb(null, tip);
    })
  })

  return tip;
}