// import { redirect } from '@sveltejs/kit';

import { redirect } from '@sveltejs/kit';

export async function handle({ event, resolve }) {
	try {
		const token = event.cookies.get('token');
		if (event.url.pathname === '/admin') {
			let verifOwners = await fetch(`${event.url.origin}/api/auth/verify`, {
				headers: {
					// @ts-ignore
					Authorization: `Bearer ${token}`
				}
			});
			let verif = await verifOwners.json();
			if (verif.user && ['admin', 'super'].includes(verif.user.role)) {
				return await resolve(event);
			} else {
				return redirect(307, '/');
			}
		}

		let response = await resolve(event, {});
		return response;
	} catch (error) {
		return redirect(307, '/');
	}
}
