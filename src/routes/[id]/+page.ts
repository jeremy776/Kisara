/** @type {import('./$types').PageLoad} */
export function load(a) {
	console.log(a)
	return {
		status: 200,
		data: {
			id: a.params.id,
			url: a.url.href,
		},
	};
}