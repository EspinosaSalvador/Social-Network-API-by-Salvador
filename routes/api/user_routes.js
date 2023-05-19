const express = require("express");
const {
  createNewUser,
  getMyUsers,
  getUserByUsingId,
  updateExistingUser,
  deleteExistingUser,
  addFriend,
  removeFriend,
} = require("../../controllers/user_controller");

const router = express.Router();

// Create a new user
router.post("/", createNewUser);

// Get all users
router.get("/", getMyUsers);

// Get a specific user by ID
router.get("/:userId", getUserByUsingId);

// Update a user by ID
router.put("/:userId", updateExistingUser);

// Delete a user by ID
router.delete("/:userId", deleteExistingUser);

// Add/remove a friend for a specific user
router.post("/:userId/friends/:friendId", addFriend);
router.delete("/:userId/friends/:friendId", removeFriend);

module.exports = router;
