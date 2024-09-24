<script>
    
	import { onMount } from 'svelte';
	import { register } from 'swiper/element/bundle';
	import * as d3 from "d3";

    
	// original: https://observablehq.com/@d3/line-chart/2
	// svelte version: Sebastian Lammers https://vis.social/@seblammers
	import LineChart from '$lib/LineChart.svelte';

	let runs;


	onMount(async () => {
        runs = await d3.csv('src/lib/data/runs.csv')
	});


	$: console.log(runs)



</script>


<div class="runs-wrapper">
	
{#if runs}
    <LineChart {runs} />

{/if}
</div>


<style>
@import url('https://fonts.googleapis.com/css2?family=Arimo:ital,wght@0,400..700;1,400..700&display=swap');

@import url('https://fonts.googleapis.com/css2?family=Arimo:ital,wght@0,400..700;1,400..700&family=Mukta:wght@200;300;400;500;600;700;800&display=swap');

@font-face {
    font-family: GT-Standard;
    src: url($lib/fonts/GT-America-Standard-Regular.ttf);
}

@font-face {
    font-family: GT-Standard-Black;
    src: url($lib/fonts/GT-America-Standard-Black.ttf);
}


@font-face {
    font-family: GT-Standard-Bold;
    src: url($lib/fonts/GT-America-Standard-Bold.ttf);
}


@font-face {
    font-family: GT-Standard-Medium-Italic;
    src: url($lib/fonts/GT-America-Standard-Medium-Italic.ttf);
}

@font-face {
    font-family: GT-Standard-Black-Italic;
    src: url($lib/fonts/GT-America-Standard-Black-Italic.ttf);
}


	@media (orientation: portrait) {
		
	}

	@media only screen and (min-width: 600px) and (orientation: portrait) {
	
	}
</style>