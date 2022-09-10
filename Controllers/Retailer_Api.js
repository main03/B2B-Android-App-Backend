const User = require("../Models/Retailer");



//SignuForm or Retailer EndPoint
exports.CreateRetailer =( async (req, resp) => {
  console.log(req.body);
  let user = new User(req.body);
  let result = await user.save();
  resp.send(result);
});

//loginform EndPoint
exports.RetailerLogin =( async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const user = await User.findOne({ email: email });
  if (!user) {
    console.log("EMAIL NOT FOUND OR PASSWORD NOT MATCHED ");
    return;
  } else {
    console.log("Congratss Email FOUND");
  }
  bcrypt.compare(password, user.password).then((ismatch) => {
    if (ismatch) {
      console.log("LOGGED IN SUCCESSFULLY ");
      res.send("/register");
    } else {
      console.log("Email NOT FOUND OR PASSWORD NOT MATCHED ");
    }
  });
});
