/** @type {import('./$types').PageLoad} */
export async function load({ parent, params, url }) {
	const p = await parent();

    return {
        status: 200,
        url: url.origin,
    };
}
