// import node from '@sveltejs/kit/node';
// import pkg from './package.json';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// adapter: node(),
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		/**
		 * @todo understand if we need to config vite.ssr.external or not
		 */
		// vite: {
		// 	ssr: {
		// 		external: Object.keys(pkg.dependencies || {}),
		// 	},
		// },
	},
};

export default config;
