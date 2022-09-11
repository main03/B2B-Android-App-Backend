const express = require("express");
const cors = require("cors");
const path=require('path');
const mongooose = require("mongoose");
mongooose.connect(
  "mongodb://Sheharyar:a@ac-icn4hca-shard-00-00.mvnan7c.mongodb.net:27017,ac-icn4hca-shard-00-01.mvnan7c.mongodb.net:27017,ac-icn4hca-shard-00-02.mvnan7c.mongodb.net:27017/?ssl=true&replicaSet=atlas-zzfoll-shard-0&authSource=admin&retryWrites=true&w=majority"
);
const port = 5000;
const app = express();
const bodyparser = require("body-parser");
app.use(bodyparser.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

const AuthenticateAdmin = require("./Middleware/Auth-Admin");
const authenticateRetailer = require("./Middleware/UserAuth");
const AdminController = require("./Controllers/Admin_Api");
const RegionController = require("./Controllers/Region_Api");
const CategoryController = require("./Controllers/Category_Api");
const ProductController = require("./Controllers/Product_Api");
const OrderController = require("./Controllers/Order_Api");
const RetailerController = require("./Controllers/Retailer_Api");
const upload = require("./Middleware/ImageUpload");
const UpcomingOfferController = require("./Controllers/UpcomingOffer_Api");


// --------------------------------------------------------------------------------------
//Admin Route
app.post("/AdminAuthenticate", AdminController.AdminVerify);

//sherry order routes
app.get("/order", AuthenticateAdmin, OrderController.GetAllOrderList);
app.put("/order/:id", AuthenticateAdmin, OrderController.UpdateOrders);

//Region Routes
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
//offer Api

app.post( "/upcomingoffers", AuthenticateAdmin,upload.single("OfferImage"),
UpcomingOfferController.CreateUpcomingOffer
);


// ========================================================================================
//Maaz Routes
//Retailer Routes
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





//app.post("/retailer", RetailerController.CreateRetailer);
// console.log(`Server is running on ${PORT} PORT....`);
// app.listen(PORT);
app.listen(process.env.PORT || port, () => console.log(`Server running at http://localhost:${port}`));
