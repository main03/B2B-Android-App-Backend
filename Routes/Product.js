var express= require('express');
var router= express.Router();
router.use("/uploads", express.static("uploads"));
const AuthenticateAdmin = require("../Middleware/AdminAuth");
const ProductController = require("../Controllers/Product");
const upload=require("../Middleware/ImageUpload")
router.use(AuthenticateAdmin)




router.route('/').get(AuthenticateAdmin,ProductController.GetAllProductList)
router.route('/').get(ProductController.getProduct)
router.route('/').post(AuthenticateAdmin,upload.single("ProductImage"),ProductController.CreateNewProduct)
router.route('/:id').put(AuthenticateAdmin,ProductController.UpdateProduct)
router.route('/:id').delete(AuthenticateAdmin,ProductController.DeleteProduct)


module.exports = router;