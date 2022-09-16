const Category = require("../Models/Category");
const AdminMiddleware=require('../Middleware/AdminAuth');
exports.CreateNewCategory =
  (
  async (req, resp, next) => {
  console.log("sadsaassssssssssssssssssssssss");
  console.log(req.AdminId);
  const category_name= req.body.category_name;
  // const refid=req.body.refid;
    
    let categorycreate = new Category({
     category_name:category_name,
     AdminId: req.AdminId,

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

exports.GetallCategoryList =
  (
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
  
exports.UpdateCategory =
  (
    // updateOne 
  (req, res, next) => {
    Category.updateOne (
    
      
      { _id: req.params.id },
      { $set: { category_name: req.body.category_name,CategoryImage:req.file.CategoryImage} },
      
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
  (
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

