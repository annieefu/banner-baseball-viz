<script>
	// Receive x-scale, height and margins as props.
	export let xScale;
	export let height;
	export let margin;

	export let innerHeight;
	export let innerWidth;

	$: console.log(innerHeight)
	// Determine ticks based on x-scale.
	// Try changing this number to haver e.g. fewer ticks.
	let xTicks;
	$: if (innerWidth > 600) {
		xTicks = xScale.ticks(8)}
		else if (innerWidth < 600) {
		xTicks = xScale.ticks(5)
		} 
    
</script>

<g class="x-axis" transform="translate({0}, {height - margin.bottom})">

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
<line x1={0} x2={xScale(462)} y1={0} y2={0} stroke="hsla(212, 10%, 53%, 1)" />

	{#each xTicks as tick, index}


    <g class='tick' transform="translate({xScale(tick)}, 0)">

			<!-- X-Axis Ticks -->
      <line x1={0} x2={0} y1={0} y2={3} stroke="hsla(212, 10%, 53%, 1)" />

			<!-- X-Axis Tick Labels -->


	{#if index == 0}

	<text 
	y={15} 
	dy={9} 
	fill="currentColor"
	text-anchor="middle" 
	dominant-baseline="middle">
	{#if innerWidth > 900}
	Home plate (0 ft)
	{:else}
	HP (0 ft)
	{/if}
</text>
	{:else}
      <text 
				y={15} 
				dy={9} 
				fill="currentColor"
				text-anchor="middle" 
				dominant-baseline="middle">
				{tick}
			</text>

	{/if}
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
 font-size: 1.2rem;
}
</style>