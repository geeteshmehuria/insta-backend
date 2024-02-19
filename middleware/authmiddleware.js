//authentication middleware 

const jwt = require("jsonwebtoken");
const auth = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (token) {
    const decoded = jwt.verify(token, "masai");
    if (decoded) {
      // console.log(decoded)
      req.body.userId = decoded.userId;
    console.log("<<<<",req.body.userId)
      next();
    } else {
      res.send({ msg: "you are not authorized " });
    }
  } else {
    res.send({ msg: "you are not authorized " });
  }
};
module.exports = { auth };
