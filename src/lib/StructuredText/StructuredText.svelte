<script context="module" lang="ts">
	import { isBlockquote, isListItem, isBlock, validate } from 'datocms-structured-text-utils';
	import type {
		Paragraph,
		Heading,
		List,
		Blockquote,
		Code,
		Block,
		ListItem,
		ThematicBreak,
		InlineNode,
		StructuredText
	} from 'datocms-structured-text-utils';
</script>

<script lang="ts">
	import {
		isDocument,
		hasChildren,
		isList,
		isParagraph,
		isSpan,
		isThematicBreak,
		isLink
	} from 'datocms-structured-text-utils';
	import BlockquoteComponent from './components/BlockquoteComponent.svelte';
	import HeadingComponent from './components/Heading.svelte';
	import ListComponent from './components/ListComponent.svelte';
	import SpanComponent from './components/Span.svelte';

	export let data: StructuredText | undefined = undefined;
	export let node:
		| Paragraph
		| Heading
		| List
		| Code
		| Blockquote
		| Block
		| ThematicBreak
		| ListItem = undefined;
	export let leaf: InlineNode = undefined;
</script>

{#if data && isDocument(data.value) && validate(data.value)}
	<!-- This is first run of the loop-->
	{#each data.value.document.children as node}
		<svelte:self {node} />
	{/each}
{:else if node}
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
					<svelte:self {leaf} />
				{/each}
			</p>
		{:else}
			<HeadingComponent level={node.level}>
				{#each node.children as leaf}
					<svelte:self {leaf} />
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
{:else if leaf}
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
		<SpanComponent marks={leaf.marks}>
			{#if !leaf.value.includes('\n')}
				{leaf.value}
			{:else}
				{#each leaf.value.split(/\n/) as line, i}
					{line}<br />
				{/each}
			{/if}
		</SpanComponent>
	{:else}
		<!-- TODO: Inline item, a component to inject for this , has only a item : ID number-->
		Inline item : {leaf.item}
	{/if}
{/if}
