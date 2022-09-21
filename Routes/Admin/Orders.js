var express= require('express');
var router= express.Router();
const OrdersController = require("../../Controllers/Order");

router.route('/').get(OrdersController.GetAllOrderList)
router.route('/:id').put(OrdersController.UpdateOrders)
module.exports = router;
