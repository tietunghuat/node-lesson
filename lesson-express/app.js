const http = require("http");

const express = require("express");

const app = express();

const server = http.createServer(app);

app.use((req, res, next) => {
  console.log("now in middleware");
  next();
});

app.use((req, res, next) => {
  console.log("now in second middleware");
});

server.listen(5003, (err) => {
  if (err) {
    console.log(err);
  } else "server listen on port 5003";
});
