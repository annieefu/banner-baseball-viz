<script>
import { rgb } from "d3";


	// Receive x-scale, height and margins as props.
	export let xScale;
	export let yScale;
	export let height;
	export let margin;

	export let innerHeight;
	export let innerWidth;

	$: console.log(innerHeight)
	// Determine ticks based on x-scale.
	// Try changing this number to haver e.g. fewer ticks.
	let xTicks;
	$: if (innerWidth > 600) {
		xTicks = xScale.ticks(5)}
		else if (innerWidth < 600) {
		xTicks = xScale.ticks(5)
		} 
    
</script>


<defs>
    <pattern id="patt1" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
      <rect fill='#bbaa99' width='160' height='80'/><g fill='#B0A090' ><polygon points='0 10 0 0 10 0'/><polygon points='0 40 0 30 10 30'/><polygon points='0 30 0 20 10 20'/><polygon points='0 70 0 60 10 60'/><polygon points='0 80 0 70 10 70'/><polygon points='50 80 50 70 60 70'/><polygon points='10 20 10 10 20 10'/><polygon points='10 40 10 30 20 30'/><polygon points='20 10 20 0 30 0'/><polygon points='10 10 10 0 20 0'/><polygon points='30 20 30 10 40 10'/><polygon points='20 20 20 40 40 20'/><polygon points='40 10 40 0 50 0'/><polygon points='40 20 40 10 50 10'/><polygon points='40 40 40 30 50 30'/><polygon points='30 40 30 30 40 30'/><polygon points='40 60 40 50 50 50'/><polygon points='50 30 50 20 60 20'/><polygon points='40 60 40 80 60 60'/><polygon points='50 40 50 60 70 40'/><polygon points='60 0 60 20 80 0'/><polygon points='70 30 70 20 80 20'/><polygon points='70 40 70 30 80 30'/><polygon points='60 60 60 80 80 60'/><polygon points='80 10 80 0 90 0'/><polygon points='70 40 70 60 90 40'/><polygon points='80 60 80 50 90 50'/><polygon points='60 30 60 20 70 20'/><polygon points='80 70 80 80 90 80 100 70'/><polygon points='80 10 80 40 110 10'/><polygon points='110 40 110 30 120 30'/><polygon points='90 40 90 70 120 40'/><polygon points='10 50 10 80 40 50'/><polygon points='110 60 110 50 120 50'/><polygon points='100 60 100 80 120 60'/><polygon points='110 0 110 20 130 0'/><polygon points='120 30 120 20 130 20'/><polygon points='130 10 130 0 140 0'/><polygon points='130 30 130 20 140 20'/><polygon points='120 40 120 30 130 30'/><polygon points='130 50 130 40 140 40'/><polygon points='120 50 120 70 140 50'/><polygon points='110 70 110 80 130 80 140 70'/><polygon points='140 10 140 0 150 0'/><polygon points='140 20 140 10 150 10'/><polygon points='140 40 140 30 150 30'/><polygon points='140 50 140 40 150 40'/><polygon points='140 70 140 60 150 60'/><polygon points='150 20 150 40 160 30 160 20'/><polygon points='150 60 150 50 160 50'/><polygon points='140 70 140 80 150 80 160 70'/></g>
    </pattern>
  </defs>

<!-- SECTION FOR FIELD DIMENSIONS -->
<line x1={xScale(363.66)} x2={xScale(363.66+106)} y1={height - yScale(21)} y2={height - yScale(21)} stroke="rgb(204, 194, 179)" stroke-width={4}/>
<rect x={xScale(363.66)} y={height-yScale(21)} height={yScale(22)-margin.bottom} width={xScale(424+45.66)- xScale(363.66)} fill='url(#patt1)'/>
<!-- <line x1={xScale(318)} x2={xScale(318)} y1={height-margin.bottom} y2={height - yScale(21)} stroke="rgb(204, 194, 179)" stroke-width={4}/> -->

