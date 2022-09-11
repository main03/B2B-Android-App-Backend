const express = require("express");
const app = express();
const AuthenticateAdmin = require("../Middleware/Auth-Admin");
const AdminController = require("../Controllers/Admin_Api");
const RegionController = require("../Controllers/Region_Api");
const CategoryController = require("../Controllers/Category_Api");
const ProductController = require("../Controllers/Product_Api");
const OrderController = require("../Controllers/Order_Api");
const UpcomingOfferController = require("../Controllers/UpcomingOffer_Api");

const upload = require("../Middleware/ImageUpload");
// app.use(".uploads", express.static("uploads"));
app.post("/AdminAuthenticate", AdminController.AdminVerify);

//sherry order routess
app.get("/order", AuthenticateAdmin, OrderController.GetAllOrderList);
app.put("/order/:id", AuthenticateAdmin, OrderController.UpdateOrders);

//Region Routess
app.get("/region", AuthenticateAdmin, RegionController.GetallRegionList);
app.post("/region", AuthenticateAdmin, RegionController.PostRegion);
app.put("/region/:id", AuthenticateAdmin, RegionController.UpdateRegion);
app.delete("/region/:id", AuthenticateAdmin, RegionController.DeleteRegion);

//Product Routes
app.get("/product", AuthenticateAdmin, ProductController.GetAllProductList);
app.post(
  "/product",
  AuthenticateAdmin,
  upload.single("ProductImage"),
  ProductController.CreateNewProduct
);
app.put("/product/:id", AuthenticateAdmin, ProductController.UpdateProduct);
app.delete("/product/:id", AuthenticateAdmin, ProductController.DeleteProduct);

//categoryyy
app.get("/category", AuthenticateAdmin, CategoryController.GetallCategoryList);
app.post(
  "/category",
  AuthenticateAdmin,
  upload.single("CategoryImage"),
  CategoryController.CreateNewCategory
);
app.put("/category/:id", AuthenticateAdmin, CategoryController.UpdateCategory);
app.delete(
  "/category/:id",
  AuthenticateAdmin,
  CategoryController.DeleteCategory
);
//offer Api

app.post(
  "/upcomingoffers",
  AuthenticateAdmin,
  upload.single("OfferImage"),
  UpcomingOfferController.CreateUpcomingOffer
);

module.exports = app;
