
/** @type {import('./$types').PageLoad} */
export async function load({parent, params, url}) {
	let bb= new URL(url);
	const p = await parent() as any;

	let c = await fetch(`${bb.origin}/api`, {
		method: 'GET'
	});
	// let b = await c.json();
	return {
		status: 200,
	};
}