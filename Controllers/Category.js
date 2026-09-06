const Category = require("../Models/Category");

exports.CreateNewCategory =
  (
  async (req, resp, next) => {
  
  console.log(req.AdminId);
  const category_name= req.body.category_name;

    
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
        resp.status(200);
        console.log(
          "Category created Successfully with referencing(Admin_Id) "
        );
      })
      .catch((err) => {
        console.log(err);
      });
  
  });

exports.GetallCategoryList =
  (
  async (req, res, next) => {
    Category.find()
      .populate("AdminId", "name")
      .then((result) => {
        res.status(200).json({
          categorydata: result,
        
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
    
  (req, res, next) => {
    if (req.file) {
      Category.updateOne (
      
     
        { _id: req.params.id },
        { $set: { category_name: req.body.category_name,CategoryImage :req.file.path } },
        
         )
         .then((result) => {
          res.status(200).json(result);
        
        })
        .catch((err) => {
          res.status(500).json({
            error: err,
          });
        });
    }
    else{
      Category.updateOne (
      
     
        { _id: req.params.id },
        { $set: { category_name: req.body.category_name } },
        
         )
         .then((result) => {
          res.status(200).json(result);
        
        })
        .catch((err) => {
          res.status(500).json({
            error: err,
          });
        });

    }
  
   
  
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

