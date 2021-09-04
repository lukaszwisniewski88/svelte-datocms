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
	import Leaf from './Leaf.svelte';
	import Renderer from './components/Renderer.svelte';
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
		<Renderer type={node.type} style={node.style}>
			{#each node.children as leaf}
				<svelte:self node={leaf} />
			{/each}
		</Renderer>
	{:else if isBlockquote(node)}
		<Renderer type={node.type} attribution={node.attribution}>
			{#each node.children as leaf}
				<svelte:self node={leaf} />
			{/each}
		</Renderer>
	{:else if isListItem(node)}
		<Renderer type={node.type}>
			{#each node.children as leaf}
				<svelte:self node={leaf} />
			{/each}
		</Renderer>
	{:else if isParagraph(node)}
		<Renderer type={node.type}>
			{#each node.children as leaf}
				<Leaf {leaf} />
			{/each}
		</Renderer>
	{:else}
		<Renderer type={node.type} level={node.level}>
			{#each node.children as leaf}
				<Leaf {leaf} />
			{/each}
		</Renderer>
	{/if}
{:else if isBlock(node)}
	<Renderer type={node.type} item={node.item} />
{:else if isThematicBreak(node)}
	<Renderer type={node.type} />
{:else}
	<Renderer type={node.type} code={node.code} highlight={node.highlight} language={node.language} />
{/if}
