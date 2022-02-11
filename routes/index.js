const route = require("express").Router();
const authentication = require("../middlewares/authentication");
const { userAuthorization, photoAuthorization, sosialMediaAuthorization, commentAuthorization } = require("../middlewares/authorization");
const userController = require("../controllers/userController");
const photoController = require("../controllers/photoController");
const sosialMediaController = require("../controllers/socialmediaController");
const commentController = require("../controllers/commentController");
 
 
route.get("/", (req, res) => {
  res.json({
    page: "home",
  });
});
 
 
// user
route.post("/users/register", userController.register);
route.post("/users/login", userController.login);
 
// authentication middleware
route.use(authentication);
 
// user authorization middleware
route.use("/users/:id", userAuthorization);
 
//sosial media
route.post("/socialmedias", sosialMediaController.inputSosialMedia)
route.get("/socialmedias", sosialMediaController.getSosialMedia)
route.use("/socialmedias/:id", sosialMediaAuthorization);
route.put("/socialmedias/:id", sosialMediaController.updateSosialMedia)
route.delete("/socialmedias/:id", sosialMediaController.deleteSosialMedia)
 
//comment
route.post("/comments", commentController.inputKomen)
route.get("/comments", commentController.getComment)
 
route.use("/comments/:id", commentAuthorization);
route.put("/comments/:id", commentController.updateComment)
route.delete("/comments/:id", commentController.deleteComment)
 
route.put("/users/:id", userController.update);
route.delete("/users/:id", userController.delete);
 
// photos
route.post("/photos", photoController.create);
route.get("/photos", photoController.getAll);
 
// photos authorization middleware
route.use("/photos/:id", photoAuthorization);
 
route.put("/photos/:id", photoController.update);
route.delete("/photos/:id", photoController.delete);
 
module.exports = route
route.post("/photos", photoController.create);
route.get("/photos", photoController.getAll);

// photos authorization middleware
route.use("/photos/:id", photoAuthorization);

route.put("/photos/:id", photoController.update);
route.delete("/photos/:id", photoController.delete);

module.exports = route

