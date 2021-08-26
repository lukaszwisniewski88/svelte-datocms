<script context="module" lang="ts">
	import { hasChildren, isSpan, isLink } from 'datocms-structured-text-utils';
	import type { InlineNode } from 'datocms-structured-text-utils';
</script>

<script lang="ts">
	import SpanComponent from './components/Span.svelte';
	export let leaf: InlineNode = undefined;
</script>

{#if hasChildren(leaf)}
	{#if isLink(leaf)}
		<!-- here we have a link with an url-->
		<a href={leaf.url}>
			{#each leaf.children as leafChild}
				<svelte:self leaf={leafChild} />
			{/each}
		</a>
	{:else}
		<!-- here we have a ItemLink with an item id-->
		Item Link {leaf.item}
		{#each leaf.children as leafChild}
			<svelte:self leaf={leafChild} />
		{/each}
	{/if}
{:else if isSpan(leaf)}
	<!-- TODO: SPAN has also MARKS! -->
	<slot name="spanComponent" value={leaf.value} marks={leaf.marks}
		><SpanComponent marks={leaf.marks}>
			{#if !leaf.value.includes('\n')}
				{leaf.value}
			{:else}
				{#each leaf.value.split(/\n/) as line, i}
					{line}<br />
				{/each}
			{/if}
		</SpanComponent></slot
	>
{:else}
	<!-- TODO: Inline item, a component to inject for this , has only a item : ID number-->
	Inline item : {leaf.item}
{/if}
