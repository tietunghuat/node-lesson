const http = require("http");
const fs = require("fs");
//創建一個server的方法
const server = http.createServer(function (req, res) {
  console.log(req.headers, req.url, req.method);
  //   process.exit(); // 終止server
  const url = req.url;
  const method = req.method;
  if (url === "/test") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>My Testing page</title></head>");
    res.write(
      "<body><form action='/message' method='POST'><input type='text' name='message'/><button type='submit'>submit</button></form></body>"
    );
    res.write("</html>");
    return res.end();
  }

  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });
    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      fs.writeFileSync("message.txt", message + "from server form post");
      res.statusCode = 302;
      res.setHeader("Location", "/test");
      return res.end();
    });
  }

  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>My first page</title></head>");
  res.write("<body><h1>Hello from my node.js server!</h1></body>");
  res.write("</html>");
  res.end();
});

server.listen(3000); // localhost:3000
