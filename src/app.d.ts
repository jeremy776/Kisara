// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import type { PrismaClient } from '@prisma/client';
declare global {
	namespace App {
		interface Locals {
			user?: User;
		}
	}
	var prisma: PrismaClient;
}

type User = {
	id: number;
	username: string;
	password: string;
}
export {};
