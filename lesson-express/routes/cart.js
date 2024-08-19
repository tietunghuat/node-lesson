const express = require("express");

const router = express.Router();

const cartController = require("../controllers/cart");

const productController = require("../controllers/admin");

const path = require("path");

router.use("/cart-page", cartController.getCartPage);

router.use("/add-to-cart", productController.addProductsToCart);

module.exports = {
  cartRouter: router,
};
