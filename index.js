let express = require("express");
let app = express();
let server = require("http").createServer(app);
let io = require("socket.io").listen(server);

server.listen(3000);

app.get("/", function(request, respons) {
  respons.sendFile(__dirname + "/index.html");
});

users = [];
connections = [];

io.sockets.on("connection", function(socket) {
  console.log("connection successful");

  connections.push(socket);

  socket.on("disconnect", function(data) {
    connections.splice(connections.indexOf(socket), 1);
    console.log("connection aborted");
  });

  socket.on("send message", function(data) {
    io.sockets.emit("add message", {
      msg: data.message,
      name: data.name,
      className: data.className
    });
  });
});
