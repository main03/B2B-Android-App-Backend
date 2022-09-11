const express = require("express");
const cors = require("cors");
const mongooose = require("mongoose");
const retailer = require("./Routes/Retailer-Routes");
const admin = require("./Routes/Admin-Routes");
const authenticateRetailer = require("./Middleware/UserAuth");
const AuthenticateAdmin = require("./Middleware/Auth-Admin");
mongooose.connect(
  "mongodb://Sheharyar:a@ac-icn4hca-shard-00-00.mvnan7c.mongodb.net:27017,ac-icn4hca-shard-00-01.mvnan7c.mongodb.net:27017,ac-icn4hca-shard-00-02.mvnan7c.mongodb.net:27017/?ssl=true&replicaSet=atlas-zzfoll-shard-0&authSource=admin&retryWrites=true&w=majority"
);
const port = 5000;
const app = express();
const bodyparser = require("body-parser");
app.use(bodyparser.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

app.use("/Admin-Routes", admin);
app.use("/Retailer-Routes", retailer);

app.listen(process.env.PORT || port, () =>
  console.log(`Server running at http://localhost:${port}`)
);
