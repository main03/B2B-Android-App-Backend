const User = require("../Models/Retailer");
const jwt = require("jsonwebtoken");


const key = "SAM";
var bcrypt = require("bcryptjs");

exports.getRetailer =
  (
  async (req, res, next) => {
    const loginid = req.userId;
    User.findOne({ _id: loginid })
      .populate("RegionId", ["region", "capital"])
      .then((result) => {
        res.status(200).json({
          userdata: result,
       
        });
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  });

exports.addRetailer = async (req, res) => {
  let loadedUser;
  let user = new User(req.body);
  await user.save();
  console.log(user);
  loadedUser = user;
  const token = jwt.sign(
    {
      Phone_no: loadedUser.Phone_no,
      userId: loadedUser._id.toString(),
    },
    key,
    { expiresIn: "24h" }
  );
  console.log(token);

  res.send({ token: token, userId: loadedUser._id.toString() });
  // res.send({token:token,name:name,password:password});
  res.send();
};
exports.retailerLogin = async (req, res) => {
  console.log("hi");
  const Phone_no = req.body.Phone_no;
  const password = req.body.password;
  let loadedUser;
  const user = await User.findOne({ Phone_no: Phone_no });
  if (!user) {
    console.log("Phone no NOT FOUND OR PASSWORD NOT MATCHED ");
    res.send("Not found");
    return;
  }
  loadedUser = user;
  const ismatch = await bcrypt.compare(password, user.password);
  if (ismatch) {
    console.log("LOGGED IN SUCCESSFULLY ");
    console.log("JSON WEB-TOKEN OF Retailer IS :");
    const token = jwt.sign(
      {
        Phone_no: loadedUser.Phone_no,
        userId: loadedUser._id.toString(),
      },
      key,
      { expiresIn: "24h" }
    );
    console.log(token);

    res.send({ token: token, userId: loadedUser._id.toString() });
   
  } else {
    console.log("Name NOT FOUND OR PASSWORD NOT MATCHED ");
    res.send("Not found");
  }
};
