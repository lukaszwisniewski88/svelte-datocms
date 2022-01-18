<script lang="ts">
	import type { MetaEntry } from 'datocms-structured-text-utils';
	import { getLinksContext } from '../blocks.context';
	import {metaToAttributes} from '../../utils/metaToAttributes'
	import { getContext as getComponentsContext } from '../components.context';
	export let item = '';
	export let meta: MetaEntry[] = undefined
	const attributes = metaToAttributes(meta)
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
	<svelte:component this={component} {...blockProps} {...attributes} />
{:else}
	<div>No component to render inlineLink {type} of ID: {id}</div>
{/if}
