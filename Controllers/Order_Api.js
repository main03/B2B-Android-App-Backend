const Order = require("../Models/Order");
const AuthenticateAdmin = require("../Middleware/Auth-Admin");
const authenticateRetailer = require("../Middleware/UserAuth");
// .populate("ProductId.Object")
// yeh kam kr rha h
// .populate("UserId", "FirstName")
exports.GetAllOrderList =
  (AuthenticateAdmin,
  async (req, res, next) => {
    // ,{path:"AdminId",select:"name"}
    // ,{path:"ProductId.Object", select:["ProductImage"]}
    Order.find()
      .populate([{ path: "UserId", select: ["FirstName", "LastName"] }])

      .then((result) => {
        res.status(200).json({
          Orderdata: result,
        });
        // console.log("order posted");
      })
      .catch((err) => {
        res.status(500);
      });
  });

exports.UpdateOrders =
  (AuthenticateAdmin,
  (req, res, next) => {
    Order.updateOne(
      { _id: req.params.id },
      {
        $set: {
          OrderTotal: req.body.OrderTotal,
          OrderStatus: req.body.OrderStatus,
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
exports.postOrder =
  (authenticateRetailer,
  async (req, res, next) => {
    const OrderTotal = req.body.OrderTotal;
    const ProductId = req.body.ProductId;
    const OrderStatus = req.body.OrderStatus;
    const Order_Quantity = req.body.Order_Quantity;
    const OfferId = req.body.OfferId;
    let order = new Order({
      OrderTotal: OrderTotal,
      ProductId: ProductId,
      OrderStatus: OrderStatus,
      Order_Quantity: Order_Quantity,
      UserId: req.userId,
      OfferId: OfferId,
    });
    await order.save();
    console.log(order);
    console.log("order posted");
    res.send(order);
  });
exports.getOrder =
  (authenticateRetailer,
  async (req, res, next) => {
    const loginid = req.userId;
    Order.find({ UserId: loginid })
      .populate("UserId")
      .populate("ProductId.Object")
      .then((result) => {
        res.status(200).json({
          orderData: result,
        });
      })
      .catch((err) => {
        res.status(500);
      });
  });

exports.updateOrder =
  (authenticateRetailer,
  (req, res, next) => {
    Order.updateOne(
      { _id: req.params.id },
      { $set: { OrderStatus: req.body.OrderStatus } }
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