<text class='axis-eutaw' text-anchor='middle' x={innerWidth < 970? (innerWidth < 780? xScale(340): xScale(345) ) : xScale(351)} y={height-yScale(10)}  fill="rgb(85,85,85)"> {#if innerWidth > 1200}Eutaw Street →{:else if innerWidth <1200 && innerWidth > 570}Eutaw St →{:else} Eutaw{/if}</text>

<!-- The warehouse rect -->
<rect x={xScale(424+45.66)} y={height-yScale(120)} height={yScale(120)-margin.bottom} width={xScale(475+45.66)- xScale(424+45.66)} fill={rgb(161, 98, 71)}/>
<polygon points="{xScale(449.5+45.66)} {height-yScale(135)}, {xScale(424+45.66)} {height-yScale(120)}, {xScale(475+45.66)} {height-yScale(120)}" fill={rgb(161, 98, 71)}/>
<text class='axis-eutaw' x={xScale(449.5+45.66)} y={height-yScale(140)} text-anchor='middle' fill="rgb(85,85,85)">{#if innerWidth > 600}The warehouse{:else}Warehouse{/if}</text>


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

<line x1={0} x2={xScale(363.66)} y1={0} y2={0} stroke="rgb(0, 191, 54)" stroke-width={4}/>


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
 overflow:visible;
}

.axis-eutaw{
	font-family: GT-Standard-Bold;
	font-size: 1rem;
 overflow:visible;
}

.eutaw-rect{
	background-color: #bbaa99;
background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='200' viewBox='0 0 160 80'%3E%3Cg fill='%23B0A090' %3E%3Cpolygon points='0 10 0 0 10 0'/%3E%3Cpolygon points='0 40 0 30 10 30'/%3E%3Cpolygon points='0 30 0 20 10 20'/%3E%3Cpolygon points='0 70 0 60 10 60'/%3E%3Cpolygon points='0 80 0 70 10 70'/%3E%3Cpolygon points='50 80 50 70 60 70'/%3E%3Cpolygon points='10 20 10 10 20 10'/%3E%3Cpolygon points='10 40 10 30 20 30'/%3E%3Cpolygon points='20 10 20 0 30 0'/%3E%3Cpolygon points='10 10 10 0 20 0'/%3E%3Cpolygon points='30 20 30 10 40 10'/%3E%3Cpolygon points='20 20 20 40 40 20'/%3E%3Cpolygon points='40 10 40 0 50 0'/%3E%3Cpolygon points='40 20 40 10 50 10'/%3E%3Cpolygon points='40 40 40 30 50 30'/%3E%3Cpolygon points='30 40 30 30 40 30'/%3E%3Cpolygon points='40 60 40 50 50 50'/%3E%3Cpolygon points='50 30 50 20 60 20'/%3E%3Cpolygon points='40 60 40 80 60 60'/%3E%3Cpolygon points='50 40 50 60 70 40'/%3E%3Cpolygon points='60 0 60 20 80 0'/%3E%3Cpolygon points='70 30 70 20 80 20'/%3E%3Cpolygon points='70 40 70 30 80 30'/%3E%3Cpolygon points='60 60 60 80 80 60'/%3E%3Cpolygon points='80 10 80 0 90 0'/%3E%3Cpolygon points='70 40 70 60 90 40'/%3E%3Cpolygon points='80 60 80 50 90 50'/%3E%3Cpolygon points='60 30 60 20 70 20'/%3E%3Cpolygon points='80 70 80 80 90 80 100 70'/%3E%3Cpolygon points='80 10 80 40 110 10'/%3E%3Cpolygon points='110 40 110 30 120 30'/%3E%3Cpolygon points='90 40 90 70 120 40'/%3E%3Cpolygon points='10 50 10 80 40 50'/%3E%3Cpolygon points='110 60 110 50 120 50'/%3E%3Cpolygon points='100 60 100 80 120 60'/%3E%3Cpolygon points='110 0 110 20 130 0'/%3E%3Cpolygon points='120 30 120 20 130 20'/%3E%3Cpolygon points='130 10 130 0 140 0'/%3E%3Cpolygon points='130 30 130 20 140 20'/%3E%3Cpolygon points='120 40 120 30 130 30'/%3E%3Cpolygon points='130 50 130 40 140 40'/%3E%3Cpolygon points='120 50 120 70 140 50'/%3E%3Cpolygon points='110 70 110 80 130 80 140 70'/%3E%3Cpolygon points='140 10 140 0 150 0'/%3E%3Cpolygon points='140 20 140 10 150 10'/%3E%3Cpolygon points='140 40 140 30 150 30'/%3E%3Cpolygon points='140 50 140 40 150 40'/%3E%3Cpolygon points='140 70 140 60 150 60'/%3E%3Cpolygon points='150 20 150 40 160 30 160 20'/%3E%3Cpolygon points='150 60 150 50 160 50'/%3E%3Cpolygon points='140 70 140 80 150 80 160 70'/%3E%3C/g%3E%3C/svg%3E");
}

</style>