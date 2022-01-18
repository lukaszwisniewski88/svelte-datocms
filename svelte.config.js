import preprocess from 'svelte-preprocess';
import WindiCSS from 'vite-plugin-windicss';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [preprocess()],

	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
		package: { exports: (file) => file === 'index.js' },
		vite: {
			plugins: [WindiCSS()],
			test: {
				global: true,
				environment: 'jsdom'
			}
		}
	}
};

export default config;
