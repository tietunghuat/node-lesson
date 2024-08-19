//這邊做cart的邏輯

const fs = require("fs");
const path = require("path");

const p = path.join(__dirname, "../data", "cart.json");

const fetchAllCartData = (callback) => {
  fs.readFile(p, (err, content) => {
    if (err) {
      callback([]);
    } else {
      callback(JSON.parse(content));
    }
  });
};

module.exports = class Cart {
  //抓到之前的cart
  static addProduct(id, productPrice) {
    fs.readFile(p, (err, fileContent) => {
      let cart = {
        product: [],
        totalPrice: 0,
      };
      if (err) {
        console.log("Cart is something Error!");
      } else cart = JSON.parse(fileContent);

      const existingProductIndex = cart.product.findIndex((item) => {
        return item.id === id;
      });

      const existingProduct = cart.product[existingProductIndex];
      let updatedProduct;
      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty = updatedProduct.qty + 1;
        cart.product = [...cart.product];
        cart.product[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, qty: 1 };
        cart.product = [...cart.product, updatedProduct];
      }
      cart.totalPrice = cart.totalPrice + productPrice;
      fs.writeFile(p, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });
  }

  static fetchCartData(callback) {
    fetchAllCartData(callback);
  }

  static deleteItemFromCart(id, productPrice) {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        return;
      }
      const updatedCart = { ...JSON.parse(fileContent) };
      const product = updatedCart.products.find((prod) => prod.id === id);
      const productQty = product.qty;
      updatedCart.products = updatedCart.products.filter(
        (prod) => prod.id !== id
      );

      updated.totalPrice = updatedCart.totalPrice - productPrice * productQty;

      fs.writeFile(p, JSON.stringify(updatedCart), (err) => {
        if (err) console.log(err);
      });
    });
  }
};
