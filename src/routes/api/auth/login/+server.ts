import { jwt_sign } from '$lib/server/token.js';
import { json } from '@sveltejs/kit';
import { JWT_EXPIRATION_TIME } from '$env/static/private';
import bcrypt from 'bcryptjs';
import { prisma } from '$lib/server/prisma.js';

export async function POST({ request, cookies }) {
	try {
		const body = await request.json();
		if (!body.name || !body.password) {
			return json({ message: 'Invalid username or password' }, { status: 401 });
		}

		const user = await prisma.user.findUnique({
			where: {
				username: body.name
			}
		});

		if (!user) {
			const hashedPassword = (await bcrypt.hash(body.password, 10)) as string;
			const userd = await prisma.user.create({
				data: {
					username: body.name,
					link_id: link_id(),
					password: hashedPassword
				}
			});
			const token = await jwt_sign(
				{ sub: userd.id },
				{
					exp: `${JWT_EXPIRATION_TIME}m`
				}
			);
			const tokenMaxAge = parseInt(JWT_EXPIRATION_TIME) * 60;

			const cookieOps = {
				httpOnly: true,
				path: '/',
				secure: process.env.NODE_ENV !== 'production',
				maxAge: tokenMaxAge
			};

			cookies.set('token', token, cookieOps);
			cookies.set('loggedin', 'true', {
				...cookieOps,
				httpOnly: false
			});

			return json({ message: 'Logged in not found', token, id: userd.link_id, status: 200});
		}

		const passwordMatch = await bcrypt.compare(body.password, user.password);

		if (!passwordMatch) {
			return json({ message: 'Invalid username or password' }, { status: 401 });
		}

		const token = await jwt_sign(
			{ sub: user.id },
			{
				exp: `${JWT_EXPIRATION_TIME}m`
			}
		);
		const tokenMaxAge = parseInt(JWT_EXPIRATION_TIME) * 60;

		const cookieOps = {
			httpOnly: true,
			path: '/',
			secure: process.env.NODE_ENV !== 'production',
			maxAge: tokenMaxAge
		};
		cookies.set('token', token, cookieOps);
		cookies.set('loggedin', 'true', {
			...cookieOps,
			httpOnly: false
		});

		return json({ message: 'Logged in', status: 200, token, id: link_id() });
	} catch (error: any) {
		return json({ error: error.message }, { status: 500 });
	}
}

function link_id() {
	return Math.random().toString(36).slice(2, 7);
}
