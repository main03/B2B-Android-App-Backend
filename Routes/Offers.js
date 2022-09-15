var express= require('express');
var router= express.Router();
const AuthenticateAdmin = require("../Middleware/AdminAuth");
const UpcomingOffersController = require("../Controllers/UpcomingOffer");
const AuthenticateRetailer=require("../Middleware/UserAuth")
const upload=require("../Middleware/ImageUpload")
// router.use(AuthenticateAdmin)




router.route('/').get(UpcomingOffersController.getOffer)
router.route('/').post(AuthenticateAdmin,upload.single("OfferImage"),UpcomingOffersController.CreateUpcomingOffer)


module.exports = router;