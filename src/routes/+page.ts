

/** @type {import('./$types').PageLoad} */
export async function load(a) {
	let bb= new URL(a.url);

	let c =await fetch(`${bb.origin}/api`, {
		method: 'GET'
	});
	let b = await c.json();
	return {
		status: 200,
		total_user: b.data.users,
		total_comment: b.data.comments
	};
}