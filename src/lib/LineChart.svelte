<script>
	import * as d3 from "d3";

	// Import axes-components.
	// import AxisY from './AxisY.svelte';
	import AxisX from '$lib/components/AxisX.svelte';

    // Receive plot data as prop.
    export let runs;

    runs = runs.filter((runs) => runs.eutaw == 'yes')

    let isHovered = false;
    let x;
    let y;

    const width = 928;
    const height = 500;
    
        const margin = { 
            top: 10,
            right: 10,
            bottom: 20,
            left: 30	
        };

    const fn=d3.arc();
    let angle = Math.PI * 2;
    $: total = runs.reduce((total, s) => total + s.distance_feet, 0);

    let arcs;
    $: {
        let acc = 0;
        arcs = runs.map(run => {
			const options = {
				innerRadius: 0,
				outerRadius: run.distance_feet,
				startAngle: (-Math.PI / 2),
                endAngle: (Math.PI / 2)
			};

			return {
                distance: run.distance_feet,
				d: fn(options),
				centroid: fn.centroid(options)
			};
		});
    }

    

    // Declare the x (horizontal position) scale.
    $: xScale = d3.scaleLinear()
        .domain(d3.extent(runs, d => parseInt(d.distance_feet)))
        .range([margin.left, width - margin.right]);

        // Declare the y (vertical position) scale.
    // $: yScale = d3.scaleLinear()
    //     .domain([0, d3.max(data, d => d.close)])
    //     .rangeRound([height - margin.bottom, margin.top]);

    // Declare the line generator.
    // const line = d3.line()
    //     .x(d => xScale(new Date(d.)))



	function mouseOver(event) {
        console.log(isHovered)
		isHovered = true;
		x = event.pageX + 5;
		y = event.pageY + 5;
	}
	function mouseMove(event) {
		x = event.pageX + 5;
		y = event.pageY + 5;
	}
	function mouseLeave() {
		isHovered = false;
	}

</script>

<svg
  {width}
  {height}
  viewBox="0 0 {width} {height}"
  style:max-width="100%"
  style:height="auto"
>
	<!-- Add the y-axis -->
	
	<!-- Add the x-axis -->
	<AxisX {xScale} {height} {margin} />

	<!-- Add a path for the line. -->
	<g class="data">
			<!-- <path 
				fill=none
				stroke="steelblue"
				d={line(data)}/> -->
        {#each arcs as arc}
            <path
                transform="translate({arc.distance},480)"
                fill=none
                stroke="rgb(112, 0, 255)"
                stroke-width=1.5
                d={arc.d}
                on:mouseover={mouseOver}
                on:mouseleave={mouseLeave}
                on:mousemove={mouseMove}
            />
        {/each}
              
	</g>
    <g>

        {#if isHovered}
        <div style="top: {y}px; left: {x}px;" class="tooltip">Tooltip</div>
        {/if}
    </g>
</svg>

<style>

.tooltip {
		border: 1px solid #ddd;
		box-shadow: 1px 1px 1px #ddd;
		background: red;
		border-radius: 4px;
		padding: 4px;
		position: absolute;
	}
</style>