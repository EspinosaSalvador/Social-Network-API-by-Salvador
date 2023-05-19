const express = require("express");
const {
  createThought,
  getAllMyThoughts,
  getSingleThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require("../../controllers/thought_controller");

const router = express.Router();

// Create a new thought "localhost:3001/api/thoughts/"
router.post("/", createThought);

// Get all thoughts "localhost:3001/api/thoughts/"
router.get("/", getAllMyThoughts);

// Get a specific thought by ID "localhost:3001/api/thoughts/thoughtId"
router.get("/:thoughtId", getSingleThought);

// Update a thought by ID ""localhost:3001/api/thoughts/thoughtId""
router.put("/:thoughtId", updateThought);

// Delete a thought by ID ""localhost:3001/api/thoughts/thoughtId""
router.delete("/:thoughtId", deleteThought);

// Add a reaction to a thought "localhost:3001/api/thoughts/thoughtId/reactions"
router.post("/:thoughtId/reactions", addReaction);

// Remove a reaction from a thought "localhost:3001/api/thoughts/thoughtId/reactions/reactionId"
router.delete("/:thoughtId/reactions/:reactionId", removeReaction);

module.exports = router;
