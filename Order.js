const { default: mongoose } = require("mongoose");
const mongooose = require("mongoose");
const Schema = mongoose.Schema;
const orderschema = new mongoose.Schema(
  {
    // Order_Date: {
    //   type: Date,
    //   required: true,
    // },
    Order_Total: {
      type: String,
      required: true,
    },
    // Order_Status: {
    //   type: String,
    //   required: true,
    // },
    Order_Quantity: {
      type: Number,
      required: true,
    },
    ProductId: {
      type: Schema.Types.ObjectId,
      ref: "products",
      required: true,
    },
    UserId: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: { Order_Date: "created_at" } }
);
module.exports = mongooose.model("order", orderschema);
