const { User, Thoughts } = require("../models");
const userController = require("./userController");

module.exports = {
  //get all thoughts
  getThoughts(req, res) {
    Thoughts.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },

  // get single thought by _id
  getSingleThought(req, res) {
    Thoughts.findOne({ _id: req.params.thoughtsId })
      .select("-__v")
      .then((thoughts) =>
        !thoughts
          ? res.status(404).json({ message: "No thoughts with that ID " })
          : res.json(thoughts)
      );
  },

  // post new thoughts (push through created thoughts _id to the associated user's thoughts array field)
  createThought(req, res) {
    Thoughts.create(req.body)
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },

  // put updates thought by _id
  updateThought(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { thought: req.body } },
      { runValidators: true, new: true }
    ).then((thought) =>
      !thought
        ? res.status(404).json({ message: "No thought with that ID" })
        : res.json(Thought).catch((err) => res.status(500).json(err))
    );
  },

  // delete thoughts by _id
  deleteThought(req, res) {
    User.findOneandDelete({ _id: req.params.thoughtsId })
      .then(
        (thoughts) =>
          !thoughts
            ? res.status(404).json({ message: "No thoughts with that ID" })
            : Thoughts.deleteMany({ _id: { $in: user.thoughts } }) // CHECK THIS
      )
      .then(() =>
        res.json({ message: "User and associated thoughts deleted!" })
      )
      .catch((err) => res.status(500).json(err));
  },
};
