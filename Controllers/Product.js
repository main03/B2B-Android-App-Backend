const Product = require("../Models/Product");


exports.CreateNewProduct =
  (
  async (req, res) => {
    const name = req.body.name;
    const price = req.body.price;
    const brand_name = req.body.brand_name;
    const product_quantity = req.body.product_quantity;
    const CategoryId = req.body.CategoryId;
    console.log(req.body);
    const productcreate = new Product({
      name: name,
      price: price,
      brand_name: brand_name,
      product_quantity: product_quantity,
      AdminId: req.AdminId,
      CategoryId: CategoryId,
    });
    if (req.file) {
      productcreate.ProductImage = req.file.path;
    }
    productcreate
      .save()
      .then((result) => {
       
        resp.status(200);
        console.log(
          "Product created Successfully with referencing(Admin_Id & Category Id) "
        );
      })
      .catch((err) => {
        console.log(err);
      });
  });

exports.GetAllProductList =
  (
  async (req, res, next) => {
    Product.find()
      .populate([
        { path: "CategoryId", select: ["category_name", "CategoryImage"] },
        { path: "AdminId", select: "name" },
      ])

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
exports.UpdateProduct =
  (
  (req, res, next) => {
    if(req.file)
    {
    Product.updateOne(
      { _id: req.params.id },
      {
        $set: {
          name: req.body.name,
          price: req.body.price,
          brand_name: req.body.brand_name,
          product_quantity: req.body.product_quantity,
          ProductImage :req.file.path,
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
    }
    else{
      Product.updateOne (
      
       { _id: req.params.id },
        {
          $set: {
            name: req.body.name,
            price: req.body.price,
            brand_name: req.body.brand_name,
            product_quantity: req.body.product_quantity,
         
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
    }
  
  });

exports.DeleteProduct =
  (
  async (req, res) => {
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
exports.getProduct = async (req, res, next) => {
  let filter = {};
  if (req.query.CategoryId) {
    filter = { CategoryId: req.query.CategoryId };
  }
  Product.find(filter)
    .populate("CategoryId")
    .then((result) => {
      res.status(200).json({
        productData: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};
