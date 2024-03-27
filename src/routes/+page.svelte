<script>
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

	import { onMount } from 'svelte';
	let cookies = {};
	onMount(() => {
		const parseCookies = () => {
			return document.cookie.split(';').reduce((cookies, cookie) => {
				const [name, value] = cookie.split('=').map((c) => c.trim());
				// @ts-ignore
				cookies[name] = value;
				return cookies;
			}, {});
		};
		cookies = parseCookies();
		
		// @ts-ignore
		if (cookies['loggedin']) {
			fetch('/api/auth/verify', {
				headers: {
					// @ts-ignore
					Authorization: `Bearer ${cookies['token']}`
				}
			}).then((res) => {
				console.log(res);
				if (res.ok) {
					res.json().then((data) => {
						if(data.status === 200) window.location.href = '/' + data.user.link_id;
					});
				} else {
					console.error(res);
				}
			});
		}
	});
</script>

<div class="hero min-h-screen bg-base-200">
	<div class="hero-content flex-col lg:flex-row-reverse sm:max-w-md lg:max-w-3xl lg:gap-10">
		<div class="text-center lg:text-left">
			<h1 class="text-5xl font-bold">Kisara</h1>
			<p class="py-6">
				Kisara atau Kirim pesan rahasia adalah aplikasi yang memungkinkan teman dari pengguna untuk
				mengirim pesan secara rahasia kepada pengguna.
			</p>
		</div>
		<div class="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
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
		</div>
	</div>
</div>
<div class="flex items-center w-full justify-center">
	<div class="w-full max-w-3xl p-9">
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
				<div class="stat-value">2</div>
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
				<div class="stat-value">4,200</div>
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
				<div class="stat-value">1,200</div>
			</div>
		</div>
	</div>
</div>
