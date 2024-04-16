import { jwt_sign } from '$lib/server/token.js';
import { json } from '@sveltejs/kit';
import { JWT_EXPIRATION_TIME } from '$env/static/private';
import bcrypt from 'bcryptjs';
import { prisma } from '$lib/server/prisma.js';
import { api_endpoint } from '$lib';

export async function POST({ request, cookies }) {
	const body = await request.json();
	if (!body.username || !body.password) {
		return json({ message: 'Invalid username or password' }, { status: 401 });
	}

	let login_api = await fetch(`${api_endpoint}/auth/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body)
	});
	let login_data = await login_api.json();

	if (![200, 201].includes(login_data.statusCode)) {
		return json({ message: 'Invalid username or password' }, { status: 401 });
	}

  const token_payload = {
    id: login_data.data.id,
    link_id: login_data.data.link_id
  }

	const token = await jwt_sign({ sub: JSON.stringify(token_payload) }, { exp: `${JWT_EXPIRATION_TIME}m` });
	const tokenMaxAge = parseInt(JWT_EXPIRATION_TIME) * 60;
	const cookieOps = {
		httpOnly: true,
		path: '/',
		secure: process.env.NODE_ENV !== 'production',
		maxAge: tokenMaxAge
	};
	cookies.set('token', token, cookieOps);

	return json({
		message: 'Logged in',
		status: 200,
		link_id: login_data.data.link_id
	}, {
    status: 200
  });
}