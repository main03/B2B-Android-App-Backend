var express = require("express");
var router = express.Router();
const RetailerController = require("../Controllers/Retailer");
const authenticateRetailer=require("../Middleware/UserAuth")

router.route("/").post(RetailerController.addRetailer);
router.route("/Login").post(RetailerController.retailerLogin);
router.route("/").get(authenticateRetailer,RetailerController.getRetailer);



// app.post("/retailer", RetailerController.addRetailer);
// app.post("/Login", RetailerController.retailerLogin);
// app.get("/retailer", authenticateRetailer, RetailerController.getRetailer);
module.exports = router;
