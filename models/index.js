const mongoose = require("mongoose");
const { thoughtSchema } = require("./thoughs&reactions");

const User = require("./user&friends");
const Thought = mongoose.model("Thought", thoughtSchema);

module.exports = { Thought, User };
