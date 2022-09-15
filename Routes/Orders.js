var express= require('express');
var router= express.Router();
const AuthenticateAdmin = require("../Middleware/AdminAuth");
const OrdersController = require("../Controllers/Order");
const AuthenticateRetailer=require("../Middleware/UserAuth")
router.use(AuthenticateAdmin)




router.route('/').get(AuthenticateAdmin,OrdersController.GetAllOrderList)
router.route('/').get(AuthenticateRetailer,OrdersController.getOrder)
router.route('/:id').put(AuthenticateAdmin,OrdersController.UpdateOrders)
router.route('/:id').put(AuthenticateRetailer,OrdersController.updateOrder)
router.route('/').post(AuthenticateRetailer,OrdersController.postOrder)



module.exports = router;