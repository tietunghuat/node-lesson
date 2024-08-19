const fs = require("fs");
const path = require("path");

const Cart = require("./cart");

const p = path.join(__dirname, "../data", "products.json");

const fetchAllData = (callback) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      callback([]);
    } else {
      callback(JSON.parse(fileContent)); //這邊是callback的寫法
    }
  });
};

module.exports = class Product {
  constructor(id, t, price, description) {
    this.id = id;
    this.title = t;
    this.price = price;
    this.description = description;
  }

  save() {
    const addProductToJson = (products) => {
      if (this.id) {
        const existingProductIndex = products.findIndex((item) => {
          return item.id === this.id;
        });
        const updatedProducts = [...products];
        updatedProducts[existingProductIndex] = this;
        fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
          if (err) console.log(err);
        });
      } else {
        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), (err) => {
          if (err) console.log(err);
        });
      }
    };

    fetchAllData(addProductToJson);
  }

  static fetchAll(callback) {
    fetchAllData(callback);
  }

  static findProductById(id, callback) {
    const onFindProductById = (products) => {
      const product = products.find((p) => p.id === id);
      callback(product);
    };
    fetchAllData(onFindProductById);
  }

  static deleteProductById(id) {
    fetchAllData((products) => {
      const product = products.find((prod) => prod.id === id);
      const updatedProducts = products.filter((prod) => prod.id !== id);
      fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
        if (err) {
          Cart.deleteItemFromCart(id, product.price);
          console.log(err);
        }
      });
    });
  }
};
