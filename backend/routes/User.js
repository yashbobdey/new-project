const express = require("express");
const protect = require("../middlewares/protect");
const userController = require(`../controllers/User`);
const upload = require("../middlewares/fileStorage");
const router = express.Router(); //middeleware

router
  .route("/")
  .get(protect, userController.getAllUsers)
  .post(upload.single("userProfile"), userController.addUser);

router.route("/login").post(userController.login);

router
  .route("/:id")
  .get(userController.getUser)
  .patch(protect, userController.updateUser)
  .delete(protect, userController.deleteUser);

module.exports = router;
