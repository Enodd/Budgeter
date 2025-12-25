<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
    import Header from '$lib/layout/header.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Header />
<main>
{@render children?.()}
</main>
