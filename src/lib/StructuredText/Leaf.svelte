<script context="module" lang="ts">
	import { hasChildren, isSpan, isLink } from 'datocms-structured-text-utils';
	import type { InlineNode } from 'datocms-structured-text-utils';
</script>

<script lang="ts">
	import Renderer from './components/Renderer.svelte';
	export let leaf: InlineNode = undefined;
</script>

{#if hasChildren(leaf)}
	<Renderer {...leaf}>
		{#each leaf.children as leafChild}
			<svelte:self leaf={leafChild} />
		{/each}
	</Renderer>
{:else if isSpan(leaf)}
	<!-- TODO: SPAN has also MARKS! -->
	<Renderer {...leaf}>{leaf.value}</Renderer>
{:else}
	<!-- TODO: Inline item, a component to inject for this , has only a item : ID number-->
	<Renderer type={leaf.type} item={leaf.item} />
{/if}
