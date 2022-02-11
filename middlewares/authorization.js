const { User, Photo, SocialMedia, Comment } = require("../models");
 
function userAuthorization(req, res, next) {
  const userId = req.params.id;
  const authenticationUser = res.locals.user;
 
  User.findOne({
    where: {
      id: userId
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).json({
          name: "Data not found",
          message: `User with id "${userId}" not found`
        });
      }
      if (user.id === authenticationUser.id) {
        return next();
      } else {
        return res.status(403).json({
          name: "Authorization error",
          message: `User with email "${authenticationUser.email}" does not have permission to access User with email "${user.email}"`
        });
      }
    })
    .catch(err => {
      return res.status(500).json(err);
    })
}
 
function photoAuthorization(req, res, next) {
  const photoId = req.params.id;
  const authenticationUser = res.locals.user;
 
  Photo.findOne({
    where: {
      id: photoId
    }
  })
    .then(photo => {
      if (!photo) {
        return res.status(404).json({
          name: "Data not found",
          message: `Photo with id "${photoId}" not found`
        });
      }
      if (photo.userid === authenticationUser.id) {
        return next();
      } else {
        return res.status(403).json({
          name: "Authorization error",
          message: `User with email "${authenticationUser.email}" does not have permission to access Photo with id "${photo.id}"`
        });
      }
    })
    .catch(err => {
      return res.status(500).json(err);
    })
}
 
function sosialMediaAuthorization(req, res, next) {
  const sosmedId = req.params.id;
  const authenticationUser = res.locals.user;
 
  SocialMedia.findOne({
    where: {
      id: sosmedId
    }
  })
    .then(sosmed => {
      if (!sosmed) {
        return res.status(404).json({
          name: "Data not found",
          message: `Sosial media with id "${sosmedId}" not found`
        });
      }
      if (sosmed.userid === authenticationUser.id) {
        return next();
      } else {
        return res.status(403).json({
          name: "Authorization error",
          message: `User with email "${authenticationUser.email}" does not have permission to access SocialMedia with id "${sosmed.id}"`
        });
      }
    })
    .catch(err => {
      return res.status(500).json(err);
    })
}
 
function commentAuthorization(req, res, next) {
  const commentId = req.params.id;
  const authenticationUser = res.locals.user;
 
  Comment.findOne({
    where: {
      id: commentId
    }
  })
    .then(comment => {
      if (!comment) {
        return res.status(404).json({
          name: "Data not found",
          message: `Comment with id "${commentId}" not found`
        });
      }
      if (comment.userid === authenticationUser.id) {
        return next();
      } else {
        return res.status(403).json({
          name: "Authorization error",
          message: `User with email "${authenticationUser.email}" does not have permission to access Comment with id "${comment.id}"`
        });
      }
    })
    .catch(err => {
      return res.status(500).json(err);
    })
}
 
module.exports = {
  userAuthorization,
  photoAuthorization,
  sosialMediaAuthorization,
  commentAuthorization
}