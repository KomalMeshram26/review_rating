const jwt = require("jsonwebtoken");

const userAuthetication = async (req, res, next) => {
  const authHeader = req.headers.Authorization || req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    let token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        res.status(401).json({
          success: false,
          message: "user is not authorized",
        });
      } else {
        req.user = decoded.userData;
        console.log(decoded.userData);
        next();
      }
    });
  } else {
    res.status(409).json({
      success: false,
      message: "token not found",
    });
  }
};

const userAuthorization = (req, res, next) => {
  if (req.user && req.user.role === "user") {
    next();
  } else {
    res.status(403).json({
      success: true,
      message: "user is  Authorized",
    });
  }
};
module.exports = {
  userAuthetication,
  userAuthorization,
};
