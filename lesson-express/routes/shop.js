const express = require("express");

const router = express.Router();

router.use("/", (req, res, next) => {
  console.log("now in second middleware");
  next();
});

module.exports = {
  shopRouter: router,
};
