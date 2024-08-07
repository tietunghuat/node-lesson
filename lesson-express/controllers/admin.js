const Product = require("../models/bookProducts");

exports.getUserForm = (req, res, next) => {
  // res.send("<h1>User here</h1>");
  res.send(
    "<form action='/admin/input' method='post'><input type='text' name='book'/><button type='submit'>submit</button></form>"
  );
};

const product = [];

exports.postPrintUserForm = (req, res, next) => {
  // product.push({ book: req.body.book });
  const product = new Product(req.body.book);
  product.save();
  res.redirect("/admin/content");
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll((item) => {
    //這邊是callback的寫法
    console.log(item, 2111);
  });
};

exports.getAddProduct = (req, res, next) => {
  res.render("../views/add-product", {
    pageTitle: "Add Product",
  });
};
