<script lang="ts">
	import type { SvelteComponentTyped } from 'svelte';
	export let component: Promise<new (...args) => SvelteComponentTyped>;
	export let innerProps = undefined;
</script>

{#await component}
	<div>Loading ...</div>
{:then resolved}
	<svelte:component this={resolved} {...innerProps}>
		<slot />
	</svelte:component>
{/await}
