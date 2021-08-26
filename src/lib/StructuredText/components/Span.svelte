<script lang="ts">
	import type { Mark } from 'datocms-structured-text-utils';

	export let marks: Mark[] = undefined;
</script>

{#if marks && marks.length > 0}
	{#each marks as mark}
		{#if mark === 'emphasis'}
			<em><slot /></em>
		{:else if mark === 'highlight'}
			<mark><slot /></mark>
		{:else if mark === 'strikethrough'}
			<del><slot /></del>
		{:else if mark === 'strong'}
			<strong><slot /></strong>
		{:else if mark === 'underline'}
			<u><slot /></u>
		{:else if mark === 'code'}
			<pre><slot/></pre>
		{/if}
	{/each}
{:else}
	<slot />
{/if}
