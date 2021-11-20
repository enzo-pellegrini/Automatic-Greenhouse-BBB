var state = {
  enabled: false,
  heater: false,
  window: false,
  light: 50
}

let getState = () => { return state }

let reset = () => {
  console.log(state);
}

let handleChange = (newState) => {
  for (let k in state) {
    if (newState[k] != state[k]) {
      console.log(`${k} changed to ${newState[k]}`);
      state[k] = newState[k]
    }
  }
}

let manualSet = (k, v) => {
  state[k] = v;
}

module.exports = {
  currentActuators: getState,
  resetState: reset,
  changeActuators: handleChange
}