<script>
	import snarkdown from 'snarkdown';
	import update from './update.md?raw';
</script>

<svelte:head>
	<title>Changelog - Kisara</title>
</svelte:head>

<article class="p-4 prose">
	{@html snarkdown(update)}
</article>

