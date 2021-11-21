const { changeActuators } = require("./actuators");

var manualSettings = {
  enabled: false,
  heater: false,
  window: false,
  light: 50
}

let changeSettings = (newState) => {
  console.log(`The new state is \n ${JSON.stringify(newState)} \n\n`);
  manualSettings = newState;
  if (manualSettings.enabled) {
    changeActuators({
      light: manualSettings.light,
      heater: manualSettings.heater,
      window: manualSettings.window
    })
  }
}

module.exports = {
  changeManualSettings: changeSettings,
  isManualMode: () => manualSettings.enabled,
  getManualSettings: () => manualSettings,
}
