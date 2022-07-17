const { Schema, Types, model } = require("mongoose");
const { userSchema } = require("./User");

const reactionsSchema = new Schema(
  {
    reactionId: [
      {
        type: Schema.Types.ObjectId,
        ref: "Reaction",
      },
    ],
    reactionBody: { type: String, required: true, maxLength: 280 },
    username: [userSchema],
    createdAt: { type: Date, default: Date.now },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

// getter for timestamp on query
//reactionsSchema.
const Reactions = model("reactions", reactionsSchema);

module.exports = { Reactions, reactionsSchema };
