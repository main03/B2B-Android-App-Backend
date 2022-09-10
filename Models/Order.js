const { default: mongoose } = require("mongoose");
const mongooose = require("mongoose");
const Schema = mongoose.Schema;
const orderschema = new mongoose.Schema(
  {
    OrderTotal: {
      type: String,
      required: true,
    },
    OrderStatus: {
      type: String,
      required: true,
    },
   
    ProductId: {
      type: Array,
      default: undefined,
      // default:Schema.Types.ObjectId,
      ref: "products",
      required: true,
    },
    UserId: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongooose.model("order", orderschema);