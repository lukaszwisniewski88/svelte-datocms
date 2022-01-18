<script lang="ts">
	import type { NodeType, Mark } from 'datocms-structured-text-utils';
	import { getContext as getComponentsContext } from '../components.context';
	export let type: NodeType | Mark;
	const components = getComponentsContext();
	$: component = new Promise(async (resolve, reject) => {
		const defaultMapping = {
			root: 'Root',
			span: 'Span',
			heading: 'Heading/Heading',
			list: 'List',
			blockquote: 'Blockquote',
			paragraph: 'Paragraph',
			emphasis: 'Emphasis',
			highlight: 'Highlight',
			strikethrough: 'Strikethrough',
			underline: 'Underline',
			strong: 'Strong',
			thematicBreak: 'Themeaticbreak',
			link: 'Link',
			listItem: 'Listitem',
			code: 'Code'
		};
		if ($components[type]) resolve($components[type]);
		else {
			/* @vite-ignore */
			const result = await import(`./${defaultMapping[type]}.svelte`);
			if (!result.default) reject('no components to render');
			resolve(result.default);
		}
	});
</script>

{#await component then render}
	<svelte:component this={render} {...$$restProps}>
		<slot />
	</svelte:component>
{:catch reason}
	<div>{reason}</div>
{/await}
