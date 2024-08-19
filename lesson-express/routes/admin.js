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

router.post("/add-product", adminController.addProducts);

//page --> /admin/product => GET
router.get("/product", adminController.getAddProductPage);
//page --> /admin/all-products => GET
router.get("/all-products", adminController.getAllProductsPage);
//page --> /admin/product/:productId => GET
router.get("/product-detail/:productId", adminController.productDetailPage);
//page --> /admin/product/add-to-cart/:productId
router.post("/add-to-cart/:productId", adminController.addProductsToCart);
//page --> /admin/edit-product/:product => GET
router.get("/edit-product/:productId", adminController.getEditProduct);
//page --> /admin/edit-product  => POST
router.post("/edit-product", adminController.postEditProduct);
// --> /admin/delete-product => POSt
router.post("/delete-product", adminController.postDeleteProduct);

module.exports = {
  adminRouter: router,
};
