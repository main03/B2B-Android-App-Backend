var express= require('express');
var router= express.Router();
const AuthenticateAdmin = require("../Middleware/AdminAuth");
const RegionController = require("../Controllers/Region");
router.route('/').get(RegionController.GetallRegionList)
router.route('/').post(AuthenticateAdmin,RegionController.PostRegion)
router.route('/:id').put(RegionController.UpdateRegion)
router.route('/:id').delete(RegionController.DeleteRegion)

module.exports = router;