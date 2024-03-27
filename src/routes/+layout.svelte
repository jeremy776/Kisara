<script>
	import { NavBrand, NavHamburger, Navbar, NavLi, NavUl } from 'flowbite-svelte';
	import '../app.css';
</script>

<div class="hidden navbar bg-base-100">
	<div class="flex-1">
		<a href="/" class="btn btn-ghost text-xl">KiSaRa</a>
	</div>
	<div class="flex-none">
		<ul class="menu menu-horizontal px-1">
			<li><div>link</div></li>
			<li>
				<details>
					<summary><div>Parent</div> </summary>
					<ul class="p-2 bg-base-100 rounded-t-none">
						<li><div>Link 1</div></li>
						<li><div>Link 1</div></li>
					</ul>
				</details>
			</li>
		</ul>
	</div>
</div>
<div class="min-h-[100vh]">
	<div>
		<slot />
	</div>
</div>
<footer class="footer p-10 bg-neutral text-neutral-content">
    <nav>
      <h6 class="footer-title">Kisara</h6>
       <a href="/" class="link link-hover">Tentang kami</a>

    </nav>
    <nav>
      <h6 class="footer-title">Legal</h6> 
      <a href="/" class="link link-hover">Terms of use</a>
      <a href="/" class="link link-hover">Privacy policy</a>
      <a href="/" class="link link-hover">Cookie policy</a>
    </nav>
  </footer>
