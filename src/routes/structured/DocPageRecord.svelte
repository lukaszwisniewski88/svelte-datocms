<script>
	export let title = '';
	export let slug = '';

	console.log($$slots);
</script>

<a href={slug}><slot><span>{title}</span></slot></a>
