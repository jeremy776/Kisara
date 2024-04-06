<script>
	// @ts-nocheck

	/** @type {import('./$types').PageData} */
	export let data;
	const url = data.url + '/';

	import { Chart, Card, A, Button, Dropdown, DropdownItem } from 'flowbite-svelte';
	let options = {
		chart: {
			height: '150px',
			maxWidth: '100%',
			type: 'area',
			fontFamily: 'Inter, sans-serif',
			dropShadow: {
				enabled: true
			},
			toolbar: {
				show: false
			}
		},
		tooltip: {
			enabled: true,
			x: {
				show: false
			}
		},
		fill: {
			type: 'gradient',
			gradient: {
				opacityFrom: 0.55,
				opacityTo: 0,
				shade: '#1C64F2',
				gradientToColors: ['#1C64F2']
			}
		},
		dataLabels: {
			enabled: false
		},
		stroke: {
			width: 5
		},
		grid: {
			show: false,
			strokeDashArray: 4,
			padding: {
				left: 2,
				right: 2,
				top: 0
			}
		},
		series: [
			{
				name: 'New users',
				data: [6500, 6418, 6456, 6526, 6356, 6456, 23423, 345, 456, 234234, 2345],
				color: '#1A56DB'
			}
		],
		xaxis: {
			categories: [
				'01 February',
				'02 February',
				'03 February',
				'04 February',
				'05 February',
				'0654 February',
				'02 February',
				'05 February',
				'07 February'
			],
			labels: {
				show: false
			},
			axisBorder: {
				show: false
			},
			axisTicks: {
				show: false
			}
		},
		yaxis: {
			show: false
		}
	};
</script>

<svelte:head>
	<title>Admin - Kisara</title>
</svelte:head>

<div class="flex p-3 mt-10 items-center w-full justify-center">
	<Card size='xl' class="bg-base-300 w-full border-transparent">
		<div class="flex justify-between">
			<div>
				<h5 class="leading-none text-3xl font-bold text-white pb-2">32.4k</h5>
				<p class="text-base font-normal text-gray-400">Users this week</p>
			</div>
			<div
				class="flex items-center px-2.5 py-0.5 text-base font-semibold text-green-500 text-center"
			>
				12%
				<!-- <ChevronRightSolid class="w-3 h-3 ms-1" /> -->
			</div>
		</div>
		<Chart {options} />
		<div class="grid grid-cols-1 items-center border-t border-gray-700 justify-between">
			<div class="flex justify-between items-center pt-5">
				<Button
					class="text-sm font-medium text-gray-400 text-center inline-flex items-center hover:text-white bg-transparent hover:bg-transparent focus:ring-transparent py-0"
					>Last 7 days</Button
				>
				<Dropdown class="w-40" offset={-6}>
					<DropdownItem>Yesterday</DropdownItem>
					<DropdownItem>Today</DropdownItem>
					<DropdownItem>Last 7 days</DropdownItem>
					<DropdownItem>Last 30 days</DropdownItem>
					<DropdownItem>Last 90 days</DropdownItem>
				</Dropdown>
				<A
					href="/"
					class="uppercase text-sm font-semibold hover:text-primary-700 dark:hover:text-primary-500 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 px-3 py-2 hover:no-underline"
				>
					Users Report
					<!-- <ChevronRightSolid class="w-2.5 h-2.5 ms-1.5" /> -->
				</A>
			</div>
		</div>
	</Card>
</div>

