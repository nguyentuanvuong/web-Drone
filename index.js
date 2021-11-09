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

var listSocket = [];
var count;

app.set("view engine","ejs");
app.set("views", "./views");
app.use(express.static('public'));

var indexRouter = require('./routes/index');
var adminRouter = require('./routes/admin');
var apiRouter = require('./routes/api');

app.use('/', indexRouter);
app.use('/admin', adminRouter);
app.use('/api', apiRouter);

sio.on('connection', (socket) => {
  count = sio.engine.clientsCount;
  listSocket.push(socket.id);
  console.log('Socket number online',count);
  sio.emit(socket.id,listSocket);

  socket.broadcast.emit('connect Socket', socket.id);
  socket.on('StreamID', msg=>{
    socket.broadcast.emit('AllCam',msg);
  }); 
  socket.on('disconnect', () => {
    count = sio.engine.clientsCount;
    console.log('Socket number online',count);
    listSocket = listSocket.filter((element)=>{
      return element !== socket.id;
    });
    sio.emit('disconnect Socket', socket.id);
  });
});

io.on('connection', (socket) => {

});

httpServer.listen(process.env.HTTP_PORT, () => {
  console.log('http listening on *:',process.env.HTTP_PORT);
});

httpsServer.listen(process.env.HTTPS_PORT,()=>{
  console.log('https listening on *:', process.env.HTTPS_PORT);

});
