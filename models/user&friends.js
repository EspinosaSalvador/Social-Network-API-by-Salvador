const { Schema, model } = require("mongoose");
const moment = require("moment");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 1,
      maxlength: 255,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
        "You have to use a valid email address",
      ],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    timestamps: true,
  }
);

userSchema.virtual("thoughtsCount").get(function () {
  return this.thoughts.length;
});

userSchema.virtual("friendsCount").get(function () {
  return this.friends.length;
});

userSchema.index({ username: 1 });
userSchema.index({ email: 1 });

const User = model("User", userSchema);

module.exports = User;
