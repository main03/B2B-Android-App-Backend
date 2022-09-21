var express= require('express');
var router= express.Router();
const ProductController = require("../../Controllers/Product");





router.route('/').get(ProductController.getProduct)



module.exports = router;