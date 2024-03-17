const fs = require("fs");
const { request } = require("http");

function requestHandler(req, res) {
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
      fs.writeFile("message.txt", message + "from server form post", (err) => {
        res.statusCode = 302;
        res.setHeader("Location", "/test");
        return res.end();
      });
    });
  }

  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>My first page</title></head>");
  res.write("<body><h1>Hello from my node.js server!</h1></body>");
  res.write("</html>");
  res.end();
}

// 多個
module.exports = { handler: requestHandler };

// 單個
// module.exports = requestHandler;
