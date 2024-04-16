/** @type {import('./$types').PageLoad} */
export async function load({parent, params, url}) {
	const p = await parent();

	if(p.user && params.id === p.user.link_id) {
		p.is_owner = true;
	}
	return {
		status: 200,
		url,
		link_id: params.id,
	};
}