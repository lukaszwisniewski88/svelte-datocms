<script context="module" lang="ts">
	import { validate } from 'datocms-structured-text-utils';
	import type { StructuredText } from 'datocms-structured-text-utils';
	import type { ComponentsMap } from './types';
</script>

<script lang="ts">
	import { isDocument } from 'datocms-structured-text-utils';
	import { setContext as setComponentsContext } from './components.context';
	import { setContext as setRecordsContext } from './blocks.context';
	import Renderer from './components/Renderer.svelte';
	import Node from './Node.svelte';
	export let components: ComponentsMap = undefined;

	export let data: StructuredText = undefined;

	setComponentsContext(components);
	setRecordsContext(data.blocks, data.links);
</script>

{#if data && isDocument(data.value) && validate(data.value)}
	<!-- Root component -->
	<Renderer type={data.value.document.type}>
		{#each data.value.document.children as node}
			<Node {node} />
		{/each}
	</Renderer>
{:else}
	<pre>No data document</pre>
{/if}
