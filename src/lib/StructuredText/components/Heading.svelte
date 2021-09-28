<script lang="ts">
	export let level: 1 | 2 | 3 | 4 | 5 | 6 = 1;
	const sizeMap = [
		'text-base',
		'text-xl',
		'text-2xl',
		'text-3xl',
		'text-4xl',
		'text-5xl',
		'text-6xl'
	].reverse();
</script>

<h1 class={sizeMap[level - 1]}>
	<slot />
</h1>
