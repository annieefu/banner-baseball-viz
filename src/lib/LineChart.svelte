<script>
	import * as d3 from "d3";

	// Import axes-components.
	// import AxisY from './AxisY.svelte';
	import AxisX from '$lib/components/AxisX.svelte';
    import AxisY from '$lib/components/AxisY.svelte';

    // Receive plot data as prop.
    export let runs;
    export let innerWidth;
    export let innerHeight;

    runs = runs.filter((runs) => runs.eutaw == 'yes')

    let isHovered = false;
    let hoveredArc = null;
    let x;
    let y;

    $: width = innerWidth;
    $: height = innerHeight/1.5;
    
        const margin = { 
            top: 20,
            right: 20,
            bottom: 25,
            left: 50	
        };

    const fn=d3.arc();
    let angle = Math.PI * 2;
    $: total = runs.reduce((total, s) => total + s.distance_feet, 0);

    let arcs;
    $: {
        let acc = 0;

        arcs = runs.map((run) => {
            const start = 0+margin.left;
            const end = xScale(run.distance_feet)-margin.right;
                
            // Step 1: Calculate vertical component of height
            let vert;
            let run_height;
            vert = run.exit_velocity_mph * Math.sin( run.launch_angle *(Math.PI / 180));
            // Step 2: Calculate maximum height
            run_height =(vert ** 2)/(2*9.8) 

            const inflexion = height;
            // Calculate x and y radii for the arc
            const rx = (end - start) / 2; // Half the distance between start and end
            const ry = yScale(run_height); // Use the calculated height

            return {
                ...run,
                run_height,
                d: [
                    "M", start, height-25, // Move to starting point
                    "A", rx, ry, 0, 0, 1, end, height-25 // Draw arc
                ].join(" ")
            };

        });
        };
    

    // Declare the x (horizontal position) scale.
    $: xScale = d3.scaleLinear()
        // .domain(d3.extent(runs, d => parseInt(d.distance_feet)))
        .domain([0, d3.max(runs, d => parseInt(d.distance_feet))]) 
        .range([margin.left, width - margin.right]);

        
    $: yScale = d3.scaleLinear()
        // .domain(d3.extent(runs, d => parseInt(d.distance_feet)))
        .domain([0, 260]) 
        .range([margin.bottom, height - margin.top]);

        // Declare the y (vertical position) scale.
    // $: yScale = d3.scaleLinear()
    //     .domain([0, d3.max(data, d => d.close)])
    //     .rangeRound([height - margin.bottom, margin.top]);

    // Declare the line generator.
    // const line = d3.line()
    //     .x(d => xScale(new Date(d.)))

	function mouseOver(e, arc) {
		isHovered = true; 
        hoveredArc = arc;
		x = event.pageX + 5;
		y = event.pageY + 5;
	}
	function mouseMove(event) {
		x = event.pageX + 5;
		y = event.pageY + 5;
	}
	function mouseLeave() {
		isHovered = false;
        hoveredArc = null;
	}
    function capitalizeFirstLetter(str) {
    if (!str) return str; // Return if the string is empty
    return str.charAt(0).toUpperCase() + str.slice(1);
}


</script>


<div class="arc-wrapper">
    
<svg
  {width}
  {height}
  viewBox="0 0 {width} {height}"
  style:max-width="100%"
  style:height="auto"
>
	<!-- Add the y-axis -->
	
	<!-- Add the x-axis -->
	<AxisX {xScale} {height} {margin} {innerWidth} {innerHeight}/>
	<AxisY {yScale} {height} {margin} {innerWidth} {innerHeight}/>

	<!-- Add a path for the line. -->
	<g class="data">
			<!-- <path 
				fill=none
				stroke="steelblue"
				d={line(data)}/> -->
        {#each arcs as arc, i}
            <path
            class="run-arc"
            key={i}
            d={arc.d}
            stroke={isHovered 
                ? (hoveredArc === arc ? 'rgb(255, 64, 25)' : 'lightgray') 
                : 'rgb(255, 64, 25)'}
            stroke-width={2.4}
            fill="none"
            on:mouseover={(e) => mouseOver(e, arc)}
            on:mouseleave={(e) => mouseLeave(e, arc)}
            on:mousemove={(e) => {mouseMove(e, arc)}}
        />

            <!-- <path
                transform="translate({arc.distance},475)"
                fill=none
                stroke="rgb(112, 0, 255)"
                stroke-width=1.5
                d={arc.d}
                on:mouseover={mouseOver}
                on:mouseleave={mouseLeave}
                on:mousemove={mouseMove}
            /> -->

        {/each}
              
	</g>
    <g>

    </g>
    
</svg>
{#if isHovered && hoveredArc}
<div style="top: {y}px; left: {x}px;" class="tooltip">
    <span><strong>{capitalizeFirstLetter(hoveredArc.player.split(', ')[1]) + ' ' +capitalizeFirstLetter(hoveredArc.player.split(', ')[0]) }</strong></span>
    <hr>
    <span><strong>Distance</strong> {hoveredArc.distance_feet} feet<br/></span>
    <span><strong>Date </strong>{hoveredArc.date}<br/></span>
    
    <span><strong>Exit velocity</strong> {hoveredArc.exit_velocity_mph} mph<br/></span>
    <span><strong>Launch angle </strong>{hoveredArc.launch_angle} deg<br/></span>

</div>
{/if}

</div>
<style>
hr {
    border: none; /* Remove default border */
    height: 1px; /* Set the height of the line */
    background-color: rgb(217, 217, 217);; /* Set the color of the line */
    margin: 10px 0px; /* Optional: add some vertical spacing */
}
.run-arc:hover{
    cursor: pointer;
    stroke-width: 7px;
    z-index:99;
}

.run-arc{
    z-index: 5;
}

.arc-wrapper{
    width: 70%;
    margin: auto;
}

.tooltip {
        border: 0.15rem solid rgb(255, 64, 25);
		background: white;
		border-radius: 15px;
		padding: 15px;
		position: absolute;
        width:auto;
        min-width: 200px;
        height: auto;
        font-family: GT-Standard;
        display: flex;
        flex-direction: column;
        justify-items: space-between;
	}

    .tooltip span{
        display: flex;
        width: 100%;
        justify-items: space-between;
        text-align: left;
    }

.tooltip strong{
    width: auto;
    margin-right: auto;
    text-align: left;
    font-family: GT-Standard-Bold;
}

    
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

</style>