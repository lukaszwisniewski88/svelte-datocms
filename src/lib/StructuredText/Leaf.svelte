<script context="module" lang="ts">
	import { hasChildren, isSpan, isLink } from 'datocms-structured-text-utils';
	import type { InlineNode } from 'datocms-structured-text-utils';
</script>

<script lang="ts">
	import Renderer from './components/Renderer.svelte';
	import Inline from './components/Inline.svelte';
	export let leaf: InlineNode = undefined;
</script>

{#if hasChildren(leaf)}
	{#if isLink(leaf)}
		<Renderer {...leaf}>
			{#each leaf.children as leafChild}
				<svelte:self leaf={leafChild} />
			{/each}
		</Renderer>
	{:else}
		<Inline item={leaf.item}>
			{#each leaf.children as leafChild}
				<svelte:self leaf={leafChild} />
			{/each}
		</Inline>
	{/if}
{:else if isSpan(leaf)}
	<!-- TODO: SPAN has also MARKS! -->
	<Renderer {...leaf}>{leaf.value}</Renderer>
{:else}
	<!-- TODO: Inline item, a component to inject for this , has only a item : ID number-->
	<Inline item={leaf.item} />
{/if}
