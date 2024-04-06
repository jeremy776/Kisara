import { prisma } from '$lib/server/prisma.js';
import { json } from '@sveltejs/kit';
import { connect } from 'http2';

export async function POST({ request, cookies, params }) {
	const link_id = params.id;
	const user = await prisma.user.findUnique({
		where: {
			link_id
		}
	});
	if (!user) return json({ message: 'User not found' }, { status: 404 });

	const getComment = await prisma.comment.findUnique({
		where: {
			id: params.repid
		}
	});
	if (!getComment) return json({ message: 'Comment not found' }, { status: 401 });

	const body = await request.json();
	if (!body) return json({ message: 'invalid cok' }, { status: 402 });

	const reply_comment = await prisma.replyComment.create({
		data: {
			content: body.pesan,
			parentReply: {
				connect: {
					id: getComment.id
				}
			}
		}
	});

	return json({
		message: 'success',
		status: 200,
		data: {
			id: reply_comment.id,
			content: reply_comment.content,
			createdAt: reply_comment.createdAt
		}
	});
}
