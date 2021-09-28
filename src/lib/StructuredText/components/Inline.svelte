<script lang="ts">
	import { getLinksContext } from '../blocks.context';
	import { getContext as getComponentsContext } from '../components.context';
	export let item = '';
	const linksMap = getLinksContext();
	const componentsMap = getComponentsContext();
	const { __typename: type, id, ...blockProps } = linksMap[item];
	const component = $componentsMap[type];
</script>

{#if component}
	{#if $$slots.default}
		<svelte:component this={component} {...blockProps}>
			<slot />
		</svelte:component>
	{/if}
	<svelte:component this={component} {...blockProps} />
{:else}
	<div>No component to render inlineLink {type} of ID: {id}</div>
{/if}
