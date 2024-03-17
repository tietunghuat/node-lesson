const http = require("http");
const fs = require("fs");
const routes = require("./routes");

//創建一個server的方法
const server = http.createServer(
  routes.handler
  //   process.exit(); // 終止server
);

server.listen(3000); // localhost:3000
