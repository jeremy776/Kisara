// import { redirect } from '@sveltejs/kit';

import { redirect } from "@sveltejs/kit";

export async function handle({ event, resolve }) {
	// const token = event.cookies.get('token');
	// if (token && event.url.pathname === '/') {
	// 	let verifOwners = await fetch(`${event.url.origin}/api/auth/verify`, {
	// 		headers: {
	// 			// @ts-ignore
	// 			Authorization: `Bearer ${token}`
	// 		}
	// 	});
	// 	let verif = await verifOwners.json();
	// 	if (verif.status === 200 ) {
	// 		return 
	// 	}
	// }

    let response = await resolve(event, {
        // transformPageChunk: ({html}) => html.replace(/<title>.*?<\/title>/, '<title>Loading bentar</title>'),
    });
    return response;
};
