<script context="module" lang="ts">
	function markShift(marks: string[]): string[] {
		marks.shift();
		return marks;
	}
</script>

<script lang="ts">
	import type { Mark } from 'datocms-structured-text-utils';
	export let marks: Mark[] = undefined;
</script>

{#if marks && marks.length > 0}
	{#each marks as mark}
		{#if mark === 'emphasis'}
			<em>
				<svelte:self marks={markShift(marks)}>
					<slot />
				</svelte:self>
			</em>
		{:else if mark === 'highlight'}
			<mark>
				<svelte:self marks={markShift(marks)}>
					<slot />
				</svelte:self>
			</mark>
		{:else if mark === 'strikethrough'}
			<del>
				<svelte:self marks={markShift(marks)}>
					<slot />
				</svelte:self>
			</del>
		{:else if mark === 'strong'}
			<strong>
				<svelte:self marks={markShift(marks)}>
					<slot />
				</svelte:self>
			</strong>
		{:else if mark === 'underline'}
			<u>
				<svelte:self marks={markShift(marks)}>
					<slot />
				</svelte:self>
			</u>
		{:else if mark === 'code'}
			<pre>
				<svelte:self marks={markShift(marks)}>
					<slot/>
				</svelte:self> 
			</pre>
		{/if}
	{/each}
{:else}
	<slot />
{/if}
