const router = require("express").Router();

const {
  getThoughts,
  getSingleThought,
  createThought,
} = require("../../controllers/thoughtsController");

// /api/thoughts

router.route("/").get(getThoughts).post(createThought);

// /api/thoughts/:thoughtId/reactions

router.router("/:thoughtId").get(getSingleThought);

module.exports = router;
