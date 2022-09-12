const express = require("express");
const app = express();
const RegionController = require("../Controllers/Region_Api");
const CategoryController = require("../Controllers/Category_Api");
const ProductController = require("../Controllers/Product_Api");
const OrderController = require("../Controllers/Order_Api");
const RetailerController = require("../Controllers/Retailer_Api");
const UpcomingOfferController = require("../Controllers/UpcomingOffer_Api");
const authenticateRetailer = require("../Middleware/UserAuth");

app.post("/retailer", RetailerController.addRetailer);
app.post("/Login", RetailerController.retailerLogin);
app.get("/retailer", authenticateRetailer, RetailerController.getRetailer);

app.get("/region", RegionController.getRegion);
app.get("/category", CategoryController.getCategory);

app.get("/product", ProductController.getProduct);

app.post("/order", authenticateRetailer, OrderController.postOrder);
app.get("/order", authenticateRetailer, OrderController.getOrder);
app.put("/order/:id", authenticateRetailer, OrderController.updateOrder);

app.get("/upcomingoffers", UpcomingOfferController.getOffer);

module.exports = app;
