const express = require('express');
const app = express();
const http = require('http');
const ngrok = require('ngrok');
const cors = require("cors");
const mosca = require('mosca');
const settings = {
    port : 1883
    }

// const mqttServer = new mosca.Server(settings);

require('dotenv').config();

const httpServer = http.createServer(app);

// const { Server } = require("socket.io");
// const io = new Server(httpServer);

const io = require("socket.io")(httpServer, {
    cors: {
      methods: ["GET", "POST"]
    }
  });

var listSocket = [];
var trainStartus = false;

app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static('public'));
app.use(cors());  
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const indexRouter = require('./routes/index');
const adminRouter = require('./routes/admin');
const apiRouter = require('./routes/api');



app.use('/', indexRouter);
app.use('/admin', adminRouter);
app.use('/api', apiRouter);

app.use("/", require("./routes/mainRoutes"));
app.use("/", require("./routes/fileRoutes"));


io.on('connection', (socket) => {
    count = io.engine.clientsCount;
    listSocket.push(socket.id);
    // console.log('Socket number online', count);
    io.emit(socket.id, listSocket);
    socket.broadcast.emit('connect Socket', socket.id);

    socket.on('StreamID', msg => {
        socket.broadcast.emit('AllCam', msg);
    });

    socket.on('trainStartus',(msg)=>{
        socket.broadcast.emit('dataset','');
        io.emit('trainStartus',trainStartus);
    });
    socket.on('dataset',(msg)=>{
        socket.broadcast.emit('dataset',msg);
    });
    socket.on('training',(msg)=>{
        if(!trainStartus) {
            socket.broadcast.emit('training',msg);
        }
    });
    socket.on('TrainingDone',(msg)=>{
        trainStartus = false;
        socket.broadcast.emit('trainStartus',trainStartus);
    });
    socket.on('TrainingStart',(msg)=>{
        trainStartus = true;
        socket.broadcast.emit('trainStartus',trainStartus);
    });
    socket.on('CreateTrainingFile',(msg)=>{
        socket.broadcast.emit('CreateTrainingFile',msg);
    });

    console.log('connect', socket.id);
    socket.on('disconnect', () => {
        console.log('disconnect', socket.id);
        count = io.engine.clientsCount;
        // console.log('Socket number online', count);
        listSocket = listSocket.filter((element) => {
            return element !== socket.id;
        });
        io.emit('disconnect Socket', socket.id);
    });
});

httpServer.listen(process.env.HTTP_PORT, () => {
    console.log('http listening on *:', process.env.HTTP_PORT);
});

(async function() {
    const url = await ngrok.connect({
        addr: process.env.HTTP_PORT,
        authtoken: process.env.NGROK_TOKEN
    });
    console.log(url);
  })();