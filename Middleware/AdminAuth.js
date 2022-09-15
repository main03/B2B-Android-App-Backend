const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    // console.log("You are not authenticated");
    const error = new Error("Not authenticatedd.");
    error.statusCode = 401;
    throw error;
  }
  const token = authHeader.split(" ")[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, "Helloiamadmin");

    // decodedToken = jwt.verify(token, 'Helloiamadmin');
    console.log("Admin matched Successfully");
    console.log(decodedToken);
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
  // req.userId = decodedToken.userId;
  // req.userId = decodedToken.userId;
  // console.log('hell0 auth authenticate : ' + decodedToken.userId);
  next();
};
