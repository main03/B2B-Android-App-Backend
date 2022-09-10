const UpcomingOffer = require("../Models/UpcomingOffers");
const AuthenticateAdmin = require("../Middleware/Auth-Admin");


exports.CreateUpcomingOffer =
  (AuthenticateAdmin,
  (req, resp, next) => {
    console.log("Yaha tk call ho ri h");
    // const description=req.body.description;
    const offercreate = new UpcomingOffer({
      description: req.body.description,
      AdminId: req.body.refid,
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
        resp.send("craeatedd");
        console.log("Offers created Successfully with referencing(Admin_Id) ");
      })
      .catch((err) => {
        // resp.status(400);
        console.log("error in api ");
        console.log(err);
      });
    //  resp.send(result);
  });
