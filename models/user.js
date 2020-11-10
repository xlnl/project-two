'use strict';
const bcrypt = require('bcrypt')

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.user.hasMany(models.comment)
      models.user.hasMany(models.tip)
    }
  };
  user.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [2, 30],
          msg: 'Name must be 2-30 characters long.'
        }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [2, 30],
          msg: 'Name must be 2-30 characters long.'
        }
      }
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        is: {
          args: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
          msg: 'Please enter a valid phone number.'
        }
      }
    },
    county: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [5,50],
          msg: 'Username must be between 5 and 50 characters.'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [8,99],
          msg: 'Password must be between 8 and 99 characters.'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'user',
  });
  // // async version
  // user.addHook('beforeCreate', async(pendingUser, options)=>{
  //   await bcrypt.hash(pendingUser.password, 10) // <- 10 = # of salt rounds
  //   .then(hashedPassword=>{
  //     console.log(`${pendingUser.password} became -----> ${hashedPassword}`)
  //     // eplace the OG password with the hash
  //     pendingUser.password = hashedPassword
  //   })
  // })

  // sync version 
  user.addHook('beforeCreate', (pendingUser, options)=>{
    let hashedPassword = bcrypt.hashSync(pendingUser.password, 10) //hash sync forces JS to run so don't need .then
    console.log(`${pendingUser.password} became -----> ${hashedPassword}`)
    pendingUser.password = hashedPassword
  })

  user.prototype.validPassword = async function(passwordInput) {
    let match = await bcrypt.compare(passwordInput, this.password)
    console.log("?????match:", match)
    return match
  }

  return user;
};