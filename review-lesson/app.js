const http = require("http");
const { handler } = require("./routes");

const server = http.createServer(handler);

server.listen(5001, (err) => {
  if (err) {
    console.log(err);
  } else console.log("Server port listen on 5001");
});
