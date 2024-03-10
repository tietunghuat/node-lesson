console.log("Hello node.js");

const fs = require("fs");

fs.writeFileSync("testing.text", "Hello from node.js"); // 相當於在terminal echo "Hello from node.js" > testing.text

const promise = new Promise((resolve, reject) => {
  resolve("Hello from promise");
}).then((data) => {
  console.log(data, 13);
});
