var state = {
  enabled: false,
  heater: false,
  window: false,
  light: 50
}

const BASE_PATH = './executables/';

const { exec } = require("child_process");


let setWindow = (value) => {
  exec(BASE_PATH+'servo.out '+ (value ? 100 : 0), (error, stdout, stderr) => {
    if(error) {
      console.log('${error.message}');
      return;
    }

    if(stderr != '') {
      console.log('${stderr}');
      return;
    }
    
    console.log(`changing window to ${value}`);
  });
}

let setLight = (value) => {
  exec(BASE_PATH+'light_actuator.out '+value, (error, stdout, stderr) => {
    if(error) {
      console.log('${error}');
      return;
    }
    if(stderr) {
      console.log('${stderr}');
      return;
    }
  });
  console.log(`changing light to ${value}`);
}


let lightMod = (mod) => {
	if (mod > 0) {
	   state = {...state, light: Math.min(state.light+mod,100)};
	} else {
		state = {...state, light: Math.max(state.light+mod, 0)};
	}
  setLight(state.light);
	console.log(`called lightMOd with mod ${mod}`);
}

let setHeater = (value) => {
  exec(`${BASE_PATH}heater.out ${value?1:0}`, (error, stdout, stderr) => {
    if(error){
        console.log('${error}');
        return;
    }
    if(stderr){
        console.log('${stderr}');
    }
    console.log(`changing heater to ${value}`);
  });
  console.log(`changing heater to ${value}`);
}

let getState = () => { return state }

let reset = () => {
  console.log(state);
}

let handleChange = (newState) => {
  for (let k in state) {
    if (newState[k] != state[k]) {
      console.log(`${k} changed to ${newState[k]}`);
      state[k] = newState[k];
    }
  }
  if (state.enabled) {
    setWindow(newState.window);
    setHeater(newState.heater);
    setLight(newState.light);
  }
}

let manualSet = (k, v) => {
  state[k] = v;
}

module.exports = {
  currentActuators: getState,
  resetState: reset,
  changeActuators: handleChange,
  setLight: setLight,
  setHeater: setHeater,
  setWindow: setWindow,
  lightMod: lightMod,
}
