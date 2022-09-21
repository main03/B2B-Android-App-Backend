var express= require('express');
var router= express.Router();
const AuthenticateRetailer=require("../../Middleware/UserAuth")
// const AuthenticateAdmin = require("../Middleware/AdminAuth");
const OrdersController = require("../../Controllers/Order");

router.route('/').get(OrdersController.getOrder)
router.route('/').post(AuthenticateRetailer,OrdersController.postOrder)
router.route('/:id').put(AuthenticateRetailer,OrdersController.updateOrder)
module.exports = router;
