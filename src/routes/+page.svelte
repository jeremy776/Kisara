<script>
	import { onMount } from 'svelte';
	import { socket, verifConnection } from '$lib/socketConnection';
	import { RocketOutline } from 'flowbite-svelte-icons';
	import * as Alert from '$lib/components/ui/alert/index';
	import * as Card from '$lib/components/ui/card/index';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { isDev } from '$lib';

	onMount(async () => {
		let a = verifConnection();
	});

	/** @param {{ currentTarget: EventTarget & HTMLFormElement}} event */
	async function handleSubmit(event) {
		const form = event.currentTarget;
		const formData = new FormData(form);
		const data = Object.fromEntries(formData.entries());
		// console.log(data)
		await fetch(`/api/auth/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		}).then((res) => {
			if (res.ok) {
				res.json().then((data) => {
					if (data.status == 200) {
						location.reload();
					}
				});
			} else {
				res.json().then((data) => {
					alert(data.message);
				});
			}
		});
	}

	/** @type {import('./$types').PageData} */
	export let data;
</script>

<svelte:head>
	<title>Kisara - Dapatkan pesan rahasia dari teman mu</title>
</svelte:head>

<div class="flex justify-center flex-col min-h-[90vh] p-8">
	<Alert.Root class="mb-20">
		<RocketOutline class="h-6 w-6" />
		<Alert.Title>Heads up!</Alert.Title>
		<Alert.Description>Nantikan design terbaru dari Kisara v1!</Alert.Description>
	</Alert.Root>
	<div class="w-full items-center gap-8 flex flex-col md:flex-row-reverse justify-between relative">
		<div class="text-center lg:text-right max-w-xl w-full">
			<h1 class="text-5xl font-bold">Kisara</h1>
			<p class="py-6">
				Kisara atau Kirim pesan rahasia adalah aplikasi yang memungkinkan teman dari pengguna untuk
				mengirim pesan secara rahasia kepada pengguna.
			</p>
		</div>
		<div class="absolute top-0 end-0 md:-translate-y-12 md:translate-x-20">
			<svg
				class="w-16 h-auto text-orange-500"
				width="121"
				height="135"
				viewBox="0 0 121 135"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M5 16.4754C11.7688 27.4499 21.2452 57.3224 5 89.0164"
					stroke="currentColor"
					stroke-width="10"
					stroke-linecap="round"
				/>
				<path
					d="M33.6761 112.104C44.6984 98.1239 74.2618 57.6776 83.4821 5"
					stroke="currentColor"
					stroke-width="10"
					stroke-linecap="round"
				/>
				<path
					d="M50.5525 130C68.2064 127.495 110.731 117.541 116 78.0874"
					stroke="currentColor"
					stroke-width="10"
					stroke-linecap="round"
				/>
			</svg>
		</div>

		<Card.Root>
			{#if data.is_loggedin}
				<Card.Header>
					<Card.Title tag="h1" class="text-2xl">Link Kamu</Card.Title>
				</Card.Header>
				<Card.Content>
					<p>Saat ini kamu mempunyai 50 Komentar</p>
				</Card.Content>
				<Card.Footer>
					<Button class="w-full" on:click={() => {
						window.location.href = '/'+data.data?.link_id
					}}>Lihat Link</Button>
				</Card.Footer>
			{:else}
				<form method="POST" on:submit|preventDefault={handleSubmit} class="card-body">
					<Card.Header>
						<Card.Title tag="h1" class="text-2xl">Login</Card.Title>
						<Card.Description>Masuk ke akun kamu buat dapetin link sendiri :0</Card.Description>
					</Card.Header>
					<Card.Content class='flex flex-col gap-6'>
						<div class="grid w-full max-w-sm items-center gap-1.5">
							<Label for="username">Nama</Label>
							<Input autocomplete="off"
							name="username"
							type="text"
							id="username"
							placeholder="Daftarkan nama"
							required />
						</div>
						<div class="grid w-full max-w-sm items-center gap-1.5">
							<Label for="password">Password</Label>
							<Input
							name="password"
							type="password"
							id="password"
							placeholder="Password"
							class="input input-bordered"
							required
							/>
						</div>
					</Card.Content>
					<Card.Footer>
						<Button type="submit" class="w-full">Login</Button>
					</Card.Footer>
				</form>
			{/if}
		</Card.Root>
		<div class="absolute -bottom-20 md:bottom-0 start-0 md:translate-y-10 md:-translate-x-32">
			<svg
				class="w-40 h-auto text-cyan-500"
				width="347"
				height="188"
				viewBox="0 0 347 188"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M4 82.4591C54.7956 92.8751 30.9771 162.782 68.2065 181.385C112.642 203.59 127.943 78.57 122.161 25.5053C120.504 2.2376 93.4028 -8.11128 89.7468 25.5053C85.8633 61.2125 130.186 199.678 180.982 146.248L214.898 107.02C224.322 95.4118 242.9 79.2851 258.6 107.02C274.299 134.754 299.315 125.589 309.861 117.539L343 93.4426"
					stroke="currentColor"
					stroke-width="7"
					stroke-linecap="round"
				/>
			</svg>
		</div>
	</div>
</div>

<div class="max-w-5xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
	<div class="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
		<h2 class="text-3xl font-bold md:text-4xl md:leading-tight">Our team</h2>
		<p class="mt-1 text-gray-500">LazyPeople organization</p>
	</div>
	<div class="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-10 md:gap-12">
		<div class="text-center">
			<span
				class="inline-flex items-center justify-center w-[70px] h-[70px] rounded-full bg-blue-600 font-semibold  leading-none dark:bg-blue-500"
			>
				CJ
			</span>
			<div class="mt-2 sm:mt-4">
				<h3 class="font-medium ">Christian Jeremy</h3>
				<p class="text-sm text-gray-500">Frontend Developer</p>
			</div>
		</div>

		<div class="text-center">
			<span
				class="inline-flex items-center justify-center w-[70px] h-[70px] rounded-full bg-blue-600 font-semibold  leading-none dark:bg-blue-500"
			>
				WP
			</span>
			<div class="mt-2 sm:mt-4">
				<h3 class="font-medium ">Wahyu Pamungkas</h3>
				<p class="text-sm text-gray-500">UI/UX Designer</p>
			</div>
		</div>

		<div class="text-center">
			<span
				class="inline-flex items-center justify-center w-[70px] h-[70px] rounded-full bg-blue-600 font-semibold  leading-none dark:bg-blue-500"
			>
				AI
			</span>
			<div class="mt-2 sm:mt-4">
				<h3 class="font-medium ">Angga Islami</h3>
				<p class="text-sm text-gray-500">Backend Developer</p>
			</div>
		</div>
	</div>
	<div class="mt-12 flex justify-center">
		<div class="border border-gray-600 p-1.5 ps-5 rounded-full">
			<div class="flex items-center gap-x-3">
				<span class="text-sm">Mau punya website?</span>
				<a
					class="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-full border border-gray-200 bg-gray-300 text-blue-600 shadow-xl hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
					href="/"
				>
					Rekrut Kami
					<svg
						class="flex-shrink-0 size-4"
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"><path d="m9 18 6-6-6-6" /></svg
					>
				</a>
			</div>
		</div>
	</div>
</div>
