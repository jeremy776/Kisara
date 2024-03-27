import { prisma } from '$lib/server/prisma.js';
import { json } from '@sveltejs/kit';


export async function GET(p) {
    const id = p.params.id;
    const user = await prisma.user.findUnique({
        where: {
            link_id: id
        },
        select: {
            username: true,
            comments: {
                select: {
                    content: true,
                    createdAt: true,
                    id: true,
                }
            }
        }
    });
    if(!user) return json({ message: 'User not found' }, { status: 401 });
    return json({ message: 'success', status: 200, comments: user?.comments, author: user.username });
}

export async function DELETE(p) {
    const id = p.params.id as any;
    const user = await prisma.user.findUnique({
        where: {
            link_id: id
        }
    });
    if(!user) return json({ message: 'User not found' }, { status: 401 });

    // get query
    const query = new URL(p.url)
    const comment_id = query.searchParams.get('comment_id');
    if(!comment_id) return json({ message: 'Comment not found' }, { status: 401 });

    const comment = await prisma.comment.findUnique({
        where: {
            id: comment_id
        }
    });
    if(!comment) return json({ message: 'Comment not found' }, { status: 401 });

    await prisma.comment.delete({
        where: {
            id: comment.id
        }
    });

    return json({ message: 'success', status: 200 });
}