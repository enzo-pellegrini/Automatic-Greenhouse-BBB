<script>
import { onMount } from "svelte";
import { basePath } from "./variables";

let connected = false;

let targets = {
    temperature: 0,
    humidity: 0,
    light: 0,
}

onMount(() => {
    fetch(basePath + "api/targets")
        .then(res => res.json())
        .then(data => {
            targets = data;
            connected = true;
        })
})

// Check if the string is a number
let is_pn = (value) => {
    return /^[0-9]+$/.test(value);
}

let onChange = () => {
    if ([targets.temperature, targets.humidity, targets.light].every(is_pn)) {
        let toSend = {
            temperature: parseInt(targets.temperature),
            humidity: parseInt(targets.humidity),
            light: parseInt(targets.light)
        }
        fetch(basePath + "api/targets", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(targets)
        })
        .catch(err => console.log(err))
    }
}
</script>

<div class="text-2xl font-semibold"> Automatic mode targets </div>
<div class="form-control">
    <label class="label">
        <span class="label-text"> Desired temperature (C) </span>
        <input type="text" class="input input-bordered" class:border-red-500="{!is_pn(targets.temperature)}" bind:value="{targets.temperature}" disabled="{!connected}" on:change="{onChange}"> 
    </label>
</div>
<div class="form-control">
    <label class="label">
        <span class="label-text"> Desired light level (%) </span>
        <input type="text" class="input input-bordered" class:border-red-500="{!is_pn(targets.light)}" bind:value="{targets.light}" disabled="{!connected}" on:change="{onChange}"> 
    </label>
</div>
<div class="form-control">
    <label class="label">
        <span class="label-text"> Desired humidity level (%) </span>
        <input type="text" class="input input-bordered" class:border-red-500="{!is_pn(targets.humidity)}" bind:value="{targets.humidity}" disabled="{!connected}" on:change="{onChange}"> 
    </label>
</div>

