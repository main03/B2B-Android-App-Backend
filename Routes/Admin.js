var express = require("express");
var router = express.Router();
const AdminController = require("../Controllers/Admin");

router.route("/login").post(AdminController.AdminLogin);

module.exports = router;
