const http = require("http");

const express = require("express");

const bodyParser = require("body-parser");

const app = express();

const port = 3000;

const path = require("path");

app.set("view engine", "ejs");
// app.set("views", "views");

const errorPageController = require("./controllers/error");

app.use(bodyParser.urlencoded({ extended: false }));
app.use;

const { adminRouter } = require("./routes/admin");

const { shopRouter } = require("./routes/shop");

app.use("/admin", adminRouter);
app.use("/shop", shopRouter);

app.use(errorPageController.getErrorPages);

app.listen(port, () => {
  console.log("server listen on port 3000");
});
