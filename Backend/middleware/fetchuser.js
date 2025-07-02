const jwt = require("jsonwebtoken");
const Secrate_key = "12@qiqi";

const fetchuser = (req, res,next) => {
  const token = req.header("auth-token");
  if (!token) {
    res
      .status(401)
      .send({ error: "please authenticate user using valid token" });
  }
  try {
    const data = jwt.verify(token, Secrate_key);
    req.user = data.user;
  } catch (error) {
    res
      .status(401)
      .send({ error: "please authenticate user using valid token" });
  }
  next();
};

module.exports = fetchuser;