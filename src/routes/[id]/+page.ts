/** @type {import('./$types').PageLoad} */
export async function load({parent, params, url}) {
	const p = await parent();

	if(p.user && params.id === p.user.link_id) {
		p.is_owner = true;
	}
	return {
		status: 200,
		data: {
			id: params.id,
			isOwner: p.is_owner,
			url: url.href,
			author: p.author,
			messages: p.messages
		},
	};
}