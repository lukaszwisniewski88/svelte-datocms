<script context="module" lang="ts">
	import { validate } from 'datocms-structured-text-utils';
	import type { StructuredText } from 'datocms-structured-text-utils';
</script>

<script lang="ts">
	import { isDocument } from 'datocms-structured-text-utils';
	import Node from './Node.svelte';
	export let data: StructuredText | undefined = undefined;
</script>

{#if data && isDocument(data.value) && validate(data.value)}
	<!-- This is first run of the loop-->
	{#each data.value.document.children as node}
		<Node {node}>
			<slot name="spanComponent" />
		</Node>
	{/each}
{/if}
