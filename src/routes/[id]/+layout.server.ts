import { api_endpoint } from '$lib';
import { verifyJWT } from '$lib/server/token.js';
import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies, url }) {
	let token = cookies.get('token');
	const getMessages = await fetch(`${api_endpoint}/message/${url.pathname.split('/')[1]}`);
	const messages = await getMessages.json();
	if(messages.statusCode === 404) {
		return redirect(307, '/')
	}

	if(token) {
		const getData = await verifyJWT(token) as { sub: string };
		if(getData) {
			let payload_json = JSON.parse(getData.sub);
			messages.is_owner = payload_json.id === messages.data.author.id;
		}
	}
	return messages
}