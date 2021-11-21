<script>
import Sensors from '$lib/Sensors.svelte'
import Manual from '$lib/Manual.svelte';
import Automatic from '$lib/Automatic.svelte';
</script>

<div class="max-w-xl mx-auto">

    <div class="mt-4">
        <Sensors />
    </div>

    <div class="mt-4">
        <Manual />
    </div>
    
    <div class="mt-4">
        <Automatic />
    </div>

</div>

