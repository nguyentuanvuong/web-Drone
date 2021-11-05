const express = require('express');
const app = express();
const https = require('https');
const http = require('http');
const fs = require('fs');

require('dotenv').config();

const options = {
  key:  fs.readFileSync('config/ssl/key.pem'),
  cert:  fs.readFileSync('config/ssl/cert.pem')
};

const httpServer = http.createServer(app);
const httpsServer = https.createServer(options,app);

const { Server } = require("socket.io");
const sio = new Server(httpsServer);
const io = new Server(httpServer);

var count = 0
var listSocket = []

app.set("view engine","ejs");
app.set("views", "./views");
app.use(express.static('public'));

app.use(express.static('node_modules'));

var indexRouter = require('./routes/index');
var adminRouter = require('./routes/admin');
var apiRouter = require('./routes/api');

app.use('/', indexRouter);
app.use('/admin', adminRouter);
app.use('/api', apiRouter);

sio.on('connection', (socket) => {
  console.log(socket.id,' connect');
  listSocket[count] = socket.id;
  // count++;
  socket.emit('listSocket', listSocket);

  socket.on('StreamID', msg=>{
    sio.emit(msg.socketID,msg);
    io.emit('StreamColab',msg);
  }); 
  socket.on('disconnect', () => {
    console.log(socket.id,' disconnected');
  });
});

io.on('connection', (socket) => {
  console.log(socket.id,' connect');

  socket.on('StreamID', msg=>{
    // sio.emit(msg.socketID,msg);
    io.emit('StreamColab',msg);
  });

  socket.on('ResultsColab',msg=>{
    msg = JSON.parse(msg);
    sio.emit(`ResultsID${msg.socketID}`,msg);
    io.emit(`ResultsID${msg.socketID}`,msg);
  });

  socket.on('disconnect', () => {
    console.log(socket.id,' disconnected');
  });
});

httpServer.listen(process.env.HTTP_PORT, () => {
  console.log('http listening on *:',process.env.HTTP_PORT);
});

httpsServer.listen(process.env.HTTPS_PORT,()=>{
  console.log('https listening on *:', process.env.HTTPS_PORT);

});
