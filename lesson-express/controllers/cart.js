const Cart = require("../models/cart");

const Product = require("../models/bookProducts");

exports.getCartPage = (req, res, next) => {
  Cart.fetchCartData((item) => {
    console.log(item, 77);
    // 不需要在迴圈內調用 res.render
    res.render("../views/cart/cart", {
      products: item.product, // 傳遞整個產品陣列
      totalPrice: item.totalPrice,
    });
  });
};
