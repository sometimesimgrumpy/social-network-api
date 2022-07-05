const { Schema, Types } = require("mongoose");
const User = require("./User");
const Reactions = require("./Reactions");

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
    username: [User],
    reactions: [Reactions],
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
