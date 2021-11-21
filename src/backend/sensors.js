/*
 * Sensors.js
 * Interface between the rest api and the controller and the cpp executables
 * By Vincenzo Pellegrini and Francesco Palma
 * 313291 313301
*/

const { exec} = require("child_process");

exports.sensors = {
  temperature: 1,
  humidity: 3,
  light: 3
}

const BASE_PATH = './executables/';


let readLight = exports.readLight = () => {
	return new Promise(async (resolve, reject) => {
		exec(BASE_PATH+'light_sensor', (error, stdout, stderr) => {
			if (error)
				reject(error.message);
			if (stderr != '')
				reject(stderr);
			resolve(
				parseInt(stdout)
			);
		})
	});
}


let readTempHum = exports.readTempHum = () => {
	return new Promise(async (resolve, reject) => {
		try {
		exec(BASE_PATH+'temp_humidity', (error, stdout, stderr) => {
			if(error)
				reject(error.message);
			if(stderr != '')
				reject(stderr);
			resolve(
				stdout.split(' ').map(s => parseInt(s))
			);
		})} catch { console.log("odda") }
	})
}





exports.readSensors = async () => {
	let [humidity, temp] = await readTempHum();
	let light = await readLight();

	return {
		temperature: temp,
		humidity: humidity,
		light: light
	};
}
