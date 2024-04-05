
import { verifyJWT } from '$lib/server/token';
import { json } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma.js';

export async function GET({request, cookies}) {
    // const token = cookies.get('token');
    // if (!token) {
    //     return json({ message: 'Not logged in' }, { status: 401 });
    // }

    const token = request.headers.get('Authorization')?.split(' ') || [];
    if(token[1] === 'undefined') return json({ message: 'Not logged in', status: 401 });

    const payload = await verifyJWT(token[1]) as { sub: string };
    if(!payload) return json({ message: 'Invalid token' }, { status: 401 });

    const user = await prisma.user.findUnique({
        where: {
            id: payload.sub
        }
    });
    if(!user) return json({ message: 'User not found' }, { status: 401 });

    return json({
        message: 'Logged in',
        status: 200,
        user: {
            id: user.id,
            role: user.role,
            username: user.username,
            link_id: user.link_id
        }
    });
}