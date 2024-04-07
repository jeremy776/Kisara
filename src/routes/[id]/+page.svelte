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

	function handleCopy() {
		/**
		 * @type {any}
		 */
		let input = document.getElementById('url');
		input?.select();
		input?.setSelectionRange(0, 99999);
		navigator.clipboard.writeText(input?.value);
		let sc = document.getElementsByClassName('js-clipboard-default');
		let scs = document.getElementsByClassName('js-clipboard-success');

		if (!sc[0].classList.contains('hidden')) {
			sc[0].classList.toggle('hidden');
			scs[0].classList.toggle('hidden');
		}
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
						console.log(data.data);
						data.data['ReplyComment'] = [];
						message = [data.data, ...message];
					}
				});
			} else {
				console.error(res);
			}
		});
	}

	/**
	 * @param {{ currentTarget: EventTarget & HTMLFormElement}} event
	 * @param {string | number} id
	 **/
	function handleReply(event, id) {
		const form = event.currentTarget;
		const formData = new FormData(form);
		const datas = Object.fromEntries(formData.entries());

		fetch(`/api/message/${data.data.id}/${id}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				pesan: datas.reply
			})
		}).then((res) => {
			if (res.ok) {
				res.json().then((data) => {
					if (data.status === 200) {
						form.reset();
						console.log(data);
						const index = message.findIndex((msg) => msg.id === id);
						message[index].ReplyComment = [...message[index].ReplyComment, data.data];
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
	<div class="bg-base-100 w-full max-w-7xl p-6 shadow-sm rounded-b-2xl">
		{#if isOwner}
			<div class="w-fulll bg-base-200 px-4 py-2 text-center">
				<p class="text-xl aos-init">💬 Daftar Pesan kamu</p>
			</div>

			<div class="text-lg mt-10 text-center">
				<p class="text-md text-gray-500">Bagiin link kamu ke media sosial yuk</p>
				<div class="mt-3">
					<input type="hidden" id="hs-clipboard-tooltip" value={data.data.url} />

					<button
						type="button"
						class="w-full max-w-sm js-clipboard-example [--trigger:focus] hs-tooltip relative py-3 px-4 inline-flex justify-between items-center border-gray-700 gap-x-2 text-sm font-mono rounded-lg border shadow-sm hover:bg-base-300 disabled:opacity-50 disabled:pointer-events-none"
						data-clipboard-target="#hs-clipboard-tooltip"
						data-clipboard-action="copy"
						data-clipboard-success-text="Copied"
						on:click={handleCopy}
					>
						{data.data.url}
						<span class="border-s ps-3.5">
							<svg
								class="js-clipboard-default size-4 group-hover:rotate-6 transition"
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<rect width="8" height="4" x="8" y="2" rx="1" ry="1"></rect>
								<path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"
								></path>
							</svg>

							<svg
								class="js-clipboard-success hidden size-4 text-green-400 rotate-6"
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<polyline points="20 6 9 17 4 12"></polyline>
							</svg>
						</span>

						<span
							class="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity hidden invisible z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded-lg shadow-sm"
							role="tooltip"
						>
							Copied
						</span>
					</button>
				</div>
			</div>
		{:else}
			<div class="w-full bg-base-200 rounded-3xl px-4 py-6">
				<div class="space-y-">
					<h2 class="font-semibold">
						{#if author.role == 'super'}
							Hello heloo, ini halaman punya admin
						{:else}
							Mau ngirim pesan apa nih ke {author.username}?
						{/if}
					</h2>
					<p class="text-sm text-gray-400">
						{#if author.role == 'super'}
							disini kamu bisa curhat tentang apa aja tanpa takut identitas kamu di ketahui kok
						{:else}
							Tenang aja, {author.username} ga bakalan tau kok yang ngirim pesan nya siapa
						{/if}
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
					<button class="btn btn-success mt-5 btn-sm">
						{#if author.role == 'super'}
							Kirim curhatan
						{:else}
							Kirim ke {author.username}
						{/if}
					</button>
				</form>
			</div>
		{/if}
	</div>

	{#if early_access}
		<!-- Announcement Banner -->
		<div
			class="z-[100000000000000] sticky top-3 max-w-7xl w-full px-4 mt-5 sm:px-6 lg:px-8 mx-auto"
		>
			<div
				class="bg-blue-600 bg-[url('https://preline.co/assets/svg/examples/abstract-1.svg')] bg-no-repeat bg-cover bg-center p-4 rounded-lg text-center"
			>
				<p class="me-2 inline-block text-white">Kamu berada di halaman dengan versi beta</p>
			</div>
		</div>
		<!-- End Announcement Banner -->
	{:else}
		<div
			class="z-[100000000000000] sticky top-3 max-w-7xl w-full px-4 mt-5 sm:px-6 lg:px-8 mx-auto"
		>
			<div
				class="bg-blue-600 bg-[url('https://preline.co/assets/svg/examples/abstract-1.svg')] bg-no-repeat bg-cover bg-center p-4 rounded-lg text-center"
			>
				<p class="me-2 inline-block text-white">Kamu berada di halaman tempat memberikan curhatan</p>
			</div>
		</div>
	{/if}

	<div class="w-full max-w-7xl p-6">
		<h2 class="text-xl text-left">⏱️ Timeline {author.username}</h2>
		<div class="mt-4">
			{#if message.length === 0}
				<p class="text-center text-gray-400 mt-5">Belum ada pesan nih</p>
			{/if}

			{#each message as msg (msg.id)}
				<div transition:fly={{ y: -200 }} class={'bg-base-100 p-4 mt-4 rounded-lg'}>
					<p class="">
						{msg.content}
					</p>

					{#if early_access}
						<div class="mt-2">
							<form on:submit|preventDefault={(e) => handleReply(e, msg.id)} class="relative">
								<input
									type="text"
									id={msg.id}
									name="reply"
									autocomplete="off"
									class="outline-none pr-16 border border-gray-700 px-2.5 py-1.5 w-full rounded-lg bg-base-300 text-sm"
									placeholder="balas komentar"
								/>
								<div class="absolute flex items-center px-2 h-full top-0 right-0">
									<button class="px-3 text-xs py-0.5 rounded-lg bg-blue-500">kirim</button>
								</div>
							</form>
						</div>

						{#if msg['ReplyComment'].length > 0}
							<div class="my-4">
								{#each msg.ReplyComment as reply (reply.id)}
									<div class="bg-base-200 p-2 rounded-lg mx-2 mt-2">
										<p class="text-sm text-gray-400">{reply.content}</p>
									</div>
								{/each}
							</div>
						{/if}
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
