<script lang="ts">
	export let level: 1 | 2 | 3 | 4 | 5 | 6 = 1;
</script>

<svelte:element this={`h${level}`}>
	<slot />
</svelte:element>
