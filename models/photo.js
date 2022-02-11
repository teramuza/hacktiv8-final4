'use strict';
const {
  Model
} = require('sequelize');
const user = require('./user');
module.exports = (sequelize, DataTypes) => {
  class Photo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Photos N - 1 User
      Photo.belongsTo(models.User, { foreignKey: "userid"});
      // Photo 1 - N Comments
      Photo.hasMany(models.Comment, { foreignKey: "photoid" });
    }
  };
  Photo.init({
    title:  {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Title is required"
        }
      }
    },
    caption: {
      type: DataTypes.TEXT,
      validate: {
        notEmpty: {
          args: true,
          msg: "Caption is required"
        }
      }
    },
    poster_image_url: {
      type: DataTypes.TEXT,
      validate: {
        notEmpty: {
          args: true,
          msg: "poster image url is required"
        },
        isUrl: {
          args: true,
          msg: "Poster image url is invalid"
        }
      }
    },
    userid: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Photo',
  });
  return Photo;
};