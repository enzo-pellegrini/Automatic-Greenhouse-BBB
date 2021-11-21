/*
 * Controller, periodically sets the actuators based on the sensors
 * By Francesco Palma
 * 313301
 */

let targets = {
  temperature: 20,
  light: 23,
  humidity: 30,
  //enabled: false
}

const { readLight, readTempHum } = require('./sensors.js');
const { lightMod , changeActuators } = require('./actuators.js');

const TOLERANCE = 0.1;

let handleChange = (newState) => {
  for (let k in targets) {
    if (newState[k] != targets[k]) {
      console.log(`${k} changed to ${newState[k]} in the controller targets`);
      targets[k] = newState[k]
    }
  }
  targets = newState;
}

let checkValueIn = (realValue, desiredValue) => {
  let diff = Math.abs(realValue - desiredValue);
  let limit = TOLERANCE * desiredValue;
  return diff < limit;
}

let tick = async () => {
  try {
    //console.log("Automated control running")
    let [hum, temp] = await readTempHum();
    let light = await readLight();
    if(checkValueIn(light, targets.light) == false) {
	    console.log(`Read light: ${light}, target light: ${targets.light}`);
      if(light < targets.light) {
        lightMod(+10);
      }
      else if (light > targets.light) { 
        lightMod(-10);
		  }
	  }
    if(checkValueIn(temp, targets.temperature) == false){
		  if(temp > targets.temperature)
			  changeActuators({heater: false});
		  else
		    changeActuators({heater: true});
	  }
    if(checkValueIn(hum, targets.humidity) == false){
		  if(hum > targets.humidity)
		    changeActuators({window: true});
		  else
		    changeActuators({window: false});
	  }
  } catch(e) {
    console.log(e);
  }
}

module.exports = {
  currentTargets: targets,
  changeTargets: handleChange,
  tickController: tick
}
