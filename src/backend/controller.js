let targets = {
  temperature: 20,
  light: 23,
  humidity: 30,
  //enabled: false
}

const { readLight, readTempHum } = require('./sensors.js');
const { setWindow, setLight, setHeater, lightMod } = require('./actuators.js');

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
			console.log("should decrease light");
	    		lightMod(-10);
		}
	}
    if(checkValueIn(temp, targets.temperature) == false){
		if(temp > targets.temperature)
			setHeater(false)
		else
			setHeater(true)
	}
    if(checkValueIn(hum, targets.humidity) == false){
		if(hum > targets.humidity)
			setWindow(true)
		else
			setWindow(false)
	}
    } catch(e) {
	    console.err(e);
    }
}

module.exports = {
  currentTargets: targets,
  changeTargets: handleChange,
  tickController: tick
}
