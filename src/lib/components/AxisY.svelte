<script>
	// Receive y-scale, height and margins as props.
	export let yScale;
	export let height;
	export let margin;

	export let innerHeight;
	export let innerWidth;

	$: console.log(innerHeight)
	// Determine ticks based on x-scale.
	// Try changing this number to haver e.g. fewer ticks.
	$: yTicks = yScale.ticks(5); 
    
</script>

<g class="y-axis" transform="translate({0}, {height - margin.bottom})">

		<!-- <g class='tick' transform="translate(5, 0)">

			<text 
			y={5} 
			dy={9} 
			fill="currentColor"
			text-anchor="middle" 
			dominant-baseline="middle">
			Home plate
		</text>
</g> -->
<line x1={0} x2={0} y1={0} y2={yScale(240)} stroke="hsla(212, 10%, 53%, 1)" />

	{#each yTicks as tick, index}
    <g class='tick' transform="translate(0, -{yScale(tick)})">

			<!-- X-Axis Ticks -->
      <!-- <line x1={0} x2={20} y1={0} y2={0} stroke="hsla(212, 10%, 53%, 1)" /> -->

			<!-- X-Axis Tick Labels -->
      <text 
				y={5} 
				dy={9}
                x={15} 
				fill="currentColor"
				text-anchor="middle" 
				dominant-baseline="middle">
				{tick}
			</text>
    </g>
  {/each}
</g>

<style>
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

text {
 font-family: GT-Standard;
 font-size: 1.1rem;
 text-align: left;
}
</style>