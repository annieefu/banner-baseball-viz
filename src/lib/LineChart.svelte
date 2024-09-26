<script>
	import * as d3 from "d3";

	// Import axes-components.
	// import AxisY from './AxisY.svelte';
	import AxisX from '$lib/components/AxisX.svelte';
    import AxisY from '$lib/components/AxisY.svelte';

    import BOS from '$lib/logos/BOS.svelte';
    import BAL from '$lib/logos/BAL.svelte';
    import LAD from '../lib/logos/LAD.svelte';
    import NYY from '../lib/logos/NYY.svelte';
    import TEX from '../lib/logos/TEX.svelte';
    import MIA from '$lib/logos/MIA.svelte';
    import CLE from '$lib/logos/CLE.svelte';
    import CHC from '$lib/logos/CHC.svelte';
    import TB from '$lib/logos/TB.svelte';
    import WSH from '$lib/logos/WSH.svelte';
    import SEA from '$lib/logos/SEA.svelte';
    import OAK from '$lib/logos/OAK.svelte';
    import KC from '$lib/logos/KC.svelte';
    import HOU from '$lib/logos/HOU.svelte';

    // Receive plot data as prop.
    export let runs;
    export let innerWidth;
    export let innerHeight;

    runs = runs.filter((runs) => runs.eutaw == 'yes')

    function sortByDate(data) {
    return data.sort((a, b) => new Date(a.game_date) - new Date(b.game_date));
}

    // Sort the data
    runs = sortByDate(runs);

    let isHovered = false;
    let hoveredArc = null;
    let x;
    let y;

    $: width = innerWidth;
    $: height = 400;

    $: margin = { 
            top: 20,
            right: 15,
            bottom: 35,
            left: 40	
        };

    $: if (innerWidth > 600){
        margin = { 
            top: 20,
            right: 5,
            bottom: 35,
            left: 95	
        }
    }
    

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
            const ry = yScale(run_height)-margin.bottom - margin.top; // Use the calculated height

            return {
                ...run,
                run_height,
                d: [
                    "M", start, height-35, // Move to starting point
                    "A", rx, ry, 0, 0, 1, end, height-35 // Draw arc
                ].join(" ")
            };

        });
        };
    

    // Declare the x (horizontal position) scale.
    $: xScale = d3.scaleLinear()
        // .domain(d3.extent(runs, d => parseInt(d.distance_feet)))
        .domain([250, 500]) 
        .range([margin.left, width - margin.right]);

        
    $: yScale = d3.scaleLinear()
        // .domain(d3.extent(runs, d => parseInt(d.distance_feet)))
        .domain([0, 260]) 
        .range([margin.bottom, height - margin.top]);


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

