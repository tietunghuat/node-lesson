const express = require("express");

const router = express.Router();

const adminController = require("../controllers/admin");

const path = require("path");

router.use("/user", adminController.getUserForm);

router.post("/input", adminController.postPrintUserForm);

router.get("/book-product", adminController.getProducts);

router.use("/content", (req, res, next) => {
  res.sendFile(path.join(__dirname, "../", "views", "admin.html"));
});

router.get("/product", adminController.getAddProduct);

module.exports = {
  adminRouter: router,
};
