<script context="module" lang="ts">
	import { validate } from 'datocms-structured-text-utils';
	import type { StructuredText, Document } from 'datocms-structured-text-utils';
	import type { ComponentsMap } from './types';
</script>

<script lang="ts">
	import { isDocument } from 'datocms-structured-text-utils';
	import { setContext as setComponentsContext } from './components.context';
	import { setContext as setRecordsContext } from './blocks.context';
	import Renderer from './components/Renderer.svelte';
	import Node from './Node.svelte';
	export let components: ComponentsMap = undefined;

	export let data: StructuredText | Document  = undefined;
	const dast  = isDocument(data) ? data : data?.value 
	if(validate(dast).valid){
		setComponentsContext(components);
		setRecordsContext(data);
	}
</script>

{#if data }
	<!-- Root component -->
	<Renderer type={dast.document.type}>
		{#each dast.document.children as node}
			<Node {node} />
		{/each}
	</Renderer>
{:else}
	<pre>No data document</pre>
{/if}
