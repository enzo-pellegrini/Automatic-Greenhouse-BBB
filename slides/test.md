---
marp: true
---

# Our beaglebone project

---

## Our objectives
We wanted to build a simple to use and lightweight interface to get real time feedback from the sensors and that made it easy to control the actuators both manually and automatically based on simple targets.

---

## The general architecture

![bg right w:50%](diagram.jpg)
```
.
├── README.md
├── build.sh
├── executables
│   ├── digital
│   ├── light_sensor
│   ├── pwm
│   ├── servo
│   └── temp_humidity
├── install_dependencies.sh
├── package-lock.json
├── package.json
├── public
│   ├── _app
│   │   ├── assets
│   │   │   └── start-d5b4de3e.css
│   │   ├── chunks
│   │   │   └── vendor-ca25202b.js
│   │   ├── error.svelte-8cdfd66a.js
│   │   ├── layout.svelte-ba4c3282.js
│   │   ├── pages
│   │   │   └── index.svelte-d9c3b6a9.js
│   │   └── start-5f41a676.js
│   ├── favicon.png
│   ├── index.html
│   └── styles.css
├── slides
│   ├── diagram.jpg
│   ├── nodesock.png
│   ├── sveltekit.jpeg
│   ├── sveltetail.jpg
│   ├── tailwind.jpeg
│   ├── test.html
│   ├── test.md
│   └── test.pdf
└── src
    ├── backend
    │   ├── actuators.js
    │   ├── api.js
    │   ├── controller.js
    │   ├── main.js
    │   ├── manual.js
    │   └── sensors.js
    ├── cppexec
    │   ├── I2CDevice
    │   │   ├── I2CDevice.cpp
    │   │   ├── I2CDevice.h
    │   │   ├── main.cpp
    │   │   ├── makefile
    │   │   ├── temphumidity.cpp
    │   │   └── temphumidity.h
    │   ├── build.sh
    │   ├── digital
    │   │   ├── digital.c
    │   │   ├── digital.h
    │   │   ├── digital.o
    │   │   ├── main.c
    │   │   ├── main.o
    │   │   └── makefile
    │   ├── light_sensor
    │   │   ├── Light_Sensor.cpp
    │   │   ├── Light_Sensor.h
    │   │   ├── main.cpp
    │   │   └── makefile
    │   ├── pwm
    │   │   ├── main.cpp
    │   │   ├── makefile
    │   │   ├── pwm.cpp
    │   │   └── pwm.h
    │   └── servo
    │       ├── main.cpp
    │       ├── makefile
    │       ├── servo.cpp
    │       └── servo.h
    └── frontend
        ├── README.md
        ├── jsconfig.json
        ├── package.json
        ├── postcss.config.cjs
        ├── src
        │   ├── app.html
        │   ├── global.d.ts
        │   ├── lib
        │   │   ├── Automatic.svelte
        │   │   ├── Manual.svelte
        │   │   ├── Sensors.svelte
        │   │   ├── stores.js
        │   │   └── variables.js
        │   ├── routes
        │   │   └── index.svelte
        │   └── styles
        │       ├── tailwind-output.css
        │       └── tailwind.css
        ├── static
        │   ├── favicon.png
        │   └── styles.css
        ├── svelte.config.js
        └── tailwind.config.cjs
```

---

![bg left w:50%](sveltetail.jpg)
---
# Frontend
We used **Tailwind** and the extension **daisyUI** to style the pages components and the library **svelte.js** to handle the interaction with the user. 

The frontend also depends on the package **socket.io** to interact with the same module in the backend.

---
![bg right w:50%](nodesock.png)
---

# Backend
The backend is build using the **Express.js** framework, used to expose a simple rest api, with just 5 endpoints, and to host the frontend as static files.

It also has a socket.io server to send real time updates about the sensors readings.


---
![bg](#555)
![](#eee)
# Patterns
## Sprinkled without a real need for them
We used **encapsulation** by using python module a la' singletons, to move the managment of state in somewhat independent modules.

---
# Interesting spnippents
We wrote code to fill some slides

---

#### From the actuators
```js
let handleChange = (newState) => {
  for (let k in newState) {
    if (newState[k] != state[k]) {
      console.log(`${k} set to ${newState[k]}`);
      state[k] = newState[k];

      switch (k) {
        case 'window': setWindow(state[k]); break;
        case 'heater': setHeater(state[k]); break;
        case 'light': setLight(state[k]); break;
      }
    }
  }
}
```


---

#### From the frontend
```js
export const fetchSensors = () => {
    fetch(basePath + 'api/sensors')
        .then(res => res.json())
        .then(data => {
            sensors.set(data);
        });

    let socket = io(basePath);
    socket.on('sensorData', data => sensors.set(data));
}
```

---

#### Code from the I2C module
Featuring bitshifting and binary operators
```cpp
MeasureRes r;

int t_humidity = 0;
t_humidity |= data[1];
t_humidity |= (data[0] & 0b00111111) << 8;

r.humidity = (float)100*t_humidity/((float)(
        (1<<14) - 2
      ));

int t_temperature = 0;
t_temperature |= data[3] >> 2;
t_temperature |= data[2] << 6;

r.temperature = t_temperature/((float)(
        (1<<14) - 2
      ))*(float)165 - 40;
```

---

### Bridge between node js and the executables

Most of the bridge modules are built like this
```js
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
```

---
# Thank you following
> By Francesco Palma and Vincenzo Pellegrini