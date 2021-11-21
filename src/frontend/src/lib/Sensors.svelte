<script>
import { onMount } from "svelte";

import { fetchSensors } from "./stores";
import { sensors } from "./stores";

import { io } from 'socket.io-client'
import { basePath } from "./variables";

onMount(() => {
    fetchSensors();

    const socket = io(basePath);
    socket.on('sensorData', console.log)
});
</script>

<h2 class="text-2xl font-semibold mb-2">Sensors</h2>
<div class="shadow stats p-2 m-auto w-full overflow-auto">
    <div class="stat">
        <div class="stat-title">Temperature</div>
        <div class="stat-value">{$sensors.temperature}°C</div>
    </div>
    <div class="stat">
        <div class="stat-title">Humidity</div>
        <div class="stat-value">{$sensors.humidity}%</div>
    </div>
    <div class="stat">
        <div class="stat-title">Light intensity</div>
        <div class="stat-value">{$sensors.light}%</div>
    </div>
</div>