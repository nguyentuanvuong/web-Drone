const express = require('express');
const app = express();
const https = require('https');
const http = require('http');
const fs = require('fs');

const options = {
  key:  fs.readFileSync('ssl/key.pem'),
  cert:  fs.readFileSync('ssl/cert.pem')
};

const serverHTTP = http.createServer(app);
const serverHTTPS = https.createServer(options,app);

const { Server } = require("socket.io");
const io = new Server(serverHTTPS);

const portHTTP = 3000;
const portHTTPS = 3443;

app.set("view engine","ejs");
app.set("views", "./views");
app.use(express.static('public'));

var indexRouter = require('./routes/index');
var adminRouter = require('./routes/admin');
var apiRouter = require('./routes/api');
app.use('/', indexRouter);
app.use('/admin', adminRouter);
app.use('/api', apiRouter);



io.on('connection', (socket) => {
  console.log(socket.id,' connect');
  socket.on('message', msg => {
    io.emit("message", msg);
    // socket.broadcast.emit("message", msg);
    });
    socket.on("stream", msg => {
      io.emit("stream", msg);
    });
    socket.on('log',msg=>{
      io.emit('log',msg);
    });
    socket.on("stream cam", img => {
      socket.broadcast.emit("stream cam", img);
    });
    socket.on('StreamID', msg=>{
      io.emit(msg.socketID,msg);
    }); 
    socket.on('disconnect', () => {
      console.log(socket.id,' disconnected');
    });
  });

  serverHTTP.listen(portHTTP, () => {
  console.log('http listening on *:',portHTTP);
});

serverHTTPS.listen(portHTTPS,()=>{
  console.log('https listening on *:', portHTTPS);
});
