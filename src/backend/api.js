/*
 * Rest api, one of the two interfaces between the frontend and backend
 * By Vincenzo Pellegrini
 * 313291
 */

const express = require('express');
let api = exports.api = express();
const { getManualSettings, changeManualSettings } = require('./manual')
const { currentTargets, changeTargets } = require('./controller')
const { readSensors } = require('./sensors')


api.use(express.json())

api.get('/sensors', (req, res) => {
  readSensors().then(data => res.json(data));
})

api.get('/manual', (req, res) => {
  res.json(getManualSettings())
})

api.post('/manual', (req, res) => {
  changeManualSettings(req.body);
  res.status(200).send();
}) 

api.get('/targets', (req, res) => {
  res.json(currentTargets)
})

api.post('/targets', (req, res) => {
  changeTargets(req.body)
  res.status(200).send();
})
