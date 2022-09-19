const Region = require("../Models/Region");



exports.GetallRegionList =
  (
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
  (
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
  (
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


exports.PostRegion =
  (
  async (req, resp, next) => {
    const region = req.body.region;
    const capital = req.body.capital;
    

    console.log(req.body);
    const regioncreate = new Region({
      region: region,
      capital: capital,
      AdminId: req.AdminId,
    });
    regioncreate
      .save()
      .then((result) => {
        console.log("Region created Successfully with referencing ");
       
      })
      .catch((err) => {
        console.log("Region validation faileddd");
        console.log(err);
      });
   
  });

