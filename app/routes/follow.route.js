const express = require("express");
const follows = require("../controllers/follow.controller");

const router = express.Router();

router.route("/")
    .get(follows.findAll)
    .post(follows.create)
    .delete(follows.deleteAll);

router.route("/:id")
    .get(follows.findOne)
    .put(follows.update)
    .delete(follows.delete);

module.exports = router;
