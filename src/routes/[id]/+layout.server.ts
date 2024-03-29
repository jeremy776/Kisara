import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies, url }) {
	const token = cookies.get('token');

	let obj_return = {
		status: 200,
	} as any;

	if (token) {
		let verifOwners = await fetch(`${url.origin}/api/auth/verify`, {
			headers: {
				// @ts-ignore
				Authorization: `Bearer ${token}`
			}
		});
		let verif = await verifOwners.json();
		if (verif.status === 200) obj_return.user = verif.user;
	}

	const getMessages = await fetch(`${url.origin}/api/message/${url.pathname.split('/')[1]}`);
	const messages = await getMessages.json();
	if (!messages.status) {
		throw redirect(308, '/404');
	}
	if (messages.status === 200) {
		obj_return.author = messages.author;
		obj_return.messages = messages.comments.reverse();
	}

	return obj_return;
}
