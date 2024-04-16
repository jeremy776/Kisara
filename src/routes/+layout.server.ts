import { verifyJWT } from "$lib/server/token";

/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies, url }) {
	//* get the token from the cookies
	const token = cookies.get('token');
	let obj_return = {
		status: 200,
		is_loggedin: token ? true : false,
		data: null
	} as ServerLoadObjectReturnProps;
	//* check if the token is available
	if (token) {
		const payload = await verifyJWT(token) as { sub: string };
		if(payload) {
			obj_return.data = JSON.parse(payload.sub);
		}
	}

	return obj_return;
}

type ServerLoadObjectReturnProps = {
	status: number;
	is_loggedin: boolean;
	data: {
		id: string;
		link_id: string;
	} | null;
}