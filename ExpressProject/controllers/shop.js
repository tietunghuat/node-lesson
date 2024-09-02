const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "All Products",
      path: "/products",
    });
  });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId, (product) => {
    res.render("shop/product-detail", {
      product: product,
      pageTitle: product.title,
      path: "/products",
    });
  });
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/index", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
    });
  });
};

exports.getCart = async (req, res, next) => {
  Cart.getCartProducts((cart) => {
    Product.fetchAll((prod) => {
      const filterItemInCart = [];
      for (let cartObj of cart.products) {
        const sameItemId = prod.find((item) => item.id === cartObj.id);
        filterItemInCart.push(sameItemId);
      }
      cart.products.forEach((item) => {
        console.log(item.id, 44);
        filterItemInCart.forEach((filterItem) => {
          if (filterItem.id === item.id) {
            filterItem.qty = item.qty;
          }
        });
      });
      console.log(filterItemInCart, 55);

      res.render("shop/cart", {
        pageTitle: "Cart Item",
        path: "/shop/cart",
        prods: filterItemInCart,
        totalPrice: cart.totalPrice,
      });
    });
  });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, (product) => {
    Cart.addProduct(prodId, product.price);
  });
  res.redirect("/cart");
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    path: "/orders",
    pageTitle: "Your Orders",
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};

//刪除購物車內的商品
exports.deleteCartItem = (req, res, next) => {
  const prodId = req.body.productId;
  Product.fetchAll((item) => {
    const product = item.find((prod) => prod.id === prodId);
    Cart.deleteProduct(prodId, product.price);
  });

  res.redirect("/cart");
};
