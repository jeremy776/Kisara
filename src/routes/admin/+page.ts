/** @type {import('./$types').PageLoad} */
export async function load({ parent, params, url }) {
	const p = await parent();
	console.log(p);
}
