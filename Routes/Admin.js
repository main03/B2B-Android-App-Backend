var express = require("express");
var router = express.Router();
const AdminController = require("../Controllers/Admin");

router.route("/").post(AdminController.AdminLogin);

module.exports = router;
