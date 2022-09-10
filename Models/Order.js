const { default: mongoose } = require("mongoose");
const mongooose = require("mongoose");
const Schema = mongoose.Schema;
const orderschema = new mongoose.Schema(
  {
    OrderTotal: {
      type: Number,
      required: true,
    },
    OrderStatus: {
      type: String,
      required: true,
    },
    Order_Quantity: {
      type: Number,
      required: true,
    },
    ProductId: {
      type: Array,
      default: undefined,
      ref: "products",
      required: true,
    },
    UserId: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    OfferId: {
      type: Schema.Types.ObjectId,
      ref: "UpcomingOffer",
    },
  },
  { timestamps: true }
);
module.exports = mongooose.model("order", orderschema);
