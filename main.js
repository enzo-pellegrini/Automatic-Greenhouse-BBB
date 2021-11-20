const express = require('express');
const http = require('http');
const cors = require('cors');

const { api } = require('./api');
const {sensors } = require("./sensors")


let app = express()
const server = http.Server(app);

const io = require('socket.io')(server, {
// const io = new Server(server, {
  cors: {
    origin: "*", 
    methods: ['GET', 'POST']
  }
});




app.use(cors())

app.use('/api', api);

app.listen(8000, () => {
  setInterval(() => {
    io.emit("sensorData", sensors)
  }, 1000);
  console.log('app running')
})