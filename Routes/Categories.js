var express=require('express');
var router=express.Router();
const AuthenticateAdmin = require("../Middleware/AdminAuth");
const CategoryController = require("../Controllers/Category");
const upload=require("../Middleware/ImageUpload")




router.route('/').get(AuthenticateAdmin,CategoryController.GetallCategoryList)
router.route('/').get(CategoryController.getCategory)
router.route('/').post(AuthenticateAdmin,upload.single("CategoryImage"),CategoryController.CreateNewCategory)
router.route('/:id').put(AuthenticateAdmin,CategoryController.UpdateCategory)
router.route('/:id').delete(AuthenticateAdmin,CategoryController.DeleteCategory)

module.exports = router;