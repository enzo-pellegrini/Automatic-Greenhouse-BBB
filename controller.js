let enabled = false
let targets = {
  temperature: 20,
  light: 23,
  humidity: 30
}

let handleChange = (newState) => {
  for (let k in targets) {
    if (newState[k] != targets[k]) {
      console.log(`${k} changed to ${newState[k]}`);
      targets[k] = newState[k]
    }
  }
  targets = newState;
}


let tick = () => {
  if (enabled) {
    console.log("I'm working")
  }
}

module.exports = {
  currentTargets: targets,
  changeTargets: handleChange,
  tickController: tick
}