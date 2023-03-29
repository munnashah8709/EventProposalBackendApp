const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const Vendor = mongoose.model("Vendor");

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "You must be logged in" });
  }
  const token = authorization.replace("Bearer ", "");
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const { _id } = payload;
    const [userData, vendorData] = await Promise.all([
      User.findById(_id),
      Vendor.findById(_id),
    ]);
    req.user = userData;
    req.vendor = vendorData;
    next();
  } catch (err) {
    return res.status(401).json({ error: "You must be logged in" });
  }
};