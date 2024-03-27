import { prisma } from '$lib/server/prisma.js';
import { json } from '@sveltejs/kit';


export async function POST({request, cookies}) {
    const body = await request.json();
    if (!body.pesan || !body.id) {
        return json({ message: 'invalid cok' }, { status: 402 });
    }

    const user = await prisma.user.findUnique({
        where: {
            link_id: body.id
        }
    });
    if(!user) return json({ message: 'User not found' }, { status: 401 });

    let a = await prisma.comment.create({
        data: {
            content: body.pesan,
            parentComment: {
                connect: {
                    id: user.id
                }
            }
        }
    })

    return json({ message: 'success', status: 200, data: {
        id: a.id,
        content: a.content,
        createdAt: a.createdAt
    }});
}