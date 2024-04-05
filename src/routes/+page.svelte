<script>
	// import Countup from './Countup.svelte';
	/** @param {{ currentTarget: EventTarget & HTMLFormElement}} event */
	async function handleSubmit(event) {
		const form = event.currentTarget;
		const formData = new FormData(form);
		const data = Object.fromEntries(formData.entries());
		await fetch('/api/auth/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		}).then((res) => {
			if (res.ok) {
				res.json().then((data) => {
					if (data.status === 200) {
						window.location.href = '/' + data.id;
					}
				});
			} else {
				console.error(res);
			}
		});
	}

	/** @type {import('./$types').PageData} */
	export let data;
</script>

<svelte:head>
	<title>Kisara - Dapatkan pesan rahasia dari teman mu</title>
</svelte:head>

<div class="hero min-h-[90vh] bg-base-200">
	<div
		class="relative hero-content flex-col flex lg:flex-row-reverse lg:flex lg:justify-between sm:max-w-md lg:max-w-7xl lg:gap-10"
	>
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
		<div class="card shrink-0 w-full shadow max-w-sm bg-base-100">
			{#if data.user}
				<div class="stats stats-vertical">
					<div class="stat">
						<div class="stat-title">Total Komentar</div>
						<div class="stat-value">
							<!-- <Countup value={data.user.message} /> -->
							{data.user.message} Komentar
						</div>
					</div>
					<a href={`/${data.user.link_id}`} class="mt-4 btn btn-primary">Lihat link</a>
				</div>
			{:else}
				<form method="POST" on:submit|preventDefault={handleSubmit} class="card-body">
					<div class="form-control">
						<label for="" class="label">
							<span class="label-text">Nama</span>
						</label>
						<input
							autocomplete="off"
							name="name"
							type="text"
							placeholder="daftarkan nama"
							class="input input-bordered"
							required
						/>
					</div>
					<div class="form-control">
						<label for="" class="label">
							<span class="label-text">Password</span>
						</label>
						<input
							name="password"
							type="password"
							placeholder="password"
							class="input input-bordered"
							required
						/>
					</div>
					<div class="form-control mt-6">
						<button type="submit" class="btn btn-primary">Login</button>
					</div>
				</form>
			{/if}
		</div>
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
<div class="flex items-center w-full justify-center mb-20">
	<div class="w-full max-w-sm p-4 md:max-w-4xl">
		<div class="flex flex-col md:flex-row w-full stats shadow">
			<div class="stat">
				<div class="stat-figure text-secondary">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						class="inline-block w-8 h-8 stroke-current"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						></path></svg
					>
				</div>
				<div class="stat-title">Pengguna baru</div>
				<div class="stat-value">{data.total_user || '0'}</div>
			</div>

			<div class="stat">
				<div class="stat-figure text-secondary">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						class="inline-block w-8 h-8 stroke-current"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
						></path></svg
					>
				</div>
				<div class="stat-title">Pesan terkirim</div>
				<div class="stat-value">{data.total_comment || '0'}</div>
			</div>

			<div class="stat">
				<div class="stat-figure text-secondary">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						class="inline-block w-8 h-8 stroke-current"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
						></path></svg
					>
				</div>
				<div class="stat-title">Total kunjungan</div>
				<div class="stat-value">0</div>
			</div>
		</div>
	</div>
</div>

<!-- Team -->
<div class="max-w-5xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
	<!-- Title -->
	<div class="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
		<h2 class="text-3xl font-bold md:text-4xl md:leading-tight">Our team</h2>
		<p class="mt-1 text-gray-500">Lazypeople organization</p>
	</div>
	<!-- End Title -->

	<!-- Grid -->
	<div class="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-10 md:gap-12">
		<div class="text-center">
			<span
				class="inline-flex items-center justify-center w-[70px] h-[70px] rounded-full bg-blue-600 font-semibold text-white leading-none dark:bg-blue-500"
			>
				CJ
			</span>
			<div class="mt-2 sm:mt-4">
				<h3 class="font-medium text-white">Christian Jeremy</h3>
				<p class="text-sm text-gray-500">Frontend Developer</p>
			</div>
		</div>
		<!-- End Col -->

		<div class="text-center">
			<span
				class="inline-flex items-center justify-center w-[70px] h-[70px] rounded-full bg-blue-600 font-semibold text-white leading-none dark:bg-blue-500"
			>
				WP
			</span>
			<div class="mt-2 sm:mt-4">
				<h3 class="font-medium text-white">Wahyu Pamungkas</h3>
				<p class="text-sm text-gray-500">UI/UX Designer</p>
			</div>
		</div>
		<!-- End Col -->

		<div class="text-center">
			<span
				class="inline-flex items-center justify-center w-[70px] h-[70px] rounded-full bg-blue-600 font-semibold text-white leading-none dark:bg-blue-500"
			>
				AI
			</span>
			<div class="mt-2 sm:mt-4">
				<h3 class="font-medium text-white">Angga Islami</h3>
				<p class="text-sm text-gray-500">Backend Developer</p>
			</div>
		</div>
		<!-- End Col -->
	</div>
	<!-- End Grid -->

	<!-- Card -->
	<div class="mt-12 flex justify-center">
		<div class="border border-gray-600 p-1.5 ps-5 rounded-full">
			<div class="flex items-center gap-x-3">
				<span class="text-sm text-gray-400">Mau punya website?</span>
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
	<!-- End Card -->
</div>
<!-- End Team -->
