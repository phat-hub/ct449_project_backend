const express = require("express");
const employees = require("../controllers/employee.controller");

const router = express.Router();

router.route("/register")
    .post(employees.create)

router.route("/:id")
    .get(employees.findOne)
    .put(employees.update)

router.route("/login")
    .post(employees.login);

module.exports = router;
