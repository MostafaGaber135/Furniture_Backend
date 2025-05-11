const express = require("express");
const {
  getAllUsers,
  getUserById,
<<<<<<< HEAD
  deleteUserById,
  updateUserById,
  changePassword,
} = require("../controller/user.controller.js");
const upload = require("../utils/multer.utils.js");
=======
  updateUser,
  deleteUser,
  addToWishlist,
  removeFromWishlist,
} = require("../controller/user.controller");
const { auth } = require("../Middleware/auth.middleware");
>>>>>>> 558d9e0 (first commit)

const router = express.Router();

router.route("/").get(auth, getAllUsers);
router
  .route("/:id")
<<<<<<< HEAD
  .get(restrictTo("admin", "super_admin"), getUserById)
  .delete(restrictTo("admin", "super_admin"), deleteUserById)
  .patch(upload.single("image"),restrictTo("admin", "super_admin"),updateUserById);
  
router.patch(
  "/changePassword",
  auth,
  validateChangePasswordInput,
  changePassword
);
=======
  .get(auth, getUserById)
  .put(auth, updateUser)
  .delete(auth, deleteUser);

router.put("/:id/wishlist/add", auth, addToWishlist);
router.put("/:id/wishlist/remove", auth, removeFromWishlist);
>>>>>>> 558d9e0 (first commit)

module.exports = router;
