const mongooose = require("mongoose");
const Schema = mongooose.Schema;

const categoryschema = new mongooose.Schema(
  {
    category_name: {
      type: String,
      unique: true,
      required: true,
    },

    AdminId: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
    CategoryImage: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongooose.model("categories", categoryschema);

