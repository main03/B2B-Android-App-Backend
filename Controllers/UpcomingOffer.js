const UpcomingOffer = require("../Models/UpcomingOffers");


exports.CreateUpcomingOffer =
  (
  (req, resp, next) => {
   
   
    const offercreate = new UpcomingOffer({
      description: req.body.description,
      AdminId: req.AdminId,
      Expiry_Date: req.body.Expiry_Date,
      BuyQuantity: req.body.BuyQuantity,
      GetQuantity: req.body.GetQuantity,
      BuyItem: req.body.BuyItem,
      GetItem: req.body.GetItem,
    });
    if (req.file) {
      offercreate.OfferImage = req.file.path;
    }

    offercreate
      .save()
      .then((result) => {
        resp.status(200);
        console.log("Offers created Successfully with referencing(Admin_Id) ");
      })
      .catch((err) => {
     
        console.log("error in api ");
        console.log(err);
      });
   
  });
exports.getOffer = async (req, res, next) => {
  UpcomingOffer.find()
    .populate("BuyItem")
    .populate("GetItem")
    .then((result) => {
      res.status(200).json({
        offerCreate: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};
