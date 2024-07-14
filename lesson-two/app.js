const http = require("http");
const fs = require("fs");
const { handler } = require("./routes");

//創建一個server的方法
const server = http.createServer(
  handler
  //   process.exit(); // 終止server
);
server.listen(3000, (err) => {
  if (err) {
    console.log(err, 122);
  } else console.log("Server is running on port 3000");
}); // localhost:3000
