<script context="module" lang="ts">
	import { validate } from 'datocms-structured-text-utils';
	import type { StructuredText, NodeType } from 'datocms-structured-text-utils';
	/**
	 * Components to use when rendering StructuredText
	 */
	type ComponentsMap = Partial<Record<NodeType, new (...any) => SvelteComponentTyped>>;
</script>

<script lang="ts">
	import { isDocument } from 'datocms-structured-text-utils';
	import { setContext, SvelteComponentTyped } from 'svelte';
	import Renderer from './components/Renderer.svelte';
	import Node from './Node.svelte';
	import { writable } from 'svelte/store';
	export let components: ComponentsMap = undefined;
	export let data: StructuredText = undefined;
	const componentStore = writable<ComponentsMap>({});
	setContext('components', componentStore);
	$: if (components)
		Object.keys(components).forEach((key) => ($componentStore[key] = components[key]));
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