<!-- Table Section -->
<div class="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
	<!-- Card -->
	<div class="flex flex-col">
		<div class="-m-1.5 overflow-x-auto">
			<div class="p-1.5 min-w-full inline-block align-middle">
				<div class="bg-base-300 rounded-xl shadow-sm overflow-hidden">
					<!-- Header -->
					<div
						class="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center"
					>
						<div>
							<h2 class="text-xl font-semibold text-white">Users</h2>
							<p class="text-sm text-gray-400">Add users, edit and more.</p>
						</div>

						<div>
							<div class="inline-flex gap-x-2">
								<a
									class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
									href="/"
								>
									View all
								</a>

								<a
									class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
									href="/"
								>
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
										stroke-linejoin="round"><path d="M5 12h14" /><path d="M12 5v14" /></svg
									>
									Create user
								</a>
							</div>
						</div>
					</div>
					<!-- End Header -->

					<!-- Table -->
					<table class="min-w-full">
						<thead class="bg-base-300">
							<tr>
								<th scope="col" class="ps-6 py-3 text-start">
									<div class="flex items-center gap-x-2">
										<span class="text-xs font-semibold uppercase tracking-wide text-white">
											Name
										</span>
									</div>
								</th>

								<th scope="col" class="px-6 py-3 text-start">
									<div class="flex items-center gap-x-2">
										<span class="text-xs font-semibold uppercase tracking-wide text-white">
											Total Comments
										</span>
									</div>
								</th>

								<th scope="col" class="px-6 py-3 text-start">
									<div class="flex items-center gap-x-2">
										<span class="text-xs font-semibold uppercase tracking-wide text-white">
											Role
										</span>
									</div>
								</th>

								<th scope="col" class="px-6 py-3 text-start">
									<div class="flex items-center gap-x-2">
										<span class="text-xs font-semibold uppercase tracking-wide text-white">
											Portfolio
										</span>
									</div>
								</th>

								<th scope="col" class="px-6 py-3 text-start">
									<div class="flex items-center gap-x-2">
										<span class="text-xs font-semibold uppercase tracking-wide text-white">
											Created
										</span>
									</div>
								</th>

								<th scope="col" class="px-6 py-3 text-end"></th>
							</tr>
						</thead>

						<tbody class="">
							{#each data.admin_data.users as user}
								<tr>
									<td class="size-px whitespace-nowrap">
										<div class="ps-6 py-3">
											<div class="flex items-center gap-x-3">
												<span
													class="inline-flex items-center justify-center size-8 rounded-full bg-gray-500 text-xs font-semibold text-white leading-none"
												>
													{user.username.charAt(0).toUpperCase()}
												</span>
												<div class="grow">
													<span class="block text-sm font-semibold text-white">{user.username}</span
													>
													<a
														class="block hover:underline text-sm text-blue-400"
														href={url + user.link_id}>{url}{user.link_id}</a
													>
												</div>
											</div>
										</div>
									</td>
									<td class="h-px w-72 whitespace-nowrap">
										<div class="px-6 py-3">
											<span class="block text-sm font-semibold text-white"
												>{user?.comments.length || 'Belum ada'}</span
											>
											<!-- <span class="block text-sm text-gray-400">Human resources</span> -->
										</div>
									</td>
									<td class="size-px whitespace-nowrap">
										<div class="px-6 py-3">
											<span
												class="py-1 px-1.5 inline-flex items-center gap-x-1 text-xs font-medium bg-teal-100 text-teal-800 rounded-full"
											>
												<svg
													class="size-2.5"
													xmlns="http://www.w3.org/2000/svg"
													width="16"
													height="16"
													fill="currentColor"
													viewBox="0 0 16 16"
												>
													<path
														d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"
													/>
												</svg>
												{user.role}
											</span>
										</div>
									</td>
									<td class="size-px whitespace-nowrap">
										<div class="px-6 py-3">
											<div class="flex items-center gap-x-3">
												<span class="text-xs text-gray-500">1/5</span>
												<div class="flex w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
													<div
														class="flex flex-col justify-center overflow-hidden bg-white"
														role="progressbar"
														style="width: 25%"
														aria-valuenow="25"
														aria-valuemin="0"
														aria-valuemax="100"
													></div>
												</div>
											</div>
										</div>
									</td>
									<td class="size-px whitespace-nowrap">
										<div class="px-6 py-3">
											<span class="text-sm text-gray-400">28 Dec, 12:12</span>
										</div>
									</td>
									<td class="size-px whitespace-nowrap">
										<div class="px-6 py-1.5">
											<a
												class="inline-flex items-center gap-x-1 text-sm text-blue-400 decoration-2 hover:underline font-medium"
												href="/"
											>
												Edit
											</a>
										</div>
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
					<!-- End Table -->

					<!-- Footer -->
					<div
						class="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-t border-gray-600"
					>
						<div>
							<p class="text-sm text-gray-200">
								<span class="font-semibold text-gray-300">{data.admin_data.users.length}</span> results
							</p>
						</div>
					</div>
					<!-- End Footer -->
				</div>
			</div>
		</div>
	</div>
	<!-- End Card -->
</div>
<!-- End Table Section -->
