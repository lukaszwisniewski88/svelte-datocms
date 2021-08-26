<script context="module" lang="ts">
	import {
		isBlockquote,
		isListItem,
		isBlock,
		hasChildren,
		isList,
		isParagraph,
		isThematicBreak
	} from 'datocms-structured-text-utils';
	import type {
		Paragraph,
		Heading,
		List,
		Blockquote,
		Code,
		Block,
		ListItem,
		ThematicBreak
	} from 'datocms-structured-text-utils';
</script>

<script lang="ts">
	import BlockquoteComponent from './components/BlockquoteComponent.svelte';
	import HeadingComponent from './components/Heading.svelte';
	import ListComponent from './components/ListComponent.svelte';
	import Leaf from './Leaf.svelte';
	export let node:
		| Paragraph
		| Heading
		| List
		| Code
		| Blockquote
		| Block
		| ThematicBreak
		| ListItem = undefined;
</script>

{#if hasChildren(node)}
	{#if isList(node)}
		<ListComponent style={node.style}>
			{#each node.children as leaf}
				<svelte:self node={leaf} />
			{/each}
		</ListComponent>
	{:else if isBlockquote(node)}
		<BlockquoteComponent attribution={node.attribution}>
			{#each node.children as leaf}
				<svelte:self node={leaf} />
			{/each}
		</BlockquoteComponent>
	{:else if isListItem(node)}
		<li>
			{#each node.children as leaf}
				<svelte:self node={leaf} />
			{/each}
		</li>
	{:else if isParagraph(node)}
		<p>
			{#each node.children as leaf}
				<Leaf {leaf}>
					<slot name="spanComponent" />
				</Leaf>
			{/each}
		</p>
	{:else}
		<HeadingComponent level={node.level}>
			{#each node.children as leaf}
				<Leaf {leaf} />
			{/each}
		</HeadingComponent>
	{/if}
{:else if isBlock(node)}
	<!-- TODO: Know how to render BlockNode-->
	<pre> Block node</pre>
{:else if isThematicBreak(node)}
	<!-- TODO: component mapping -->
	<hr />
{:else}
	<!-- TODO: Render a code component-->
	<pre>We have a code block here</pre>
{/if}
