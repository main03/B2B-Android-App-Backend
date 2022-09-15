const express = require("express");
const cors = require("cors");
const path=require('path');
const mongooose = require("mongoose");
mongooose.connect(
  "mongodb://Sheharyar:a@ac-icn4hca-shard-00-00.mvnan7c.mongodb.net:27017,ac-icn4hca-shard-00-01.mvnan7c.mongodb.net:27017,ac-icn4hca-shard-00-02.mvnan7c.mongodb.net:27017/?ssl=true&replicaSet=atlas-zzfoll-shard-0&authSource=admin&retryWrites=true&w=majority"
);
const admin = require("./Routes/Admin");
const retailer = require("./Routes/Retailer");
//new
const categories = require("./Routes/Categories")
const products=require("./Routes/Product")
const orders=require("./Routes/Orders")
const upcomingoffers=require("./Routes/Offers")
const regions=require("./Routes/Region")

const port = 5000;
const app = express();
const bodyparser = require("body-parser");
app.use(bodyparser.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

// app.use("/Admin-Routes", admin);
// app.use("/Retailer-Routes", retailer);

//new routes
app.use('/category', categories)
app.use('/product',products)
app.use('/order',orders)
app.use('/upcomingoffers',upcomingoffers)
app.use('/region',regions)
app.use('/AdminLogin',admin)
app.use('/retailer',retailer)




//m aik comment kr rha huuuuu


console.log("Mongo DB Cloud Atlas Connected Successfullyy.....");
app.listen(process.env.PORT || port, () => console.log(`Server running at http://localhost:${port}`));


