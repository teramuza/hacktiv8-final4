'use strict';
const { hashPassword } = require("../helpers/bcrypt");
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // User 1 - N Photos
      User.hasMany(models.Photo, { foreignKey: "userid" });
      // User 1 - N Comments
      User.hasMany(models.Comment, { foreignKey: "userid" });
    }
  };
  User.init({
    full_name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Full name is required"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Email is required"
        },
        isEmail: {
          args: true,
          msg: "Email address is invalid"
        }
      },
      unique: {
        args: true,
        msg: "This email has been used, try another one"
      },
    },
    username: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: "This username has been used, try another one"
      },
      validate: {
        notEmpty: {
          args: true,
          msg: "Username is required"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Password is required"
        }
      }
    },
    profile_image_url: {
      type: DataTypes.TEXT,
      validate: {
        notEmpty: {
          args: true,
          msg: "Image url is required"
        },
        isUrl: {
          args: true,
          msg: "Image url is invalid"
        }
      }
    },
    age: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: "Age is required"
        },
        isNumeric: {
          args: true,
          msg: "Age must be a number"
        }
      }
    },
    phone_number: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Phone number is required"
        },
        isNumeric: {
          args: true,
          msg: "Phone number must be a number"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (user, option) => {
        user.password = hashPassword(user.password)
      }
    },
  });
  return User;
};