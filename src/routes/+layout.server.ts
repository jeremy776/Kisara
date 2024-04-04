/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies, url }) {
    const token = cookies.get('token');
    let obj_return = {
        status: 200,
        user: null
    };
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

    return obj_return;
}