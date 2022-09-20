const express = require("express");
require('dotenv').config();
const cors = require("cors");
const path=require('path');
const mongooose = require("mongoose");
mongooose.connect(
  process.env.DATABASE_CONNECTION_URL
);
const admin = require("./Routes/Admin");
const retailer = require("./Routes/Retailer");
const categories = require("./Routes/Categories")
const products=require("./Routes/Product")
const AdminOrders=require("./Routes/AdminOrders/Orders")
const RetailerOrders=require("./Routes/RetailerOrder/Order")
const upcomingoffers=require("./Routes/Offers")
const regions=require("./Routes/Region")
const app = express();
app.use(cors());
app.use((req,res,next)=>
{
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
next();

})
const bodyparser = require("body-parser");
app.use(bodyparser.json());

app.use("/uploads", express.static("uploads"));
app.use('/category', categories)
app.use('/product',products)
app.use('/order',AdminOrders)
app.use('/orders',RetailerOrders)
app.use('/upcomingoffers',upcomingoffers)
app.use('/region',regions)
app.use('/admin',admin)
app.use('/retailer',retailer)
console.log("Mongo DB Cloud Atlas Connected Successfullyy.....");
app.listen(process.env.PORT || process.env.BACKEND_PORT , () => console.log("Server running at PORT :"+ process.env.BACKEND_PORT));


