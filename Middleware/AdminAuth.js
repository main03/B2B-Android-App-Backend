const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
   
    const error = new Error("Not authenticatedd.");
    error.statusCode = 401;
    throw error;
  }
  const token = authHeader.split(" ")[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token,"Helloiamadmin");
    console.log("Admin matched Successfully");
    console.log(decodedToken);
  } catch (err) {
    err.statusCode = 500;
    console.log("JWT EXPIREDDD...........");
    throw err;
  }
  if (!decodedToken) {
    const error = new Error("Not authenticated.");
    error.statusCode = 401;
    throw error;
  }
  req.AdminId = decodedToken.AdminId;
  console.log(req.AdminId);
  
  
  next();
};
