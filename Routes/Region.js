var express= require('express');
var router= express.Router();
const AuthenticateAdmin = require("../Middleware/AdminAuth");
const RegionController = require("../Controllers/Region");

// router.use(AuthenticateAdmin)




router.route('/').get(AuthenticateAdmin,RegionController.GetallRegionList)
router.route('/').get(RegionController.getRegion)
router.route('/').post(AuthenticateAdmin,RegionController.PostRegion)
router.route('/:id').put(AuthenticateAdmin,RegionController.UpdateRegion)
router.route('/:id').delete(AuthenticateAdmin,RegionController.DeleteRegion)

module.exports = router;