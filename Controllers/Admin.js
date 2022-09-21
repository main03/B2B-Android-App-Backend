const bcrypt = require("bcrypt");
const Admin = require("../Models/Admin");
const jwt = require("jsonwebtoken");
exports.AdminLogin = (async (req, res, next) => {
  const name = req.body.name;
  const password = req.body.password;
  const admin = await Admin.findOne({ name: name });
  if (!admin) {
    console.log("NAME NOT FOUND OR PASSWORD NOT MATCHED ");
    res.send("not found");
    return;
  }
  let loadeduser;
  const ismatch = await bcrypt.compare(password, admin.password);
  if (ismatch) {
    loadeduser=admin;
    console.log("LOGGED IN SUCCESSFULLY ");
    console.log("JSON WEB-TOKEN OF ADMIN IS :");
    const token = await jwt.sign(
      { AdminId: loadeduser._id.toString() },
      process.env.ADMIN_SECRET_KEY,
      { expiresIn: process.env.JWT_EXPIRY_TIME }
       );
    console.log("Id of admin is :",loadeduser._id.toString() );
    console.log(token);
  

    res.send({ token: token ,
      AdminId: loadeduser._id.toString()});
   
  } else {
    console.log("Name NOT FOUND OR PASSWORD NOT MATCHED ");
    res.send("Not found");
  }
});
