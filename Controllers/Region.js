const Region = require("../Models/Region");

const AuthenticateAdmin = require("../Middleware/AdminAuth");

exports.GetallRegionList =
  (AuthenticateAdmin,
  async (req, res, next) => {
    Region.find()
      .populate("AdminId", "name")
      .then((result) => {
        res.status(200).json({
          regiondata: result,
        });
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  });
exports.UpdateRegion =
  (AuthenticateAdmin,
  async (req, res, next) => {
    Region.updateOne(
      { _id: req.params.id },
      { $set: { region: req.body.region, capital: req.body.capital } }
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

exports.DeleteRegion =
  (AuthenticateAdmin,
  async (req, res) => {
    try {
      const regiondelete = await Region.findByIdAndDelete(req.params.id);
      if (!req.params.id) {
        return res.status(400).send();
      }
      res.send(regiondelete);
    } catch (e) {
      res.status(500).send(e);
    }
  });

//region endpoint
exports.PostRegion =
  (AuthenticateAdmin,
  async (req, resp, next) => {
    const region = req.body.region;
    const capital = req.body.capital;
    const refid = req.body.refid;

    console.log(req.body);
    const regioncreate = new Region({
      region: region,
      capital: capital,
      AdminId: req.body.refid,
    });
    regioncreate
      .save()
      .then((result) => {
        // console.log(result);
        console.log("Region created Successfully with referencing ");
        // res.redirect("/admin/products");
      })
      .catch((err) => {
        console.log("Region validation faileddd");
        console.log(err);
      });
    //  resp.send(result);
  });
exports.getRegion = async (req, res, next) => {
  Region.find()
    .then((result) => {
      res.status(200).json({
        regiondata: result,
      });
    })
    .catch((err) => {
      res.status(500);
    });
};
