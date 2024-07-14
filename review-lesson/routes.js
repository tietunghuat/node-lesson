const http = require("http");

function requestHandler(req, res) {
  const url = req.url;
  const method = req.method;

  if (url === "/main") {
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
      const parseBody = Buffer.concat(body).toString();
      const message = parseBody.split("=")[1];
      return res.end();
    });
  }

  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>My Testing page</title></head>");
  res.write("<label>INPUT Column</label>");
  res.write(
    "<body><form action='/message' method='POST'><input type='text' name='message'/><button type='submit'>submit</button></form></body>"
  );
  res.write("</html>");
  res.end();
}

module.exports = { handler: requestHandler };
