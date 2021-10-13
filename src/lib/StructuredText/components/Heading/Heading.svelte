<script lang="ts">
	import {H1,H2,H3,H4,H5,H6} from './index' 
	export let level: 1 | 2 | 3 | 4 | 5 | 6 = 1;
	const sizeMap = [
		H1,
		H2,
		H3,
		H4,
		H5,
		H6
	]
</script>

<svelte:component this={sizeMap[level - 1]}>
	<slot />
</svelte:component>
