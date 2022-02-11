const { SocialMedia, User } = require("../models");
const { verifyToken } = require("../helpers/jwt");
 
 
class SosialMediaController {
 
  static inputSosialMedia(req, res) {
    var userId = verifyToken(req.headers.token).id
    Object.assign(req.body, { userid: userId })
    SocialMedia.create(req.body)
      .then(result => {
        res.status(201).json({
          social_media: result.dataValues
        });
      })
      .catch((err => {
        res.status(500).json({
          message: err.errors[0].message
        });
      }));
  }
 
  static getSosialMedia(req, res) {
    SocialMedia.belongsTo(User, { foreignKey: 'userid' })
    User.hasMany(SocialMedia, { foreignKey: 'id' })
    var user = res.locals.user
    SocialMedia.findAll({
      where: {
        userid: user.id
      },
      include: [{
        model: User,
        attributes: ['id', 'username', 'profile_image_url']
      }],
    }).then(result => {
      res.status(201).json({
        social_media: result
      });
    }).catch((err => {
      res.status(500).json({
        message: err.errors[0].message
      });
    }));
  }
 
  static updateSosialMedia(req, res) {
    SocialMedia.update(req.body,
      {
        where: {
          id: req.params.id
        },
        returning: true
      }).then(result => {
        res.status(201).json({
          social_media: result[1][0]
        });
      })
      .catch((err => {
        res.status(500).json({
          message: err.errors[0].message
        });
      }));
  }
 
  static deleteSosialMedia(req, res) {
    SocialMedia.destroy(
      {
        where: {
          id: req.params.id
        },
      }).then((result) => {
        if (!result) {
          res.status(500).json({ message: "Account does not exist" })
        } else {
          res.status(201).json({
            message: "Your social media has been successfully deleted"
          });
        }
      })
      .catch((err => {
        res.status(500).json(err)
      }));
  }
}
 
module.exports = SosialMediaController;