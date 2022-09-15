const Category = require("../Models/Category");
const AuthenticateAdmin = require("../Middleware/AdminAuth");

exports.CreateNewCategory =
  (AuthenticateAdmin,
  async (req, resp, next) => {
    // const category_name=req.body.category_name;
    // const refid=req.body.refid;
    console.log(req.body);
    const categorycreate = new Category({
      category_name: req.body.category_name,
      AdminId: req.body.refid,
    });
    if (req.file) {
      categorycreate.CategoryImage = req.file.path;
    }
    categorycreate
      .save()
      .then((result) => {
        resp.send("craeatedd");
        console.log(
          "Category created Successfully with referencing(Admin_Id) "
        );
      })
      .catch((err) => {
        console.log(err);
      });
    //  resp.send(result);
  });
// category get api
// .populate("name")
exports.GetallCategoryList =
  (AuthenticateAdmin,
  async (req, res, next) => {
    Category.find()
      .populate("AdminId", "name")
      .then((result) => {
        res.status(200).json({
          categorydata: result,
          // CategoryImage:req.params.path
        });
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  });
// http://localhost:5000/category/6300b7f53141eec64a5fbc68
exports.UpdateCategory =
  (AuthenticateAdmin,
  (req, res, next) => {
    Category.updateOne(
      { _id: req.params.id },
      { $set: { category_name: req.body.category_name } }
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

exports.DeleteCategory =
  (AuthenticateAdmin,
  async (req, res) => {
    try {
      const deletecategory = await Category.findByIdAndDelete(req.params.id);
      if (!req.params.id) {
        return res.status(400).send();
      }
      res.send(deletecategory);
    } catch (e) {
      res.status(500).send(e);
    }
  });
exports.getCategory = async (req, res, next) => {
  Category.find()
    .then((result) => {
      res.status(200).json({
        categoryData: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};
