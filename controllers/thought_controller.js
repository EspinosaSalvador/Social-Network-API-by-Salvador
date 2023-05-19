const { Thought, User } = require("../models");

function getAllMyThoughts(req, res) {
  Thought.find()
    .then((dbThoughtData) => {
      res.json(dbThoughtData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
}

function getSingleThought(req, res) {
  Thought.findOne({ _id: req.params.thoughtId })
    .then((dbThoughtData) => {
      if (!dbThoughtData) {
        return res
          .status(404)
          .json({ message: "This thought is not longer valid" });
      }
      res.json(dbThoughtData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
}

function createThought(req, res) {
  Thought.create(req.body)
    .then((dbData) =>
      User.findOneAndUpdate(
        { _id: req.body.userId },
        { $push: { thoughts: dbData._id } },
        { new: true }
      )
    )
    .then((dbUserData) => {
      console.log(dbUserData);
      res.json({ message: "Thought successfully created!" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
}

function updateThought(req, res) {
  Thought.findOneAndUpdate(
    { _id: req.params.thoughtId },
    { $set: req.body },
    { runValidators: true, new: true }
  )
    .then((dbThoughtData) => {
      if (!dbThoughtData) {
        return res.status(404).json({ message: "No thought with this id!" });
      }
      res.json(dbThoughtData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
}

function deleteThought(req, res) {
  Thought.findOneAndRemove({ _id: req.params.thoughtId })
    .then((dbThoughtData) =>
      User.findOneAndUpdate(
        { thoughts: req.params.thoughtId },
        { $pull: { thoughts: req.params.thoughtId } },
        { new: true }
      )
    )
    .then((dbUserData) => {
      res.json({ message: "Thought deleted." });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
}

function addReaction(req, res) {
  Thought.findOneAndUpdate(
    { _id: req.params.thoughtId },
    { $addToSet: { reactions: req.body } },
    { runValidators: true, new: true }
  )
    .then((dbThoughtData) => {
      if (!dbThoughtData) {
        return res.status(404).json({ message: "Doesn't exist." });
      }
      res.json(dbThoughtData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
}

function removeReaction(req, res) {
  Thought.findOneAndUpdate(
    { _id: req.params.thoughtId },
    { $pull: { reactions: { reactionId: req.params.reactionId } } },
    { runValidators: true, new: true }
  )
    .then((dbThoughtData) => {
      if (!dbThoughtData) {
        return res.status(404).json({ message: "Doesn't exist." });
      }
      res.json(dbThoughtData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
}

module.exports = {
  getAllMyThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
};
