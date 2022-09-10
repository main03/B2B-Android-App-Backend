const express = require("express");
const cors = require("cors");
const mongooose = require("mongoose");
mongooose.connect(
  "mongodb://Sheharyar:a@ac-icn4hca-shard-00-00.mvnan7c.mongodb.net:27017,ac-icn4hca-shard-00-01.mvnan7c.mongodb.net:27017,ac-icn4hca-shard-00-02.mvnan7c.mongodb.net:27017/?ssl=true&replicaSet=atlas-zzfoll-shard-0&authSource=admin&retryWrites=true&w=majority"
);
const PORT = 5000;
const AuthenticateAdmin = require("./Middleware/Auth-Admin");
const authenticateRetailer = require("./Middleware/UserAuth");
const app = express();
const bodyparser = require("body-parser");

const AdminController = require("./Controllers/Admin_Api");
const RegionController = require("./Controllers/Region_Api");
const CategoryController = require("./Controllers/Category_Api");
const ProductController = require("./Controllers/Product_Api");
const OrderController = require("./Controllers/Order_Api");
const RetailerController = require("./Controllers/Retailer_Api");

const upload = require("./Middleware/ImageUpload");

const UpcomingOfferController = require("./Controllers/UpcomingOffer_Api");

app.use(bodyparser.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

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

//Admin Route
app.post("/AdminAuthenticate", AdminController.AdminVerify);
// app.get("/AdminAuthenticate", AdminController.GetallAdmin);
//Region Routes
app.get("/region", AuthenticateAdmin, RegionController.GetallRegionList);
app.post("/region", AuthenticateAdmin, RegionController.PostRegion);
app.put("/region/:id", AuthenticateAdmin, RegionController.UpdateRegion);
app.delete("/region/:id", AuthenticateAdmin, RegionController.DeleteRegion);

//Category Routes
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

//Order's Routes
app.get("/order", AuthenticateAdmin, OrderController.GetAllOrderList);
app.put("/order/:id", AuthenticateAdmin, OrderController.UpdateOrders);

//upcomingoffers routes
//phly authenticate admin ad ho ga phir upload.single wala code aye ga
// upload.single('OfferImage') add this after authenticate admin
app.post(
  "/upcomingoffers",
  AuthenticateAdmin,
  upload.single("OfferImage"),
  UpcomingOfferController.CreateUpcomingOffer
);

//Retailer Routes
//app.post("/retailer", RetailerController.CreateRetailer);
console.log(`Server is running on ${PORT} PORT....`);
app.listen(PORT);
