const express = require("express");
const {
  createNewUser,
  getMyUsers,
  getUserByUsingId,
  updateExistingUser,
  deleteExistingUser,
  addFriend,
  removeFriend,
} = require("../../controllers/user_controllers");

const router = express.Router();

// Create a new user localhost:3001/api/users/
router.post("/", createNewUser);

// Get all users localhost:3001/api/users/
router.get("/", getMyUsers);

// Get a specific user by ID localhost:3001/api/users/userId
router.get("/:userId", getUserByUsingId);

// Update a user by ID localhost:3001/api/users/userId
router.put("/:userId", updateExistingUser);

// Delete a user by ID localhost:3001/api/users/userId
router.delete("/:userId", deleteExistingUser);

// Add/remove a friend for a specific user localhost:3001/api/users/userId/friends/friendId
router.post("/:userId/friends/:friendId", addFriend);
router.delete("/:userId/friends/:friendId", removeFriend);

module.exports = router;
