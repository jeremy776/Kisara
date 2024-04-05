
import { prisma } from '$lib/server/prisma.js';

export async function load({ cookies, url }) {
    const users = await prisma.user.findMany() as any;
    const comment = await prisma.comment.findMany();

    // kelompokan comment berdasarkan parentCommentId
    let comments = {};
    comment.forEach(c => {
        // @ts-ignore
        if (!comments[c.parentCommentId]) comments[c.parentCommentId] = [];
        // @ts-ignore
        comments[c.parentCommentId].push(c);
    });

    // tambahkan comments ke user
    users.forEach((u: any) => {
        // @ts-ignore
        u.comments = comments[u.id] || [];
    });

    return {
        status: 200,
        admin_data: {
            users: users
        }
    };
}