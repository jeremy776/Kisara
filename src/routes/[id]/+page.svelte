<script>
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Input } from '$lib/components/ui/input';
	import { DotsHorizontalOutline, FileCopyOutline, LockOutline, TrashBinOutline } from 'flowbite-svelte-icons';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';

	import { toast } from 'svelte-sonner';
	import { fade, fly } from 'svelte/transition';
	/** @type {import('./$types').PageData} */
	export let data;
	/**
	 * @type {any[]}
	 */
	let message = data.data.comments;
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
		toast.success('Link berhasil di copy');
	}

	/** @param {{ currentTarget: EventTarget & HTMLFormElement}} event */
	async function handleKirim(event) {
		const form = event.currentTarget;
		const formData = new FormData(form);
		const datas = Object.fromEntries(formData.entries());
		fetch(`/api/message/${data.link_id}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				message_content: datas.pesan
			})
		}).then((res) => {
			if (res.ok) {
				res.json().then((data) => {
					if (data.statusCode === 201) {
						form.reset();
						// @ts-ignore
						message['ReplyComment'] = [];
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
	<title>{data.data.author.username} - Dapatkan pesan rahasia dari teman mu</title>
</svelte:head>

<div class="flex items-center flex-col gap-3 min-h-full">
	<div class="bg-base-100 w-full max-w-7xl p-6 shadow-md rounded-b-2xl">
		{#if data.is_owner}
			<div class="w-fulll bg-base-200 px-4 py-2 text-center">
				<p class="text-xl aos-init">💬 Daftar Pesan kamu</p>
			</div>

			<div class="text-lg mt-10 text-center">
				<p class="text-md text-gray-500">Bagiin link kamu ke media sosial yuk</p>
				<div class="mt-3">
					<div class="w-full flex items-center justify-center">
						<div class="flex w-full max-w-xl items-center space-x-2">
							<Input id="url" type="text" disabled value={data.url} placeholder={data.url} />
							<Button on:click={handleCopy}>Copy Link</Button>
						</div>
					</div>
				</div>
			</div>
		{:else}
			<div class="w-full rounded-3xl px-4 py-6">
				<div class="space-y-">
					<h2 class="font-semibold">
						{#if data.data.author.role == 'super'}
							Hello heloo, ini halaman punya admin
						{:else}
							Mau ngirim pesan apa nih ke {data.data.author.username}?
						{/if}
					</h2>
					<p class="text-sm text-gray-400">
						{#if data.data.author.role == 'super'}
							disini kamu bisa curhat tentang apa aja tanpa takut identitas kamu di ketahui kok
						{:else}
							Tenang aja, {data.data.author.username} ga bakalan tau kok yang ngirim pesan nya siapa
						{/if}
					</p>
				</div>

				<form on:submit|preventDefault={handleKirim} class="my-4">
					<Input
						type="text"
						name="pesan"
						autocomplete="off"
						class="text-sm input w-full"
						placeholder="tulisnya tetep pake etika yaa..."
					/>
					<Button type="submit" class="btn btn-success mt-5 btn-sm">
						{#if data.data.author.role == 'super'}
							Kirim curhatan
						{:else}
							Kirim ke {data.data.author.username}
						{/if}
					</Button>
				</form>
			</div>
		{/if}
	</div>

	<!-- {#if early_access}
		<!-- Announcement Banner --
		<div
			class="z-[100000000000000] sticky top-3 max-w-7xl w-full px-4 mt-5 sm:px-6 lg:px-8 mx-auto"
		>
			<div
				class="bg-blue-600 bg-[url('https://preline.co/assets/svg/examples/abstract-1.svg')] bg-no-repeat bg-cover bg-center p-4 rounded-lg text-center"
			>
				<p class="me-2 inline-block text-white">Kamu berada di halaman dengan versi beta</p>
			</div>
		</div>
		<!-- End Announcement Banner -
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
	{/if} -->

	<div class="w-full max-w-7xl p-6">
		<h2 class="text-xl text-left">⏱️ Timeline {data.data.author.username}</h2>
		<div class="mt-4">
			{#if message.length === 0}
				<p class="text-center text-gray-400 mt-5">Belum ada pesan nih</p>
			{/if}

			{#each message as msg (msg.id)}
				<div transition:fly={{ y: -200 }} class={'border bg-base-100 p-4 mt-4 rounded-lg'}>
					<div class="flex justify-between items-center">
						<p class="">
							{msg.message_content}
						</p>
						<div>
							<DropdownMenu.Root>
								<DropdownMenu.Trigger asChild let:builder>
									<Button variant="ghost" size="sm" builders={[builder]}>
										<DotsHorizontalOutline class="w-5 h-5" />
									</Button>
								</DropdownMenu.Trigger>
								<DropdownMenu.Content>
									<DropdownMenu.Group>
										<DropdownMenu.Label>Comment Options</DropdownMenu.Label>
										<!-- <DropdownMenu.Separator /> -->
										<DropdownMenu.Item class='flex items-center gap-4'>
											<FileCopyOutline class="w-5 h-5" />
											Copy Text
										</DropdownMenu.Item>
									</DropdownMenu.Group>
									<DropdownMenu.Group>
										<DropdownMenu.Label>(Owner only)</DropdownMenu.Label>
										<!-- <DropdownMenu.Separator /> -->
										<DropdownMenu.Item class='flex items-center gap-4'>
											<LockOutline class="w-5 h-5" />
											Hide Comment
										</DropdownMenu.Item>
										<DropdownMenu.Item class='text-red-600 flex items-center gap-4'>
											<TrashBinOutline class="w-5 h-5" />
											Delete Comment
										</DropdownMenu.Item>	
									</DropdownMenu.Group>
								</DropdownMenu.Content>
							</DropdownMenu.Root>
						</div>
					</div>

					<!-- {#if early_access}
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
					{/if} -->

					<div class="flex justify-between mt-4">
						{#if data.is_owner}
							<Dialog.Root>
								<Dialog.Trigger>Hapus</Dialog.Trigger>
								<Dialog.Content>
									<Dialog.Header>
										<Dialog.Title>Peringatan cuy!</Dialog.Title>
										<Dialog.Description>Yakin mau hapus komentar??</Dialog.Description>
									</Dialog.Header>
									<p>btw, pesan yg udah di hapus ga bisa dibalikin lagi ya...</p>
									<Dialog.Footer class="flex flex-row gap-2">
										<Button variant="destructive" on:click={() => {}}>Ga jadi</Button>
										<Button variant="secondary">Yakin dong</Button>
									</Dialog.Footer>
								</Dialog.Content>
							</Dialog.Root>
							<!-- <div>
								<Button
									variant="destructive"
									on:click={() => {
										const modal = document.getElementById(`my_modal_${msg.id}`);
										// @ts-ignore
										modal?.showModal();
									}}>Hapus</Button
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
												<!--if there is a button in form, it will close the modal --
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
							</div> -->
						{/if}
						<!-- <span
							class="inline-flex items-center gap-x-1.5 py-0.5 px-3 rounded-full text-xs font-medium bg-gray-800 text-gray-400"
						>
							{timeToDate(msg.createdAt)}
						</span> -->
						<Badge variant="secondary">{timeToDate(msg.createdAt)}</Badge>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>
