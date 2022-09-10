const jwt = require("jsonwebtoken");
const key = "SAM";
module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    const error = new Error("Not Authenticated");
    error.statusCode = 401;
    throw error;
  }
  let token = authHeader.split(" ")[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, key);

    console.log("Retailer matched Successfully");
    console.log(decodedToken);

    // return res.redirect("/");
  } catch (err) {
    err.statusCode = 500;
    console.log("JWT EXPIREDDD...........");
    // global["myvar"] = 'http://localhost:3000/adminlogin';
    throw err;
  }
  if (!decodedToken) {
    const error = new Error("Not authenticated.");
    error.statusCode = 401;
    throw error;
  }
  req.userId = decodedToken.userId;
  // console.log('hell0 auth authenticate : ' + decodedToken.userId);
  next();
};
