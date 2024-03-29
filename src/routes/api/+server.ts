import { error, json } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma.js';

/** @type {import('./$types').RequestHandler} */
export async function GET() {
	// * get all comments
	let comments = await prisma.comment.findMany() as any;
	comments = comments.length;
	// * get all user
	let users = await prisma.user.findMany() as any;
	users = users.length;
	return json({ message: 'success', status: 200, data: { comments, users } });
}
