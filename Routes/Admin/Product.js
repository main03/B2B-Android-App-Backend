var express= require('express');
var router= express.Router();
router.use("/uploads", express.static("uploads"));
const AuthenticateAdmin = require("../../Middleware/AdminAuth");
const ProductController = require("../../Controllers/Product");
const upload=require("../../Middleware/ImageUpload")
router.route('/').get(ProductController.GetAllProductList)
router.route('/').post(AuthenticateAdmin,upload.single("ProductImage"),ProductController.CreateNewProduct)
router.route('/:id').put(AuthenticateAdmin,upload.single("ProductImage"),ProductController.UpdateProduct)
router.route('/:id').delete(ProductController.DeleteProduct)


module.exports = router;