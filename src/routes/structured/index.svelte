<script>
	import Span from '$lib/StructuredText/components/Span.svelte';

	import StructuredText from '$lib/StructuredText/StructuredText.svelte';
	import queryResult from './_query';
</script>

<StructuredText
	data={queryResult}
	components={{
		block: Span
	}}
/>
