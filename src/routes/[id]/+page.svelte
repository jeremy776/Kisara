<script>
	/** @type {import('./$types').PageData} */
	export let data;

	import { onMount } from 'svelte';

	let cookies = {};
	let author = '{data.author.nama}';
	let isOwner = false;
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
		if (cookies['loggedin'] === 'true') {
			fetch('/api/auth/verify', {
				headers: {
					// @ts-ignore
					Authorization: `Bearer ${cookies['token']}`
				}
			}).then((res) => {
				if (res.ok) {
					res.json().then((datas) => {
						if (datas.status === 200) {
							isOwner = datas.user.link_id === data.data.id;
						}
					});
				}
			});
		}
	});

	/**
	 * @type {any[]}
	 */
	let message = [];
	onMount(() => {
		fetch(`/api/message/${data.data.id}`, {
			headers: {
				'Content-Type': 'application/json'
			},

			method: 'GET'
		}).then((res) => {
			if (res.ok) {
				res.json().then((data) => {
					if (data.status === 200) {
						author = data.author;
						message = data.comments.reverse();
					}
				});
			}
		});
	});

	/** @param {{ currentTarget: EventTarget & HTMLFormElement}} event */
	async function handleKirim(event) {
		const form = event.currentTarget;
		const formData = new FormData(form);
		const datas = Object.fromEntries(formData.entries());

		fetch('/api/message', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				pesan: datas.pesan,
				id: data.data.id
			})
		}).then((res) => {
			if (res.ok) {
				res.json().then((data) => {
					if (data.status === 200) {
						// reset form
						form.reset();
						message = [data.data, ...message];
					}
				});
			} else {
				console.error(res);
			}
		});
	}

	/**
	 * @param {string | number} id
	 */
	function handleHapus(id) {
		fetch(`/api/message/${data.data.id}?comment_id=${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			}
		}).then((res) => {
			if (res.ok) {
				res.json().then((data) => {
					if (data.status === 200) {
						message = message.filter((msg) => msg.id !== id);
					}
				});
			}
		});
	}

	/**
	 * @param {string | number | Date} time
	 */
	function timeToDate(time) {
		const date = new Date(time);
		return date.toLocaleDateString();
	}
</script>

<svelte:head>
	<title>{author} - Dapatkan pesan rahasia dari teman mu</title>
</svelte:head>

<div class="navbar bg-base-100">
	<div class="flex-1">
		<a class="btn btn-ghost text-xl" href='/'>Kisara</a>
	</div>
	<div class="flex-none">
		<ul class="menu menu-horizontal px-1">
			<li></li>
		</ul>
	</div>
</div>

<div class="flex items-center flex-col gap-3 justify-center min-h-full">
	<div class="bg-base-100 w-full p-6 shadow-sm rounded-b-2xl">
		{#if isOwner}
			<div class="w-fulll bg-base-200 px-4 py-2 text-center">
				<p>Daftar Pesan kamu</p>
			</div>

			<div class="text-lg mt-5 text-center">
				<p>Bagiin link kamu ke media sosial yuk</p>

				<div>
					<input
						type="text"
						value={data.data.url}
						class="input input-bordered w-full mt-2"
						disabled
					/>
				</div>
			</div>
		{:else}
			<div class="w-full bg-base-200 rounded-3xl px-4 py-6">
				<div class="space-y-">
					<h2 class="font-semibold">Mau ngirim pesan apa nih ke {author}?</h2>
					<p class="text-sm text-gray-400">
						Tenang aja, {author} ga bakalan tau kok yang ngirim pesan nya siapa
					</p>
				</div>

				<form on:submit|preventDefault={handleKirim} class="my-4">
					<input
						type="text"
						name="pesan"
						autocomplete="off"
						class="text-sm input w-full"
						placeholder="tulisnya tetep pake etika yaa..."
					/>
					<button class="btn btn-success mt-5 btn-sm">Kirim ke {author}</button>
				</form>
			</div>
		{/if}
	</div>
	<div class="w-full p-6">
		<h2 class="text-xl text-left">Timeline {author}</h2>
		<div>
			{#if message.length === 0}
				<p class="text-center text-gray-400 mt-5">Belum ada pesan nih</p>
			{:else}
				<p class="text-center text-gray-400">Ada {message.length} pesan nih</p>
			{/if}
			{#each message as msg, index}
				<div class="bg-base-100 p-4 mt-4 rounded-lg">
					<p class="text-sm">
						{msg.content}
					</p>
					<div class="flex justify-between mt-4">
						{#if isOwner}
							<div>
								<button
									class="btn btn-xs btn-error text-white"
									on:click={() => {
										const modal = document.getElementById(`my_modal_${index}`);
										// @ts-ignore
										modal?.showModal();
									}}>Hapus</button
								>
								<dialog id={`my_modal_${index}`} class="modal">
									<div class="modal-box">
										<h3 class="font-bold text-lg">Peringatan nih</h3>
										<p class="pt-4">Yakin mau hapus pesan ini?</p>
										<p class="text-gray-400 text-sm">
											btw, pesan yg udah di hapus ga bisa dibalikin lagi ya...
										</p>
										<div class="modal-action">
											<form method="dialog">
												<!--if there is a button in form, it will close the modal -->
												<button class="btn">ga jadi</button>
												<button
													class="btn btn-error text-white"
													on:click={() => {
														handleHapus(msg.id);
													}}>Ya, hapus</button
												>
											</form>
										</div>
									</div>
								</dialog>
							</div>
						{/if}
						<p class="text-xs text-right text-gray-400">
							{timeToDate(msg.createdAt)}
						</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>
