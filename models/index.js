const mongoose = require("mongoose");
const { thoughtSchema } = require("./thoughs&reactions");

const User = require("./user");
const Thought = mongoose.model("Thought", thoughtSchema);

module.exports = { Thought, User };
