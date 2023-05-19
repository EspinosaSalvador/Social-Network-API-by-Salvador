const { Schema, Types } = require("mongoose");
const moment = require("moment");

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: function (timestamp) {
        return moment(timestamp).format("MMMM Do, YYYY [at] h:mm a");
      },
    },
    updatedAt: {
      type: Date,
      default: Date.now,
      get: function (timestamp) {
        return moment(timestamp).format("MMMM Do, YYYY [at] h:mm a");
      },
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: function (timestamp) {
        return moment(timestamp).format("MMMM Do, YYYY [at] h:mm a");
      },
    },
    updatedAt: {
      type: Date,
      default: Date.now,
      get: function (timestamp) {
        return moment(timestamp).format("MMMM Do, YYYY [at] h:mm a");
      },
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

module.exports = { thoughtSchema, reactionSchema };
