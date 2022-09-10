const Order = require("../Models/Order");
const AuthenticateAdmin = require("../Middleware/Auth-Admin");
// .populate("ProductId.Object")
// yeh kam kr rha h
// .populate("UserId", "FirstName")
exports.GetAllOrderList =
  (AuthenticateAdmin,
  async (req, res, next) => {
    // ,{path:"AdminId",select:"name"}
    // ,{path:"ProductId.Object", select:["ProductImage"]}
    Order.find()
    .populate([{path:"UserId", select:["FirstName","LastName"]}])
   
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
