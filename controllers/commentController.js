const { Comment, Photo, User } = require("../models");
const { verifyToken } = require("../helpers/jwt");
 
 
class CommentController {
 
  static inputKomen(req, res) {
    var userId = verifyToken(req.headers.token).id
    Object.assign(req.body, { userid: userId })
    Comment.create(req.body)
      .then(result => {
        res.status(201).json({
          comment: result.dataValues
        });
      })
      .catch((err => {
        res.status(500).json({
          message: err.errors[0].message
        });
      }));
  }
 
  static getComment(req, res) {
    Comment.belongsTo(User, { foreignKey: 'userid' })
    Comment.belongsTo(Photo, { foreignKey: 'photoid' })
    User.hasMany(Comment, { foreignKey: 'id' })
    Photo.hasMany(Comment, { foreignKey: 'id' })
    var user = res.locals.user
    Comment.findAll({
      where: { userid: user.id },
      include: [
        {
          model: Photo,
          attributes: ['id', 'title', 'caption', 'poster_image_url']
        },
        {
          model: User,
          attributes: ['id', 'username', 'profile_image_url', 'phone_number']
        },
      ],
    }).then(result => {
      if (result == "") {
        res.status(200).json({
            Message: "No comments found"
        })
    } else {
        res.status(200).json({
            comments: result
        });
    }
    }).catch((err => {
      res.status(500).json({
        message: err.errors[0].message
      });
    }));
  }
 
  static updateComment(req, res) {
    Comment.update(req.body,
      {
        where: {
          id: req.params.id
        },
        returning: true
      }).then(result => {
        res.status(201).json({
          comment: result[1][0]
        });
      })
      .catch((err => {
        res.status(500).json({
          message: err.errors[0].message
        });
      }));
  }
 
  static deleteComment(req, res) {
    Comment.destroy(
      {
        where: {
          id: req.params.id
        },
      }).then((result) => {
        if (!result) {
          res.status(500).json({ message: "Account does not exist" })
        } else {
          res.status(201).json({
            message: "Your comment has been successfully deleted"
          });
        }
      })
      .catch((err => {
        res.status(500).json(err)
      }));
  }
 
}
 
 
module.exports = CommentController;