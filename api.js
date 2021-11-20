const express = require('express');
let api = exports.api = express();
const { changeActuators, currentActuators } = require('./actuators');
const { currentTargets, changeTargets } = require('./controller')
const { sensors } = require('./sensors')

api.use(express.json())

api.get('/sensors', (req, res) => {
  res.json(sensors)
})

api.get('/manual', (req, res) => {
  res.json(currentActuators())
})

api.post('/manual', (req, res) => {
  changeActuators(req.body)
}) 

api.get('/targets', (req, res) => {
  res.json(currentTargets)
})

api.post('/targets', (req, res) => {
  changeTargets(req.body)
})