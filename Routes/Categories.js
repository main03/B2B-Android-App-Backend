var express=require('express');
var router=express.Router();
const AuthenticateAdmin = require("../Middleware/AdminAuth");
const CategoryController = require("../Controllers/Category");
const upload=require("../Middleware/ImageUpload")



router.route('/').get(CategoryController.GetallCategoryList)
router.route('/').post(AuthenticateAdmin,upload.single("CategoryImage"),CategoryController.CreateNewCategory)
router.route('/:id').put(AuthenticateAdmin,upload.single("CategoryImage"),CategoryController.UpdateCategory)
router.route('/:id').delete(CategoryController.DeleteCategory)

module.exports = router;