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
		class="hero-content flex-col flex lg:flex-row-reverse lg:flex lg:justify-between sm:max-w-md lg:max-w-7xl lg:gap-10"
	>
		<div class="text-center lg:text-right max-w-xl w-full">
			<h1 class="text-5xl font-bold">Kisara</h1>
			<p class="py-6">
				Kisara atau Kirim pesan rahasia adalah aplikasi yang memungkinkan teman dari pengguna untuk
				mengirim pesan secara rahasia kepada pengguna.
			</p>
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
