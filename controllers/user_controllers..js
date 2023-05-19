const { User, Thought } = require("../models");
const moment = require("moment");

function getMyUsers(req, res) {
  User.find({})
    .then((users) => {
      res.json(users);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
}

function getUserByUsingId(req, res) {
  User.findOne({ _id: req.params.userId })
    .populate("friends")
    .populate("thoughts")
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "No user has that id" });
      }
      res.json(user);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
}

function createNewUser(req, res) {
  req.body.createdAt = moment().format();
  User.create(req.body)
    .then((user) => {
      res.json(user);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
}

function updateExistingUser(req, res) {
  req.body.updatedAt = moment().format();
  User.findOneAndUpdate(
    { _id: req.params.userId },
    {
      $set: req.body,
    },
    {
      runValidators: true,
      new: true,
    }
  )
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "No user with this id!" });
      }
      res.json(user);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
}

function deleteExistingUser(req, res) {
  User.findOneAndDelete({ _id: req.params.userId })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "No user with this id!" });
      }
      res.status(200).json(user);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
}

function addFriend(req, res) {
  User.findOneAndUpdate(
    { _id: req.params.userId },
    { $push: { friends: req.params.friendId } },
    { new: true }
  )
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "No user has this id" });
      }
      res.json(user);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
}

function removeFriend(req, res) {
  User.findOneAndUpdate(
    { _id: req.params.userId },
    { $pull: { friends: req.params.friendId } },
    { new: true }
  )
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "No user has this id!" });
      }
      res.json(user);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
}

module.exports = {
  getMyUsers,
  getUserByUsingId,
  createNewUser,
  updateExistingUser,
  deleteExistingUser,
  addFriend,
  removeFriend,
};
