<script>
/*
 * Manual.svelte
 * Set of fields manualy set the actuators' values and wheter that manual mode is enabled
 * Vincenzo Pellegrini
 * 313291
 */

import { onMount } from 'svelte';
import { basePath } from './variables';

let manual = {
    enabled: false,
    heater: false,
    window: false,
    light: 3,
}

let connected = false;
onMount(() => {
    fetch(basePath + 'api/manual')
        .then(res => res.json())
        .then(data => {
            manual = data;
            connected = true;
        })
        .catch(err => console.log(err))
});

let onChange = async () => {
    fetch(basePath + `api/manual`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(manual)
    })
    .catch(err => console.log(err));
}
</script>

<div class="form-control">
    <label class="cursor-pointer label">
        <span class="label-text text-2xl font-semibold"> Manual controls </span>
        <input type="checkbox" class="toggle toggle-lg" disabled="{!connected}" bind:checked="{manual.enabled}" on:change={onChange}>
    </label>
</div>
<div class="form-control">
    <label class="cursor-pointer label">
        <span class="label-text"> Heater </span>
        <input type="checkbox" class="toggle toggle-md" disabled="{!manual.enabled}" bind:checked="{manual.heater}" on:change="{onChange}">
    </label>
</div>
<div class="form-control">
    <label class="cursor-pointer label">
        <span class="label-text"> Window open </span>
        <input type="checkbox" class="toggle toggle-md" disabled="{!manual.enabled}" bind:checked="{manual.window}" on:change={onChange}>
    </label>
</div>
<div class="form-control">
    <label class="cursor-pointer label">
        <span class="label-text"> Light intensity </span>
        <input type="range" max="100" bind:value="{manual.light}"  class="range w-2/5" class:opacity-25="{!manual.enabled}" on:change="{onChange}"> 
    </label>
</div>
