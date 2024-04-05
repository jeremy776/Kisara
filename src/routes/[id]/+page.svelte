<script>
	import { fade, fly } from 'svelte/transition';
	/** @type {import('./$types').PageData} */
	export let data;

	let cookies = {};
	let author = data.data.author;
	const early_access = ['admin'].includes(author.role);
	let isOwner = data.data.isOwner;

	/**
	 * @type {any[]}
	 */
	let message = data.data.messages;
	// add value 'first_message' to first message
	if (message.length > 0) {
		message[message.length - 1].first_message = true;
	}

	// buat variable baru untuk menyimpan total message
	let totalMessage = message.length;
	// ambil message selama 1 minggu kebelakang
	let messageLastWeek = message.filter((msg) => {
		const date = new Date(msg.createdAt);
		const now = new Date();
		const week = 7 * 24 * 60 * 60 * 1000;
		return now.getTime() - date.getTime() <= week;
	});
	// bertambah berapa persen message selama 1 minggu kebelakang
	let messageLastWeekPercentage = (messageLastWeek.length / totalMessage) * 100;

	function handleCopy() {
		/**
		 * @type {any}
		 */
		let input = document.getElementById('url');
		input?.select();
		input?.setSelectionRange(0, 99999);
		navigator.clipboard.writeText(input?.value);

		alert('Link berhasil di salin');
	}

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
		// change format to 03 March 2021
		return date.toLocaleDateString('id-ID', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}
</script>

<svelte:head>
	<title>{author.username} - Dapatkan pesan rahasia dari teman mu</title>
</svelte:head>

<div class="flex items-center flex-col gap-3 min-h-full">
	<div class="bg-base-100 w-full p-6 shadow-sm rounded-b-2xl">
		{#if isOwner}
			<div class="w-fulll bg-base-200 px-4 py-2 text-center">
				<p class="text-xl aos-init">💬 Daftar Pesan kamu</p>
			</div>

			<div class="text-lg mt-10 text-center">
				<p class="text-md text-gray-500">Bagiin link kamu ke media sosial yuk</p>
				<div>
					<input
						type="text"
						id="url"
						value={data.data.url}
						class="input input-bordered w-full mt-2"
						disabled
					/>
					<button on:click={handleCopy} class="btn mt-5 btn-primary btn-block">📋 Salin link</button
					>
				</div>
			</div>
		{:else}
			<div class="w-full bg-base-200 rounded-3xl px-4 py-6">
				<div class="space-y-">
					<h2 class="font-semibold">Mau ngirim pesan apa nih ke {author.username}?</h2>
					<p class="text-sm text-gray-400">
						Tenang aja, {author.username} ga bakalan tau kok yang ngirim pesan nya siapa
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
					<button class="btn btn-success mt-5 btn-sm">Kirim ke {author.username}</button>
				</form>
			</div>
		{/if}
	</div>

	{#if early_access}
		<!-- Announcement Banner -->
		<div
			class="z-[100000000000000] sticky top-3 max-w-[85rem] w-full px-4 mt-5 sm:px-6 lg:px-8 mx-auto"
		>
			<div
				class="bg-blue-600 bg-[url('https://preline.co/assets/svg/examples/abstract-1.svg')] bg-no-repeat bg-cover bg-center p-4 rounded-lg text-center"
			>
				<p class="me-2 inline-block text-white">Kamu berada di halaman dengan versi beta</p>
			</div>
		</div>
		<!-- End Announcement Banner -->
	{/if}

	<div class="w-full p-6">
		<h2 class="text-xl text-left">⏱️ Timeline {author.username}</h2>
		<div class="mt-4">
			{#if message.length === 0}
				<p class="text-center text-gray-400 mt-5">Belum ada pesan nih</p>
			{/if}

			<!-- {#each message as msg, index} -->
			{#each message as msg (msg.id)}
				<div transition:fly={{ y: -200 }} class={'bg-base-100 p-4 mt-4 rounded-lg'}>
					<p class="">
						{msg.content}
					</p>

					{#if early_access}
						<div class="mt-2">
							<div class="relative">
								<input
									type="text"
									class="outline-none pr-16 border border-gray-700 px-2.5 py-1.5 w-full rounded-lg bg-base-300 text-sm"
									placeholder="balas komentar"
								/>
								<div class="absolute flex items-center px-2 h-full top-0 right-0">
									<button class="px-3 text-xs py-0.5 rounded-lg bg-blue-500">kirim</button>
								</div>
							</div>
						</div>
					{/if}

					<div class="flex justify-between mt-4">
						{#if isOwner}
							<div>
								<button
									class="btn btn-xs rounded-sm btn-error text-white"
									on:click={() => {
										const modal = document.getElementById(`my_modal_${msg.id}`);
										// @ts-ignore
										modal?.showModal();
									}}>Hapus</button
								>
								<dialog id={`my_modal_${msg.id}`} class="modal">
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
						<!-- <p class="text-xs text-right text-gray-400">
							{timeToDate(msg.createdAt)}
						</p> -->
						<span
							class="inline-flex items-center gap-x-1.5 py-0.5 px-3 rounded-full text-xs font-medium bg-gray-800 text-gray-400"
						>
							{timeToDate(msg.createdAt)}
						</span>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>
