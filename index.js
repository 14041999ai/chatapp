const express = require('express');
const http = require('http');
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io =  new Server(server);
app.get('/', function(req, res){
    res.sendFile(__dirname+"/index.html")
});

io.on('connection', function(socket){
    console.log("a user connected.");
    socket.broadcast.emit("user_connect", "New user connected")
    socket.on('disconnect', function(){
        console.log("user disconnected");
        socket.broadcast.emit("user_disconnect", "User disconnected")
    })
})

io.on('connection', function(socket) {
    socket.on('chat message', (msg) => {
      console.log('message: ' + msg);
    });
  });

  io.on('connection', function(socket){
    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
    })
  })

server.listen(3000, function(){
    console.log("Server listening at port 3000");
})