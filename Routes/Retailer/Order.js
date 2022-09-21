var express= require('express');
var router= express.Router();
const AuthenticateRetailer=require("../../Middleware/UserAuth")

const OrdersController = require("../../Controllers/Order");

router.route('/').get(AuthenticateRetailer,OrdersController.getOrder)
router.route('/').post(AuthenticateRetailer,OrdersController.postOrder)
router.route('/:id').put(AuthenticateRetailer,OrdersController.updateOrder)
module.exports = router;
