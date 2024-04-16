import { api_endpoint } from '$lib';
import { prisma } from '$lib/server/prisma.js';
import { json } from '@sveltejs/kit';

export async function POST(p) {
	let id = p.params.id;
	let body = await p.request.json();

	if (!body.message_content) return json({ message: 'Invalid comment' }, { status: 401 });

	const posting_komentar = await fetch(api_endpoint + '/message/' + id, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body)
	});
    const posting_komentar_data = await posting_komentar.json();

	return json(posting_komentar_data, { status: 200 });
}

export async function GET(p) {
	const id = p.params.id;
	const user = await prisma.user.findUnique({
		where: {
			link_id: id
		},
		select: {
			username: true,
			role: true,
			comments: {
				select: {
					content: true,
					createdAt: true,
					id: true,
					ReplyComment: {
						select: {
							content: true,
							createdAt: true,
							id: true
						}
					}
				}
			}
		}
	});
	// console.log(user)
	if (!user) return json({ message: 'User not found' }, { status: 404 });
	return json({
		message: 'success',
		status: 200,
		comments: user?.comments,
		author: {
			username: user.username,
			role: user.role
		}
	});
}

export async function DELETE(p) {
	const id = p.params.id as any;
	const user = await prisma.user.findUnique({
		where: {
			link_id: id
		}
	});
	if (!user) return json({ message: 'User not found' }, { status: 401 });

	// * get query
	const query = new URL(p.url);
	const comment_id = query.searchParams.get('comment_id');
	if (!comment_id) return json({ message: 'Comment not found' }, { status: 401 });

	const comment = await prisma.comment.findUnique({
		where: {
			id: comment_id
		}
	});
	if (!comment) return json({ message: 'Comment not found' }, { status: 401 });

	let delete_reply = prisma.replyComment.deleteMany({
		where: {
			parentReplyId: comment.id
		}
	});
	let delete_comment = prisma.comment.delete({
		where: {
			id: comment.id
		}
	});

	const transaction = await prisma.$transaction([delete_reply, delete_comment]);

	console.log(transaction);

	return json({ message: 'success', status: 200 });
}
