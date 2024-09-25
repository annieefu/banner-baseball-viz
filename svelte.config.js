/** @type {import('@sveltejs/kit').Config} */
import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-static';
import autoprefixer from 'autoprefixer';

const CWD = process.cwd();
const loc = CWD.split('/');
const dir = loc[loc.length - 1]; // current dir
const split = dir.split('-');
const s3link = `https://tbimedia.s3.us-east-1.amazonaws.com/bistudios/_00/dev_edit/graphics/${split[0]}/${split[1]}/${dir}`;

const config = {
	kit: {
		// bake final output into static pages, using defaults
		adapter: adapter(),
		// handle linking to assets on s3
		paths: {
			assets: s3link
		}
	},
	// let svelte take care of autoprefixing styles
	preprocess: preprocess({
		postcss: { plugins: [autoprefixer()] }
	})
};

export default config;