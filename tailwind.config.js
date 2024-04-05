/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'
	],
	theme: {
		extend: {}
	},
	daisyui: {
		themes: ['business']
	},
	plugins: [require('@tailwindcss/typography'), require('flowbite/plugin'), require('daisyui')]
};
