const express = require("express");
const mongodb = require("mongodb");
const cors = require("cors");
const mongooose = require("mongoose");
mongooose.connect(
  "mongodb+srv://Sheharyar:a@cluster0.mvnan7c.mongodb.net/?retryWrites=true&w=majority"
);
const bcrypt = require("bcrypt");
const User = require("./RetailerSchema/User");
const Region = require("./RegionSchema/Region");
const Category = require("./CategorySchema/Category");
const Admin = require("./AdminSchema/AdminSchema");
const app = express();
const bodyparser = require("body-parser");
const Product = require("./ProductSchema/Product");
// const jsonparser=bodyparser.json();

app.use(express.json());
app.use(cors());

app.post("/order", async (req, res, next) => {
  let order = new Order(req.body);
  await order.save();
  console.log(order);
  res.send(order);
});
app.get("/order", async (req, res, next) => {
  Order.find()
    .then((result) => {
      res.status(200).json({
        Orderdata: result,
      });
    })
    .catch((err) => {
      res.status(500);
    });
});

app.delete("/order/:id", async (req, res) => {
  try {
    const deleteorder = await Order.findByIdAndDelete(req.params.id);
    if (!req.params.id) {
      return res.status(400).send();
    }
    res.send(deleteorder);
  } catch (e) {
    res.status(500).send(e);
  }
});

// admin end p,"oint
app.post("/Admin", async (req, res, next) => {
  const name = req.body.name;
  const password = req.body.password;
  const admin = await Admin.findOne({ name: name });
  if (!admin) {
    console.log("NAME NOT FOUND OR PASSWORD NOT MATCHED ");
    return;
  }
  const ismatch = await bcrypt.compare(password, admin.password);
  if (ismatch) {
    console.log("LOGGED IN SUCCESSFULLY ");

    res.send("Matched");
    // res.setHeader('Access-Control-Allow-Origin', '*');
    // res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    // res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    // next();
  } else {
    console.log("Name NOT FOUND OR PASSWORD NOT MATCHED ");
  }
});

//shortcut
// app.post("/Admin",async (req,resp)=>
// {

//    console.log(req.body);
//     let admin=new Admin(req.body);
//     let result=await admin.save();
//     resp.send(result);
// })

//SignuForm or Retailer EndPoint
app.post("/register", async (req, resp) => {
  console.log(req.body);
  let user = new User(req.body);
  let result = await user.save();
  resp.send(result);
});
//region get api end point
app.get("/region", async (req, res, next) => {
  Region.find()
    .then((result) => {
      res.status(200).json({
        regiondata: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});
app.put("/region/:id", (req, res, next) => {
  Region.updateOne(
    { _id: req.params.id },
    { $set: { region: req.body.region, capital: req.body.capital } }
  )
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

app.delete("/region/:id", async (req, res) => {
  try {
    const regiondelete = await Region.findByIdAndDelete(req.params.id);
    if (!req.params.id) {
      return res.status(400).send();
    }
    res.send(regiondelete);
  } catch (e) {
    res.status(500).send(e);
  }
});

//region endpoint
app.post("/region", async (req, resp, next) => {
  const region = req.body.region;
  const capital = req.body.capital;
  const refid = req.body.refid;

  console.log(req.body);
  const regioncreate = new Region({
    region: region,
    capital: capital,
    AdminId: refid,
  });
  regioncreate
    .save()
    .then((result) => {
      // console.log(result);
      console.log("Region created Successfully with referencing ");
      // res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(err);
    });
  //  resp.send(result);
});
//loginform EndPoint
app.post("/Login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const user = await User.findOne({ email: email });
  if (!user) {
    console.log("EMAIL NOT FOUND OR PASSWORD NOT MATCHED ");
    return;
  } else {
    console.log("Congratss Email FOUND");
  }
  bcrypt.compare(password, user.password).then((ismatch) => {
    if (ismatch) {
      console.log("LOGGED IN SUCCESSFULLY ");
      res.send("/register");
    } else {
      console.log("Email NOT FOUND OR PASSWORD NOT MATCHED ");
    }
  });
});

//category post api
app.post("/category", async (req, resp, next) => {
  const category_name = req.body.category_name;
  const refid = req.body.refid;
  console.log(req.body);
  const categorycreate = new Category({
    category_name: category_name,
    AdminId: refid,
  });
  categorycreate
    .save()
    .then((result) => {
      resp.send("craeatedd");
      console.log("Category created Successfully with referencing(Admin_Id) ");
    })
    .catch((err) => {
      console.log(err);
    });
  //  resp.send(result);
});
// category get api
app.get("/category", async (req, res, next) => {
  Category.find()
    .then((result) => {
      res.status(200).json({
        categorydata: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});
// http://localhost:5000/category/6300b7f53141eec64a5fbc68
app.put("/category/:id", (req, res, next) => {
  Category.updateOne(
    { _id: req.params.id },
    { $set: { category_name: req.body.category_name } }
  )
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

app.delete("/category/:id", async (req, res) => {
  try {
    const deletecategory = await Category.findByIdAndDelete(req.params.id);
    if (!req.params.id) {
      return res.status(400).send();
    }
    res.send(deletecategory);
  } catch (e) {
    res.status(500).send(e);
  }
});
//product crud API'S
app.post("/product", async (req, res) => {
  const name = req.body.name;
  const price = req.body.price;
  const brand_name = req.body.brand_name;
  const Admin_refid = req.body.Admin_refid;
  // const CategoryId=req.body.CategoryId;
  console.log(req.body);
  const productcreate = new Product({
    name: name,
    price: price,
    brand_name: brand_name,
    AdminId: Admin_refid,
    // CategoryId:CategoryId
  });
  productcreate
    .save()
    .then((result) => {
      // console.log(result);
      console.log(
        "Product created Successfully with referencing(Admin_Id & Category Id) "
      );
    })
    .catch((err) => {
      console.log(err);
    });
});
app.get("/product", async (req, res, next) => {
  Product.find()
    .populate("CategoryId", "category_name")
    .then((result) => {
      res.status(200).json({
        productdata: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

app.put("/product/:id", (req, res, next) => {
  Product.updateOne(
    { _id: req.params.id },
    {
      $set: {
        name: req.body.name,
        price: req.body.price,
        brand_name: req.body.brand_name,
      },
    }
  )
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

app.delete("/product/:id", async (req, res) => {
  try {
    const deleteproduct = await Product.findByIdAndDelete(req.params.id);
    if (!req.params.id) {
      return res.status(400).send();
    }
    res.send(deleteproduct);
  } catch (e) {
    res.status(500).send(e);
  }
});

app.listen(5000);

// const selectRef= useRef(null);
// ...
// <select name="myName" id="myId" ref={selectRef}>
//   <option valie="myValue">my text</option>
//   ...
// </select>
