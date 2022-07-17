const { Schema, Types, model } = require("mongoose");
const { userSchema } = require("./User");
const { reactionsSchema } = require("./Reactions");

const thoughtsSchema = new Schema(
  {
    thoughtId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: [userSchema],
    reactions: [reactionsSchema],
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

thoughtsSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thoughts = model("thoughts", thoughtsSchema);

module.exports = Thoughts;
