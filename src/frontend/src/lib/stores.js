import { io } from 'socket.io-client';
import { writable } from 'svelte/store';
import { basePath } from './variables';

// sensors
export const sensors = writable({
    temperature: ".",
    humidity: ".",
    light: ".",
});

export const fetchSensors = () => {
    fetch(basePath + 'api/sensors')
        .then(res => res.json())
        .then(data => {
            sensors.set(data);
        });

    let socket = io(basePath);
    socket.on('sensorData', data => sensors.set(data));
}
