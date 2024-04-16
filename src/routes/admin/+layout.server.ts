import { prisma } from '$lib/server/prisma.js';

export async function load({ cookies, url }) {
	const users = (await prisma.user.findMany()) as any;
	const comment = (await prisma.comment.findMany()) as any;

	// kelompokan comment berdasarkan parentCommentId
	let comments = {};
	comment.forEach((c: any) => {
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
			users: users,
			comments: comment,
			chart: {
				user: groupByDay(users),
				comment: groupByDay(comment)
			}
		}
	};
}

function groupByDay(data: any) {
	const grouped = [];
	for (let i = 0; i >= -29; i--) {
		const currentDate = new Date();
		currentDate.setDate(currentDate.getDate() + i);
		const formattedDate = timeToDate(currentDate.toISOString())
		grouped.push({ date: formattedDate, value: 0 });
	}

	for (const item of data) {
		const day = timeToDate(item.createdAt)
		const index = grouped.findIndex((entry) => entry.date === day);
		if (index !== -1) {
			grouped[index].value++;
		}
	}

	return grouped.reverse();
}

function timeToDate(time: any) {
	const date = new Date(time);
	// change format to 03 March 2021
	return date.toLocaleDateString('id-ID', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});
}
