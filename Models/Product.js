const mongooose = require("mongoose");
const Schema = mongooose.Schema;
const productschema = new mongooose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    brand_name: {
      type: String,
      required: true,
    },
    product_quantity: {
      type: Number,
      required: true,
    },
    AdminId: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
    CategoryId: {
      type: Schema.Types.ObjectId,
      ref: "categories",
      required: true,
    },
    ProductImage: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongooose.model("products", productschema);


