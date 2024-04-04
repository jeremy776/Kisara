
/** @type {import('./$types').PageLoad} */
export async function load({parent, params, url}) {
	let bb= new URL(url);
	const p = await parent() as any;
	if(p.user) {
		let comments = await fetch(`${bb.origin}/api/message/${p.user.link_id}`, {
			method: 'GET'
		});
		let b = await comments.json();
		if (b.status === 200) {
			p.user.message = b.comments.length
		}
	}

	let c =await fetch(`${bb.origin}/api`, {
		method: 'GET'
	});
	let b = await c.json();
	return {
		status: 200,
		total_user: b.data.users|| 0,
		total_comment: b.data.comments || 0,
		user: p.user || null,
	};
}