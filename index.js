const express = require("express");
const mongodb = require("mongodb");
const cors = require("cors");
const path = require('path');
const mongooose = require("mongoose");
mongooose.connect(
  "mongodb://Sheharyar:a@ac-icn4hca-shard-00-00.mvnan7c.mongodb.net:27017,ac-icn4hca-shard-00-01.mvnan7c.mongodb.net:27017,ac-icn4hca-shard-00-02.mvnan7c.mongodb.net:27017/?ssl=true&replicaSet=atlas-zzfoll-shard-0&authSource=admin&retryWrites=true&w=majority"
);
const bcrypt = require("bcrypt");
const AuthenticateAdmin = require("./Middleware/Auth-Admin");
const app = express();
const bodyparser = require("body-parser");
// const UpcomingOffer=require('./UpcomingOffersSchema/UpcomingOffers')
const AdminController = require("./Controllers/Admin_Api");
const RegionController = require("./Controllers/Region_Api");
const CategoryController = require("./Controllers/Category_Api");
const ProductController = require("./Controllers/Product_Api");
const OrderController = require("./Controllers/Order_Api");
const upload=require('./Middleware/upload')
// const CategoryImage=require('./Middleware/CategoryImage')
const UpcomingOfferController = require("./Controllers/UpcomingOfferApi");
// app.use(bodyparser.urlencoded({ extended: false }));
const jsonparser = bodyparser.json();
app.use(bodyparser.json());
app.use(cors());

const jwt = require("jsonwebtoken");
const multer = require("multer");

// app.use(express.static('public')); 
app.use('/uploads', express.static('uploads'));

const UpcomingOffer = require("./UpcomingOffersSchema/UpcomingOffers");
//Admin Route
app.post("/AdminAuthenticate", AdminController.AdminVerify);
//Region Routes
app.get("/region", AuthenticateAdmin, RegionController.GetallRegionList);
app.post("/region", AuthenticateAdmin, RegionController.PostRegion);
app.put("/region/:id", AuthenticateAdmin, RegionController.UpdateRegion);
app.delete("/region/:id",AuthenticateAdmin, RegionController.DeleteRegion);
//Category Routes
app.get("/category", AuthenticateAdmin, CategoryController.GetallCategoryList);
app.post("/category", AuthenticateAdmin,upload.single('CategoryImage'),CategoryController.CreateNewCategory);
app.put("/category/:id", AuthenticateAdmin, CategoryController.UpdateCategory);
app.delete("/category/:id",AuthenticateAdmin,CategoryController.DeleteCategory);
//Product Routes
app.get("/product", AuthenticateAdmin, ProductController.GetAllProductList);
app.post("/product", AuthenticateAdmin,upload.single('ProductImage'), ProductController.CreateNewProduct);
app.put("/product/:id", AuthenticateAdmin, ProductController.UpdateProduct);
app.delete("/product/:id", AuthenticateAdmin, ProductController.DeleteProduct);
//Order's Routes
app.get("/order", AuthenticateAdmin, OrderController.GetAllOrderList);
app.put("/order/:id", AuthenticateAdmin, OrderController.UpdateOrders);
//upcomingoffers routes
//phly authenticate admin ad ho ga phir upload.single wala code aye ga
// upload.single('OfferImage') add this after authenticate admin
app.post("/upcomingoffers",AuthenticateAdmin,upload.single('OfferImage'),UpcomingOfferController.CreateUpcomingOffer);

//cors problem
// res.setHeader('Access-Control-Allow-Origin', '*');
// res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
// res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
// next();
//multer storage
app.listen(5000);