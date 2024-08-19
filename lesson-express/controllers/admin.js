const Product = require("../models/bookProducts");

const Cart = require("../models/cart");

exports.getUserForm = (req, res, next) => {
  // res.send("<h1>User here</h1>");
  res.send(
    "<form action='/admin/input' method='post'><input type='text' name='book'/><button type='submit'>submit</button></form>"
  );
};

exports.postPrintUserForm = (req, res, next) => {
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

exports.getAddProductPage = (req, res, next) => {
  res.render("../views/admin/add-product", {
    pageTitle: "Add Product",
  });
};

exports.getAllProductsPage = (req, res, next) => {
  Product.fetchAll((prod) => {
    res.render("../views/admin/get-products", {
      products: prod,
    });
  });
};

exports.addProducts = (req, res, next) => {
  const title = req.body.title;
  const price = req.body.price;
  const desc = req.body.description;
  const product = new Product(null, title, parseInt(price), desc);
  product.save();
  res.redirect("/admin/all-products");
};

exports.productDetailPage = (req, res, next) => {
  console.log(req.params.productId, 4999);
  Product.findProductById(req.params.productId, (product) => {
    res.render("../views/admin/product-detail", {
      prod: product,
    });
  });
};

exports.addProductsToCart = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findProductById(prodId, (product) => {
    Cart.addProduct(prodId, product.price);
  });
  res.redirect("/cart/cart-page");
};

//得到editProduct 商品的頁面
exports.getEditProduct = (req, res, next) => {
  const prodId = req.params.productId;

  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  Product.findProductById(prodId, (product) => {
    res.render("../views/admin/edit-add-product", {
      editing: editMode,
      product,
    });
  });
};

//確切去 edit 商品資訊
exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedDesc = req.body.description;
  const updatedProduct = new Product(
    prodId,
    updatedTitle,
    parseInt(updatedPrice),
    updatedDesc
  );
  updatedProduct.save();

  res.redirect("/admin/all-products");
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  // Product.deleteProductById(prodId);
  res.redirect("/admin/all-products");
};
