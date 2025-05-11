const express = require("express");
const {
  createRating,
  getAllRatings,
  getRatingById,
  updateRating,
  deleteRating,
} = require("../controller/rating.controller");
const { auth } = require("../Middleware/auth.middleware");

const router = express.Router();

router.route("/").post(auth, createRating).get(getAllRatings);
router
  .route("/:id")
  .get(getRatingById)
  .put(auth, updateRating)
  .delete(auth, deleteRating);

module.exports = router;
