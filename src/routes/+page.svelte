<script>
    
	import Swiper from 'swiper';
	import { onMount } from 'svelte';
	import { register } from 'swiper/element/bundle';
	import * as d3 from "d3";

	import cowser from '$lib/images/cowser.png';
	import henderson from '$lib/images/henderson.png';
	import kjerstad from '$lib/images/kejrstad.png';
	import holliday from '$lib/images/holliday.png';
	import soto from '$lib/images/soto.png';
	import ohtani from '$lib/images/Shohei_Ohtani-removebg.png';
	import devers from '$lib/images/devers.png';
	import seager from '$lib/images/seager.png';


	let hitters;

    import BOS from '$lib/logos/BOS.svelte';
    import BAL from '$lib/logos/BAL.svelte';
    import LAD from '../lib/logos/LAD.svelte';
    import NYY from '../lib/logos/NYY.svelte';
    import TEX from '../lib/logos/TEX.svelte';

	onMount(async () => {
		register();
        hitters = await d3.csv('src/lib/data/hitters_3.csv')
	});


	$: console.log(hitters)

</script>
<div class="baseball-cards-wrapper">
	<!-- add pagination -->
    <swiper-container effect="cards" grabCursor="true" navigation="true">
		{#if hitters}
		{#each hitters as hitter}
            <swiper-slide>
                <div class="card-content">
                <div class="card-top">
	
					
					<div class="logo" style="text-align:right">
						{#if hitter.team == 'BOS'}
						
						<BOS size={100} />
						{:else if hitter.team == "NYY"}
						<NYY size={100} />
						{:else if hitter.team == "LAD"}
						<LAD size={100} />
						{:else if hitter.team == "BAL"}
						<BAL size={100} />
						{:else if hitter.team == "TEX"}
						<TEX size={100} />
						{/if}
					</div>
					<div class="hitter-img-container">
					{#if hitter.last == 'Soto'}
                    <img src='{soto}' style="position: absolute;margin-top: -90px" class="hitter-img" />

					{:else if hitter.last == "Kjerstad"}
                    <img src='{kjerstad}' style="position: absolute;margin-top: -90px" class="hitter-img" />
					{:else if hitter.last == "Henderson"}
                    <img src='{henderson}' style="position: absolute;margin-top: -90px" class="hitter-img" />

					{:else if hitter.last == "Cowser"}
                    <img src='{cowser}' style="position: absolute;margin-top: -90px" class="hitter-img" />

					{:else if hitter.last == "Holliday"}
                    <img src='{holliday}' style="position: absolute;margin-top: -90px" class="hitter-img" />
					{:else if hitter.last == "Ohtani"}
                    <img src='{ohtani}' style="position: absolute;margin-top: -90px" class="hitter-img" />

					{:else if hitter.last == "Seager"}
                    <img src='{seager}' style="position: absolute;margin-top: -90px" class="hitter-img" />
					{:else if hitter.last == "Devers"}
                    <img src='{devers}' style="position: absolute;margin-top: -90px" class="hitter-img" />
				
					{/if}
				</div>


					<div class="hitter-info">
                    <h2 class="card-name">{hitter.name}</h2>
					<h2 class="card-name">{hitter.last}</h2>
					<h2 class="card-name">#{hitter.number}</h2>
					</div>
            
                    
                </div>

                <div class="card-bottom">
                    <p class="gi-card-text">
						<!-- batting_avg,num_runs,exit_avg,camden_games_avg,why,farthest_run -->

						<span class="card-stats"><strong>Batting average </strong> {hitter.batting_avg}</span>
						<span class="card-stats"><strong>Number of runs </strong>{hitter.num_runs}</span>
						<span class="card-stats"><strong>Average exit velocity </strong>{hitter.exit_avg}</span>
						<span  class="card-stats"><strong>Average season games at Camden </strong>{hitter.camden_games_avg}</span><br/>
					
                       
						<strong>Why he'll be the one to hit the warehouse:</strong>
                        {@html hitter.why}
                    </p>
                    
                </div>
            </div>
                 <!-- <div class="card-display text-display">
                    <div class=" gi-sans">
                        <p class="gi-card-text">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                            irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                            deserunt mollit anim id est laborum.
                        </p>
                        
                    </div>
                </div> -->
            </swiper-slide>
		{/each}
		{/if}
    </swiper-container>
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

.card-stats{
	display:flex;
	justify-content: space-between;
}

strong{
	font-family: GT-Standard-Bold;
}

.swiper-button-prev, .swiper-button-next{
	top: 70% !important;
}	

.hitter-info{
		z-index: 99;
		position: fixed;
		width: 98%;
		padding-right: 2%;
		/* padding: 5%; */
		margin-top: 30%;
		text-align: right;
		font-family: GT-Standard-Medium-Italic;
		/* line-height: .4; */
	}

	.logo{
		position: absolute;
		width: 100%;
		margin-right: 5%;
		margin-top: 0%;
	}

	.hitter-img-container{
		z-index:1;
		position: fixed;
		margin-top: 20%;
		margin-left: -8%;
		width: 100%;
		height: 60%;
		/* top: 0; */
		/* left: 0; */
	}

	.hitter-img{
		/* transform: translate(-28%, 20%); */
		z-index:1;
		height: 100%;
	}
	.card-bottom{
		height: 60%;
	}
	.card-name{
		vertical-align:bottom;
		margin-top: 40px;
		z-index:99;
		color:rgb(0, 43, 83);;
		text-transform: uppercase;

		font-family: "Arimo", sans-serif;
		
		
		font-family: GT-Standard-Black-Italic;
		font-weight: 700;
		font-size: 60px;
		/* font-style: normal; */
		font-style: italic;
		letter-spacing:-4px;
		-webkit-text-stroke-width: 2px;
		-webkit-text-stroke-color: white;
		margin:0;
		text-align:right;
		margin-right: 4%;
		line-height:.9;
	}
   .baseball-cards-wrapper {
		max-width: 440px;
		margin: 2.15rem auto;
	}
	:global(swiper-slide) {
		background-color: #f7f0df;
		border-radius: 25px;
		/* max-height: 80vh; */
		display: flex;
		justify-content: center;
		border: 0.25rem solid white;
		height: calc(600px / 3.5 * 4);
		max-width: 600px !important;
		margin: auto;
		/* max-width: 640px; */
	}
	
	.card-top{
		height:50%;
	}
    .card-content{
        width:96%;
        height:97%;
        margin:auto;
        
		/* border: #276192 0.25rem solid; */
		border-radius: 20px;
        display:flex;
        flex-direction: column;
    }


	.person-photo-c {
		width: 81.275%;

		border: 0.25rem solid #d92938;
		border-radius: 25px;
		margin: 1.2rem auto 0 auto;

		background-color: #d92938;
	}

	.person-photo {
		width: 100%;
		border-radius: 25px;
		height: 82%;
		align-items: center;
		text-align: center;

		display: flex;
		justify-content: center;
	}
	h2 {
		/* margin: 0.5rem auto !important; */
		text-align: center;
		font-size: 1.75rem;
		color: #f2eed8;
		font-weight: 700;
	}
	.person-name {
		padding: 2.15rem 0 1rem 0;
		margin: -1.9rem auto 0 auto !important;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 15px;
		/* temp fix while function is broken */
	}
	.gi-card-text {
		position: relative;
		z-index:99;
		max-width: 85%;
		font-family: GT-Standard;
		font-size: 1.2rem;
		line-height: 1.1;
		margin: 2rem auto;
		padding: 1rem;
		border-radius: 10px;
		border: 3px solid rgb(255, 64, 25);;
		background:white;
		/* height: 60%; */
	}
	.text-display {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	:root {
		--swiper-navigation-color: rgb(255, 64, 25);
		--swiper-navigation-top-offset: 50%;
		--swiper-navigation-size: 80px;
	}

	@media (orientation: portrait) {
		.baseball-cards-wrapper {
			max-width: 90%;
			overflow: hidden;
			margin: auto;
			/* height: calc(100vh - 121px); */
		}
		:global(swiper-slide) {
			background-color: #f2eed8;
			border-radius: 25px;
			display: flex;
			justify-content: center;
			border: 0.25rem solid #d92938;
			height: calc(100vw * 4 / 3 + 100px);
			max-height: 100vh;
			margin: auto;
		}
		.person-photo-c {
			margin: auto;
			width: 90%;
		}
		.person-photo {
			width: 100%;
			height: auto;
		}
		.person-name {
			margin: -1rem auto 0 auto !important;
		}
		.card-display {
			display: flex;
			justify-content: center;
			width: 90%;
			height: 90%;
		}
	}

	@media only screen and (min-width: 600px) and (orientation: portrait) {
		.baseball-cards-wrapper {
			height: calc(100vh - 121px);
		}
		:global(swiper-slide) {
			max-height: 850px;
		}
	}
</style>