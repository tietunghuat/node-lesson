const fs = require("fs");
const path = require("path");

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
  constructor(t) {
    this.title = t;
  }

  save() {
    fetchAllData((products) => {
      products.push(this);
      console.log(products, 300);
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log(err, 311);
      });
    });
  }

  static fetchAll(callback) {
    fetchAllData(callback);
  }
};
