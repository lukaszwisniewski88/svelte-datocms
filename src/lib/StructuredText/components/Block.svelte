<script lang="ts">
	import { getBlocksContext } from '../blocks.context';
	import { getContext as getComponentsContext } from '../components.context';
	export let item = '';
	const blocksMap = getBlocksContext();
	const componentsMap = getComponentsContext();
	const { __typename: type, id, ...blockProps } = blocksMap[item];
	const component = $componentsMap[type];
</script>

{#if component}
	<svelte:component this={component} {...blockProps} />
{:else}
	<div>No component to render {type} of ID: {id}</div>
{/if}
