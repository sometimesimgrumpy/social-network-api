const { Schema, model } = require("mongoose");
const User = require("./User");

const reactionsSchema = new Schema(
  {
    reactionId: [
      {
        type: Schema.Types.ObjectId,
        ref: "Reaction",
      },
    ],
    reactionBody: { type: String, required: true, maxLength: 280 },
    username: [User],
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
