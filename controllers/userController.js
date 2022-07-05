const { User, Thoughts, Friends } = require("../models");

module.exports = {
  // Get all users
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  // Get a single user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__v")
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // create/post a new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  // update a user by its _id
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!CHECK ME!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { user: req.body } },
      { runValidators: true, new: true }
    ).then((user) =>
      !user
        ? res.status(404).json({ message: "No user with that ID" })
        : res.json(User).catch((err) => res.status(500).json(err))
    );
  },

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!WORK ON THIS NEXT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  updateFriends(req, res) {},

  deleteFriends(req, res) {},

  // // Delete a user and associated thoughts
  // deleteUser(req, res) {
  //   User.findOneAndDelete({ _id: req.params.userId })
  //     .then((user) =>
  //       !user
  //         ? res.status(404).json({ message: "No user with that ID" })
  //         : Thoughts.deleteMany({ _id: { $in: user.applications } })
  //     )
  //     .then(() => res.json({ message: "User and associated apps deleted!" }))
  //     .catch((err) => res.status(500).json(err));
  // },
  // // add Thoughts
  // addThoughts(req, res) {
  //   User.findOneAndUpdate(
  //     { _id: req.params.applicationId },
  //     { $addToSet: { thoughts: req.body } },
  //     { runValidators: true, new: true }
  //   )
  //     .then((application) =>
  //       !application
  //         ? res.status(404).json({ message: "No application with this id!" })
  //         : res.json(application)
  //     )
  //     .catch((err) => res.status(500).json(err));
  // },
  // // remove thoughts
  // removeThought(req, res) {
  //   User.findOneAndUpdate(
  //     { _id: req.params.applicationId },
  //     { $pull: { thought: { thoughtId: req.params.thoughtId } } },
  //     { runValidators: true, new: true }
  //   )
  //     .then((application) =>
  //       !application
  //         ? res.status(404).json({ message: "No application with this id!" })
  //         : res.json(application)
  //     )
  //     .catch((err) => res.status(500).json(err));
  // },
};
