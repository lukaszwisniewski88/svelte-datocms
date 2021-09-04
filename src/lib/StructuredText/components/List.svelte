<script lang="ts">
	export let style: 'bulleted' | 'numbered' = 'bulleted';
</script>

{#if style === 'bulleted'}
	<ul>
		<slot />
	</ul>
{:else}
	<ol>
		<slot />
	</ol>
{/if}
