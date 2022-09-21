const express = require("express");
require('dotenv').config();
const cors = require("cors");
const path=require('path');
const mongooose = require("mongoose");
mongooose.connect(
  "mongodb://Sheharyar:a@ac-icn4hca-shard-00-00.mvnan7c.mongodb.net:27017,ac-icn4hca-shard-00-01.mvnan7c.mongodb.net:27017,ac-icn4hca-shard-00-02.mvnan7c.mongodb.net:27017/?ssl=true&replicaSet=atlas-zzfoll-shard-0&authSource=admin&retryWrites=true&w=majority"
);
const admin = require("./Routes/Admin");
const retailer = require("./Routes/Retailer");
const categories = require("./Routes/Categories")
const AdminProduct=require("./Routes/Admin/Product")
const RetailerProduct=require("./Routes/Retailer/Product")
const AdminOrders=require("./Routes/Admin/Orders")
const RetailerOrders=require("./Routes/Retailer/Order")
const upcomingoffers=require("./Routes/Offers")
const regions=require("./Routes/Region")
const app = express();
app.use(cors());
const bodyparser = require("body-parser");
app.use(bodyparser.json());

const port=5000;
app.use("/uploads", express.static("uploads"));
app.use('/category', categories)
app.use('/product',AdminProduct)
app.use('/products',RetailerProduct)
app.use('/order',AdminOrders)
app.use('/orders',RetailerOrders)
app.use('/upcomingoffers',upcomingoffers)
app.use('/region',regions)
app.use('/admin',admin)
app.use('/retailer',retailer)
console.log("Mongo DB Cloud Atlas Connected Successfullyy.....");
app.listen(process.env.PORT || port , () => console.log("Server running at PORT :"+ port));



