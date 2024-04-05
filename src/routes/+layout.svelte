<script>
	import '../app.css';
	/** @type {import('./$types').PageData} */
	export let data;
</script>

<div class="navbar bg-base-100">
	<div class="flex-1">
		<a href="/" class="btn btn-ghost text-xl">KiSaRa</a>
	</div>
	<div class="flex-none">
		<ul class="menu menu-horizontal px-1">
			<li><a href="/">Beranda</a></li>
			{#if data.user}
				<li><a href={'/' + data.user.link_id}>Dashboard</a></li>
				{#if data.user.role === 'admin'}
					<li><a href="/admin">Admin</a></li>
				{/if}
			{/if}
		</ul>
	</div>
</div>
<div class="min-h-[100vh]">
	<div>
		<slot />
	</div>
</div>
<footer class="footer p-10 rounded-t-3xl shadow text-neutral-content">
	<nav>
		<h6 class="footer-title">Kisara</h6>
		<a href="/about-us" class="link link-hover">Tentang kami</a>
	</nav>
	<nav>
		<h6 class="footer-title">Legal</h6>
		<a href="/" class="link link-hover">Terms of use</a>
		<a href="/privacy-policy" class="link link-hover">Privacy policy</a>
	</nav>
</footer>
