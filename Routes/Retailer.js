var express = require("express");
var router = express.Router();
const RetailerController = require("../Controllers/Retailer");

router.route("/").post(RetailerController.addRetailer);
router.route("/Login").post(RetailerController.retailerLogin);
router.route("/").get(RetailerController.getRetailer);



// app.post("/retailer", RetailerController.addRetailer);
// app.post("/Login", RetailerController.retailerLogin);
// app.get("/retailer", authenticateRetailer, RetailerController.getRetailer);
module.exports = router;
