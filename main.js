const express = require('express');
const http = require('http');
const cors = require('cors');

const { api } = require('./api');
const {sensors } = require("./sensors")


let app = express()
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server, {
  cors: {
    origin: "*", 
    methods: ['GET', 'POST']
  }
});


setInterval(() => {
  io.emit("sensorData", sensors)
}, 1000);

app.use(cors())

app.use('/api', api);

app.listen(8000, () => console.log('app running'))