function formatDate(dateStr) {
        const [month, day, year] = dateStr.split('/').map(Number);
        const date = new Date(year, month - 1, day); // Months are 0-indexed

        return new Intl.DateTimeFormat('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        }).format(date);
    }

    $: console.log(hoveredArc)

</script>


<div class="arc-wrapper">
    <h2>The farthest home runs in (recent) Camden Yards history</h2>
    <p>Looking at <strong>60</strong> of the farthest home runs hit in Camden Yards since 2015, dozens have reached Eutaw Street, just short of hitting the warehouse. But in order to actually do so, a perfect storm of factors must be in place, including direction of hit and the player's leading arm. </p>

        <span class='hover-instruction'>Hover or tap to view home run data.</span>

<!-- TODO: ADD THIS FILTER BUTTON -->
<!-- <span class="filter-button">Orioles only</span> -->
    
<svg
  {width}
  {height}
  viewBox="0 0 {width} {height}"
  style:max-width="100%"
  style:height="auto"
>
	<!-- Add the y-axis -->
	
	<!-- Add the x-axis -->
	<AxisX {xScale} {yScale} {height} {margin} {innerWidth} {innerHeight}/>
	<AxisY {yScale} {height} {margin} {innerWidth} {innerHeight}/>

	<!-- Add a path for the line. -->
	<g class="data">
			<!-- <path 
				fill=none
				stroke="steelblue"
				d={line(data)}/> -->
        {#each arcs as arc, i}
            {#if isHovered && hoveredArc != arc}
            <path
            class="run-arc"
            key={i}
            d={arc.d}
            stroke={isHovered 
                ? (hoveredArc === arc ? 'rgb(255, 64, 25)' : 'lightgray') 
                : 'rgb(255, 64, 25)'}
            stroke-width={isHovered 
                ? (hoveredArc === arc ? '10px' : '2.9px') 
                : '2.9px'}
            fill="none"
            on:mouseover={(e) => mouseOver(e, arc)}
            on:mousemove={(e) => mouseMove(e, arc)}
            on:mouseleave={(e) => mouseLeave(e, arc)}
            style="z-index: 1;"
        />
            <circle
            class="run-ball"
            cx={xScale(arc.distance_feet)-margin.right}
            cy={yScale(260) - margin.top}
            r={5}
            stroke={isHovered 
            ? (hoveredArc === arc ? 'rgb(255, 64, 25)' : 'lightgray') 
            : 'rgb(255, 64, 25)'}
            stroke-width="3px"
            fill="white"
            on:mouseover={(e) => mouseOver(e, arc)}
            on:mousemove={(e) => {isHovered? (hoveredArc == arc ? '': mouseMove(e, arc)  ) : mouseMove(e, arc) }}
            on:mouseleave={(e) => {isHovered? (hoveredArc == arc ? '': mouseLeave(e, arc) ) : mouseLeave(e, arc)}}
            style="z-index: 1;"
            />

            {:else}
            <path
            class="run-arc"
            key={i}
            d={arc.d}
            stroke={isHovered 
                ? (hoveredArc === arc ? 'rgb(255, 64, 25)' : 'lightgray') 
                : 'rgb(255, 64, 25)'}
            stroke-width={isHovered 
                ? (hoveredArc === arc ? '8px' : '2.9px') 
                : '2.9px'}
            fill="none"
            on:mouseover={(e) => mouseOver(e, arc)}
            on:mousemove={(e) => mouseMove(e, arc)}
            on:mouseleave={(e) => mouseLeave(e, arc)}
            style="z-index: 1;"
        />
            <circle
            class="run-ball"
            cx={xScale(arc.distance_feet)-margin.right}
            cy={yScale(260) - margin.top}
            r={5}
            stroke={isHovered 
            ? (hoveredArc === arc ? 'rgb(255, 64, 25)' : 'lightgray') 
            : 'rgb(255, 64, 25)'}
            stroke-width="3px"
            fill="white"
            on:mouseover={(e) => {isHovered? (hoveredArc == arc ? '': mouseOver(e, arc) ) : mouseOver(e, arc) }}
            on:mousemove={(e) => {isHovered? (hoveredArc == arc ? '': mouseMove(e, arc)  ) : mouseMove(e, arc) }}
            on:mouseleave={(e) => {isHovered? (hoveredArc == arc ? '': mouseLeave(e, arc) ) : mouseLeave(e, arc)}}
            style="z-index: 1;"
            />

            {/if}

           

            {/each}
                
              
    </g>
    {#if  isHovered && hoveredArc}
    <path
    class="run-arc"
    d={hoveredArc.d}
    stroke={'rgb(255, 64, 25)' }
    stroke-width={2.6}
    fill="none"
    on:mouseover={(e) => mouseOver(e, arc)}
    on:mouseover={(e) => mouseOver(e, arc)}
    on:mouseleave={(e) => mouseLeave(e, arc)}
/>
    <circle
    class="run-ball-tooltip"
    cx={xScale(hoveredArc.distance_feet)-margin.right}
    cy={yScale(260) - margin.top}
    r={8}
    stroke={'rgb(255, 64, 25)'}
    stroke-width="2px"
    fill="rgb(255, 64, 25)"
            on:mouseover={(e) => mouseOver(e, arc)}
            on:mousemove={(e) => mouseMove(e, arc)}
            on:mouseleave={(e) => mouseLeave(e, arc)}
    />

    {/if}
</svg>
{#if isHovered && hoveredArc}
<div style="top: {y}px; left: {x > innerWidth/2 ? x-200  : x }px" class="tooltip">
    <span class="tooltip-header">
    <span style="position: relative; width: auto; display: flex; flex-direction: row; flex-grow: 2; vertical-align: middle; margin-top: auto; margin-bottom: auto;"><strong>{capitalizeFirstLetter(hoveredArc.player.split(', ')[1]) + ' ' +capitalizeFirstLetter(hoveredArc.player.split(', ')[0]) }</strong></span>
    <span class="tooltip-logo">
        {#if hoveredArc.team == 'bos'}
        <BOS size={45} />
        {:else if hoveredArc.team == 'mia'}
        <MIA size={45} />
        {:else if hoveredArc.team == 'bal'}
        <BAL size={45} />
        {:else if hoveredArc.team == 'chc'}
        <CHC size={45} />
        {:else if hoveredArc.team == 'oak'}
        <OAK size={45} />
        {:else if hoveredArc.team == 'cle'}
        <CLE size={45} />
        {:else if hoveredArc.team == 'wsh'}
        <WSH size={45} />
        {:else if hoveredArc.team == 'kc'}
        <KC size={45} />
        {:else if hoveredArc.team == 'hou'}
        <HOU size={45} />
        {:else if hoveredArc.team == 'tb'}
        <TB size={45} />
        {:else if hoveredArc.team == 'nyy'}
        <NYY size={45} />
        {:else if hoveredArc.team == 'tex'}
        <TEX size={45} />
        {:else if hoveredArc.team == 'lad'}
        <LAD size={45} />
        {:else if hoveredArc.team == 'sea'}
        <SEA size={45} />
        {/if}
    </span></span>
    <hr>
    <span class="tooltip-content"><strong>Distance</strong> {hoveredArc.distance_feet} feet<br/></span>
    <span class="tooltip-content"><strong>Date </strong>{formatDate(hoveredArc.date)}<br/></span>
    
    <span class="tooltip-content"><strong>Exit velocity</strong> {hoveredArc.exit_velocity_mph} mph<br/></span>
    <span class="tooltip-content"><strong>Launch angle </strong>{hoveredArc.launch_angle} deg<br/></span>

</div>
{/if}

<span class="runs-credit">Note: Length of the pitch represented by the average distance of three pitch corners closest to the warehouse (400, 373 and 318 feet). </span><br/>
<span class="runs-credit">Source: Statcast</span>
</div>

<style>
    .runs-credit{
        font-family: GT-Standard-Thin;
        font-size: .9rem;
    }

    .arc-wrapper h2{
        font-family: 'GT-Standard-Bold'
    }

    .tooltip-header{
        display: flex;
        flex-direction: row;
        width: 100%;
        justify-items: space-between;
        justify-content: space-between;
        font-family: 'GT-Standard-Bold';
        vertical-align: middle;
    }
    .arc-wrapper p{
        font-size: 1.1rem;
        font-family: GT-Standard;
    }

    .arc-wrapper p strong{
        font-familY: GT-Standard-Bold;
        color:rgb(255, 64, 25);
    }

    .hover-instruction{
        font-family: GT-Standard-Italic;
    }

.tooltip-logo{
    width: auto;
    text-align: right;
    flex-grow: 1;
    /* position: absolute;
    width: 100%;
    top: 5;
    left: 95; */
}
.run-ball{
    /* z-index: 99; */
}

.run-ball:hover{
    z-index:99;
    /* stroke-width: 3px; */
    cursor: pointer;
    /* fill:rgb(255, 64, 25); */
}

.run-ball-tooltip:hover{
    cursor: pointer;
}
.arc-wrapper svg{
    overflow: visible;
}

hr {
    border: none; /* Remove default border */
    height: 1px; /* Set the height of the line */
    background-color: rgb(217, 217, 217);; /* Set the color of the line */
    margin: 10px 0px; /* Optional: add some vertical spacing */
}

.run-arc:hover{
    cursor: pointer;
    /* stroke-width: 8px; */
    z-index:99;
}

.run-arc{
    /* z-index: 5; */
}

.arc-wrapper{
    width: 90%;
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

    .tooltip-content{
        display: flex;
        width: 100%;
        justify-items: space-between;
        text-align: left;
    }

.tooltip-content strong{
    /* width: auto; */
    
    margin-right: auto;
    text-align: left;
    font-family: GT-Standard-Bold;
}

    
@font-face {
    font-family: GT-Standard;
    src: url($lib/fonts/GT-America-Standard-Regular.ttf);
}


@font-face {
    font-family: GT-Standard-Thin;
    src: url($lib/fonts/GT-America-Standard-Thin.ttf);
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
    font-family: GT-Standard-Italic;
    src: url($lib/fonts/GT-America-Standard-Regular-Italic.ttf);
}

@font-face {
    font-family: GT-Standard-Black-Italic;
    src: url($lib/fonts/GT-America-Standard-Black-Italic.ttf);
}


@media only screen and (min-width: 600px){
    .arc-wrapper{
    width: 80%;
    margin: auto;
}
}

</style>