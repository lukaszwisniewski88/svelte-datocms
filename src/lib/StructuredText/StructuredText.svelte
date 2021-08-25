<script lang="ts">
	import { render as structuredRender } from 'datocms-structured-text-to-html-string';
	import type { StructuredTextGraphQlResponse } from 'datocms-structured-text-to-html-string';
	export let data: StructuredTextGraphQlResponse | undefined = undefined;

	$: result = structuredRender(data);
</script>

{@html result}
