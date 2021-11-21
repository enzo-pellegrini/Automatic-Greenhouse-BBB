const express = require('express');
const http = require('http');
const cors = require('cors');

const { api } = require('./api');
const { readSensors } = require("./sensors")
const { tickController } = require('./controller')

const { currentActuators } = require('./actuators')


let app = express()
const server = http.Server(app);

const io = require('socket.io')(server, {
  cors: {
    origin: "*", 
    methods: ['GET', 'POST']
  }
});

app.use(cors())

app.use('/api', api);
app.use('/', express.static('public'));

server.listen(8700, () => {
  setInterval(() => {
    readSensors().then(data => io.emit("sensorData", data));
  }, 1000);
  console.log('app running');
  
  setInterval(() => { if (!currentActuators().enabled) { tickController() } }, 5000);
})
